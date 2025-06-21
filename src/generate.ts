import camelCase from 'lodash.camelcase';
import path from 'node:path';
import ApiGenerator, {
  getOperationName as _getOperationName,
  getReferenceName,
  isReference,
  supportDeepObjects,
  createPropertyAssignment,
  createQuestionToken,
  isValidIdentifier,
  keywordType,
} from 'oazapfts/generate';
import type { OpenAPIV3 } from 'openapi-types';
import ts from 'typescript';
import type { ObjectPropertyDefinitions } from './codegen';
import { generateCreateApiCall, generateEndpointDefinition, generateImportNode, generateTagTypes } from './codegen';
import { generateReactHooks } from './generators/react-hooks';
import type {
  EndpointMatcher,
  EndpointOverrides,
  GenerationOptions,
  OperationDefinition,
  ParameterDefinition,
  ParameterMatcher,
  TextMatcher,
  GenerateApiResult,
} from './types';
import { capitalize, getOperationDefinitions, getV3Doc, removeUndefined, isQuery as testIsQuery } from './utils';
import { factory } from './utils/factory';

const generatedApiName = 'injectedRtkApi';
const v3DocCache: Record<string, OpenAPIV3.Document> = {};

function defaultIsDataResponse(code: string, includeDefault: boolean) {
  if (includeDefault && code === 'default') {
    return true;
  }
  const parsedCode = Number(code);
  return !Number.isNaN(parsedCode) && parsedCode >= 200 && parsedCode < 300;
}

function getOperationName({ verb, path }: Pick<OperationDefinition, 'verb' | 'path'>) {
  return _getOperationName(verb, path, undefined);
}

function getTags({ verb, pathItem }: Pick<OperationDefinition, 'verb' | 'pathItem'>): string[] {
  return verb ? pathItem[verb]?.tags || [] : [];
}

function patternMatches(pattern?: TextMatcher) {
  const filters = Array.isArray(pattern) ? pattern : [pattern];
  return function matcher(operationName: string) {
    if (!pattern) return true;
    return filters.some((filter) =>
      typeof filter === 'string' ? filter === operationName : filter?.test(operationName)
    );
  };
}

function operationMatches(pattern?: EndpointMatcher) {
  const checkMatch = typeof pattern === 'function' ? pattern : patternMatches(pattern);
  return function matcher(operationDefinition: OperationDefinition) {
    if (!pattern) return true;
    const operationName = getOperationName(operationDefinition);
    return checkMatch(operationName, operationDefinition);
  };
}

function argumentMatches(pattern?: ParameterMatcher) {
  const checkMatch = typeof pattern === 'function' ? pattern : patternMatches(pattern);
  return function matcher(argumentDefinition: ParameterDefinition) {
    if (!pattern || argumentDefinition.in === 'path') return true;
    const argumentName = argumentDefinition.name;
    return checkMatch(argumentName, argumentDefinition);
  };
}

function withQueryComment<T extends ts.Node>(node: T, def: QueryArgDefinition, hasTrailingNewLine: boolean): T {
  const comment = def.origin === 'param' ? def.param.description : def.body.description;
  if (comment) {
    return ts.addSyntheticLeadingComment(
      node,
      ts.SyntaxKind.MultiLineCommentTrivia,
      `* ${comment} `,
      hasTrailingNewLine
    );
  }
  return node;
}

export function getOverrides(
  operation: OperationDefinition,
  endpointOverrides?: EndpointOverrides[]
): EndpointOverrides | undefined {
  return endpointOverrides?.find((override) => operationMatches(override.pattern)(operation));
}

export async function generateApi(
  spec: string,
  {
    apiFile,
    apiImport = 'api',
    exportName = 'enhancedApi',
    argSuffix = 'ApiArg',
    responseSuffix = 'ApiResponse',
    operationNameSuffix = '',
    hooks = false,
    tag = false,
    outputFile,
    isDataResponse = defaultIsDataResponse,
    filterEndpoints,
    endpointOverrides,
    unionUndefined,
    encodePathParams = false,
    encodeQueryParams = false,
    flattenArg = false,
    includeDefault = false,
    useEnumType = false,
    mergeReadWriteOnly = false,
    httpResolverOptions,
    sharedTypesFile,
    queryMatch,
  }: GenerationOptions
): Promise<GenerateApiResult> {
  const v3Doc = (v3DocCache[spec] ??= await getV3Doc(spec, httpResolverOptions));

  const apiGen = new ApiGenerator(v3Doc, {
    unionUndefined,
    useEnumType,
    mergeReadWriteOnly,
  });

  const schemeTypeNames = new Set<string>();

  function addSchemeTypeName(name: string) {
    schemeTypeNames.add(name);
    schemeTypeNames.add(camelCase(name));
    schemeTypeNames.add(capitalize(camelCase(name)));
  }

  if (sharedTypesFile) {
    const resultFile = ts.createSourceFile(
      'sharedTypes.ts',
      '',
      ts.ScriptTarget.Latest,
      /*setParentNodes*/ false,
      ts.ScriptKind.TS
    );
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const allTypeDefinitions: ts.Statement[] = [];
    const definedTypeNames = new Set<string>();

    const components = v3Doc.components;
    if (components) {
      // 只處理 schemas，其他 component 類型暫時不處理
      if (components.schemas) {
        const typeEntries = Object.entries(components.schemas).map(([name, def]) => {
          addSchemeTypeName(name);
          const typeName = capitalize(camelCase(name));
          definedTypeNames.add(typeName);
          const typeNode = wrapWithSchemeIfComponent(apiGen.getTypeFromSchema(def as OpenAPIV3.SchemaObject));
          return factory.createTypeAliasDeclaration(
            [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            factory.createIdentifier(typeName),
            undefined,
            typeNode
          );
        });

        allTypeDefinitions.push(
          factory.createModuleDeclaration(
            [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            factory.createIdentifier('Scheme'),
            factory.createModuleBlock(typeEntries),
            ts.NodeFlags.Namespace
          )
        );
      }
    }

    const enumEntries = [
      ...apiGen.enumAliases.filter((e) => ts.isEnumDeclaration(e)),
      ...apiGen.enumAliases.filter((e) => ts.isTypeAliasDeclaration(e)),
    ].map((enumDecl) => {
      if (ts.isEnumDeclaration(enumDecl)) {
        return factory.createEnumDeclaration(
          [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          enumDecl.name,
          enumDecl.members
        );
      } else if (ts.isTypeAliasDeclaration(enumDecl)) {
        return factory.createTypeAliasDeclaration(
          [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          enumDecl.name,
          enumDecl.typeParameters,
          enumDecl.type
        );
      }
      return enumDecl;
    });

    const unionTypeEnums = apiGen.aliases
      .filter((alias) => {
        if (ts.isTypeAliasDeclaration(alias) && alias.type) {
          return ts.isUnionTypeNode(alias.type);
        }
        return false;
      })
      .map((alias) => {
        if (ts.isTypeAliasDeclaration(alias)) {
          return factory.createTypeAliasDeclaration(
            [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            alias.name,
            alias.typeParameters,
            alias.type
          );
        }
        return alias;
      });

    const allEnumEntries = [...enumEntries, ...unionTypeEnums];

    if (allEnumEntries.length > 0) {
      allTypeDefinitions.push(
        factory.createModuleDeclaration(
          [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          factory.createIdentifier('Enum'),
          factory.createModuleBlock(allEnumEntries),
          ts.NodeFlags.Namespace
        )
      );
    }

    if (apiGen.aliases.length > 0) {
      const aliasEntries = apiGen.aliases
        .filter((alias) => {
          if (ts.isTypeAliasDeclaration(alias)) {
            const isDefinedInComponents = definedTypeNames.has(alias.name.text);
            const isUnionTypeEnum = ts.isUnionTypeNode(alias.type);
            return !isDefinedInComponents && !isUnionTypeEnum;
          }
          return false;
        })
        .map((alias) => {
          if (ts.isTypeAliasDeclaration(alias)) {
            return factory.createTypeAliasDeclaration(
              [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
              alias.name,
              alias.typeParameters,
              alias.type
            );
          }
          return alias;
        });

      if (aliasEntries.length > 0) {
        const existingSchemeIndex = allTypeDefinitions.findIndex(
          (def) => ts.isModuleDeclaration(def) && ts.isIdentifier(def.name) && def.name.text === 'Scheme'
        );

        if (existingSchemeIndex >= 0) {
          const existingScheme = allTypeDefinitions[existingSchemeIndex] as ts.ModuleDeclaration;
          const mergedMembers = [...(existingScheme.body as ts.ModuleBlock).statements, ...aliasEntries];
          allTypeDefinitions[existingSchemeIndex] = factory.createModuleDeclaration(
            [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            factory.createIdentifier('Scheme'),
            factory.createModuleBlock(mergedMembers),
            ts.NodeFlags.Namespace
          );
        } else {
          allTypeDefinitions.push(
            factory.createModuleDeclaration(
              [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
              factory.createIdentifier('Scheme'),
              factory.createModuleBlock(aliasEntries),
              ts.NodeFlags.Namespace
            )
          );
        }
      }
    }

    const fs = await import('node:fs/promises');
    const path = await import('node:path');

    const sharedTypesDir = path.dirname(sharedTypesFile);
    await fs.mkdir(sharedTypesDir, { recursive: true });

    const output = printer.printNode(
      ts.EmitHint.Unspecified,
      factory.createSourceFile(
        allTypeDefinitions,
        factory.createToken(ts.SyntaxKind.EndOfFileToken),
        ts.NodeFlags.None
      ),
      resultFile
    );

    await fs.writeFile(sharedTypesFile, output, 'utf-8');
  }

  if (apiGen.spec.components?.schemas) {
    apiGen.preprocessComponents(apiGen.spec.components.schemas);
  }

  const operationDefinitions = getOperationDefinitions(v3Doc).filter(operationMatches(filterEndpoints));

  const resultFile = ts.createSourceFile(
    'someFileName.ts',
    '',
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS
  );
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const interfaces: Record<string, ts.InterfaceDeclaration | ts.TypeAliasDeclaration> = {};

  function registerInterface(declaration: ts.InterfaceDeclaration | ts.TypeAliasDeclaration) {
    const name = declaration.name.escapedText.toString();
    if (name in interfaces) {
      throw new Error(`interface/type alias ${name} already registered`);
    }
    interfaces[name] = declaration;
    return declaration;
  }

  if (outputFile) {
    outputFile = path.resolve(process.cwd(), outputFile);
    if (apiFile.startsWith('.')) {
      apiFile = path.relative(path.dirname(outputFile), apiFile);
      apiFile = apiFile.replace(/\\/g, '/');
      if (!apiFile.startsWith('.')) apiFile = `./${apiFile}`;
    }
  }
  apiFile = apiFile.replace(/\.[jt]sx?$/, '');

  const sharedTypesImportPath =
    sharedTypesFile && outputFile
      ? (() => {
          let rel = path
            .relative(path.dirname(outputFile), sharedTypesFile)
            .replace(/\\/g, '/')
            .replace(/\.[jt]sx?$/, '');
          if (!rel.startsWith('.')) rel = './' + rel;
          return rel;
        })()
      : './shared-types';

  // 收集操作名稱
  const operationNames: string[] = [];

  const sourceCode = printer.printNode(
    ts.EmitHint.Unspecified,
    factory.createSourceFile(
      [
        generateImportNode(apiFile, { [apiImport]: 'api' }),
        generateImportNode('@acrool/react-fetcher', { IRestFulEndpointsQueryReturn: 'IRestFulEndpointsQueryReturn' }),
        ...(sharedTypesFile
          ? [
              generateImportNode(sharedTypesImportPath, {
                Scheme: 'Scheme',
                ...(useEnumType ? { Enum: 'Enum' } : {}),
              }),
            ]
          : []),
        ...(tag ? [generateTagTypes({ addTagTypes: extractAllTagTypes({ operationDefinitions }) })] : []),
        generateCreateApiCall({
          tag,
          endpointDefinitions: factory.createObjectLiteralExpression(
            operationDefinitions.map((operationDefinition) => {
              const operationName = getOperationName({ verb: operationDefinition.verb, path: operationDefinition.path });
              const finalOperationName = operationNameSuffix ? capitalize(operationName + operationNameSuffix) : operationName;
              operationNames.push(finalOperationName);
              
              return generateEndpoint({
                operationDefinition,
                overrides: getOverrides(operationDefinition, endpointOverrides),
                sharedTypesFile: !!sharedTypesFile,
                queryMatch,
              });
            }),
            true
          ),
        }),
        factory.createExportAssignment(undefined, undefined, factory.createIdentifier(generatedApiName)),
        ...Object.values(interfaces),
        ...(sharedTypesFile ? [] : [...apiGen.aliases, ...apiGen.enumAliases]),
        ...(hooks
          ? [
              generateReactHooks({
                exportName: generatedApiName,
                operationDefinitions,
                endpointOverrides,
                config: hooks,
                queryMatch,
              }),
            ]
          : []),
      ],
      factory.createToken(ts.SyntaxKind.EndOfFileToken),
      ts.NodeFlags.None
    ),
    resultFile
  );

  return {
    sourceCode,
    operationNames,
  };

  function extractAllTagTypes({ operationDefinitions }: { operationDefinitions: OperationDefinition[] }) {
    const allTagTypes = new Set<string>();

    for (const operationDefinition of operationDefinitions) {
      const { verb, pathItem } = operationDefinition;
      for (const tag of getTags({ verb, pathItem })) {
        allTagTypes.add(tag);
      }
    }
    return [...allTagTypes];
  }

  function generateEndpoint({
    operationDefinition,
    overrides,
    sharedTypesFile,
    queryMatch,
  }: {
    operationDefinition: OperationDefinition;
    overrides?: EndpointOverrides;
    sharedTypesFile: boolean;
    queryMatch?: (method: string, path: string) => boolean;
  }) {
    const {
      verb,
      path,
      pathItem,
      operation,
      operation: { responses, requestBody },
    } = operationDefinition;
    const operationName = getOperationName({ verb, path });
    const tags = tag ? getTags({ verb, pathItem }) : [];
    const isQuery = testIsQuery(verb, path, overrides, queryMatch);

    const returnsJson = apiGen.getResponseType(responses) === 'json';
    let ResponseType: ts.TypeNode = factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword);
    if (returnsJson) {
      const returnTypes = Object.entries(responses || {})
        .map(
          ([code, response]) =>
            [
              code,
              apiGen.resolve(response),
              wrapWithSchemeIfComponent(
                apiGen.getTypeFromResponse(response, 'readOnly') ||
                  factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
              ),
            ] as const
        )
        .filter(([status, response]) =>
          isDataResponse(status, includeDefault, apiGen.resolve(response), responses || {})
        )
        .filter(([_1, _2, type]) => type !== keywordType.void)
        .map(([code, response, type]) => {
          return ts.addSyntheticLeadingComment(
            type,
            ts.SyntaxKind.MultiLineCommentTrivia,
            `* status ${code} ${response.description} `,
            false
          );
        });
      if (returnTypes.length > 0) {
        ResponseType = factory.createUnionTypeNode(returnTypes);
      }
    }

    const ResponseTypeName = factory.createTypeReferenceNode(
      registerInterface(
        factory.createTypeAliasDeclaration(
          [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          capitalize(operationName + operationNameSuffix + responseSuffix),
          undefined,
          ResponseType
        )
      ).name
    );

    const operationParameters = apiGen.resolveArray(operation.parameters);
    const pathItemParameters = apiGen
      .resolveArray(pathItem.parameters)
      .filter((pp) => !operationParameters.some((op) => op.name === pp.name && op.in === pp.in));

    const parameters = supportDeepObjects([...pathItemParameters, ...operationParameters])
      .filter(argumentMatches(overrides?.parameterFilter))
      .filter((param) => param.in !== 'header');

    const allNames = parameters.map((p) => p.name);
    const queryArg: QueryArgDefinitions = {};

    function generateName(name: string, potentialPrefix: string) {
      const isPureSnakeCase = /^[a-zA-Z][a-zA-Z0-9_]*$/.test(name);
      const hasNamingConflict = allNames.filter((n) => n === name).length > 1;
      if (hasNamingConflict) {
        name = `${potentialPrefix}_${name}`;
      }
      const camelCaseName = camelCase(name);
      if (isPureSnakeCase && !allNames.includes(camelCaseName)) {
        name = camelCaseName;
      }
      while (name in queryArg) {
        name = `_${name}`;
      }
      return name;
    }

    for (const param of parameters) {
      const name = generateName(param.name, param.in);
      queryArg[name] = {
        origin: 'param',
        name,
        originalName: param.name,
        type: wrapWithSchemeIfComponent(
          apiGen.getTypeFromSchema(isReference(param) ? param : param.schema, undefined, 'writeOnly')
        ),
        required: param.required,
        param,
      };
    }

    if (requestBody) {
      const body = apiGen.resolve(requestBody);
      const schema = apiGen.getSchemaFromContent(body.content);
      const type = wrapWithSchemeIfComponent(apiGen.getTypeFromSchema(schema));
      const schemaName = camelCase(
        (type as any).name ||
          getReferenceName(schema) ||
          (typeof schema === 'object' && 'title' in schema && schema.title) ||
          'body'
      );
      const name = generateName(schemaName in queryArg ? 'body' : schemaName, 'body');

      queryArg[name] = {
        origin: 'body',
        name,
        originalName: schemaName,
        type: wrapWithSchemeIfComponent(apiGen.getTypeFromSchema(schema, undefined, 'writeOnly')),
        required: true,
        body,
      };
    }

    const propertyName = (name: string | ts.PropertyName): ts.PropertyName => {
      if (typeof name === 'string') {
        return isValidIdentifier(name) ? factory.createIdentifier(name) : factory.createStringLiteral(name);
      }
      return name;
    };

    const queryArgValues = Object.values(queryArg);

    const isFlatArg = flattenArg && queryArgValues.length === 1;
    const QueryArg = factory.createTypeReferenceNode(
      registerInterface(
        factory.createTypeAliasDeclaration(
          [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          capitalize(operationName + operationNameSuffix + argSuffix),
          undefined,
          queryArgValues.length > 0
            ? isFlatArg
              ? withQueryComment(
                  factory.createUnionTypeNode([
                    queryArgValues[0].type,
                    ...(!queryArgValues[0].required
                      ? [factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)]
                      : []),
                  ]),
                  queryArgValues[0],
                  false
                )
              : factory.createTypeLiteralNode(
                  queryArgValues.map((def) =>
                    withQueryComment(
                      factory.createPropertySignature(
                        undefined,
                        propertyName(def.name),
                        createQuestionToken(!def.required),
                        def.type
                      ),
                      def,
                      true
                    )
                  )
                )
            : factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
        )
      ).name
    );

    return generateEndpointDefinition({
      operationName: operationNameSuffix ? capitalize(operationName + operationNameSuffix) : operationName,
      type: isQuery ? 'query' : 'mutation',
      Response: ResponseTypeName,
      QueryArg: factory.createTypeReferenceNode(factory.createIdentifier('IRestFulEndpointsQueryReturn'), [QueryArg]),
      queryFn: generateQueryFn({
        operationDefinition,
        queryArg,
        isQuery,
        isFlatArg,
        encodePathParams,
        encodeQueryParams,
      }),
      extraEndpointsProps: isQuery
        ? generateQueryEndpointProps({ operationDefinition })
        : generateMutationEndpointProps({ operationDefinition }),
      tags,
    });
  }

  function generateQueryFn({
    operationDefinition,
    queryArg,
    isFlatArg,
    isQuery,
    encodePathParams,
    encodeQueryParams,
  }: {
    operationDefinition: OperationDefinition;
    queryArg: QueryArgDefinitions;
    isFlatArg: boolean;
    isQuery: boolean;
    encodePathParams: boolean;
    encodeQueryParams: boolean;
  }) {
    const { path, verb, operation } = operationDefinition;

    const bodyParameter = Object.values(queryArg).find((def) => def.origin === 'body');

    const rootObject = factory.createIdentifier('queryArg');
    const variablesObject = factory.createPropertyAccessExpression(rootObject, factory.createIdentifier('variables'));

    // 提取 content type 的輔助函數
    function getContentType(): string | undefined {
      if (operation.requestBody) {
        const requestBody = apiGen.resolve(operation.requestBody);
        const contentTypes = Object.keys(requestBody.content || {});
        // 直接返回第一個可用的 content type
        return contentTypes[0];
      }
      return undefined;
    }

    function pickParams(paramIn: string) {
      return Object.values(queryArg).filter((def) => def.origin === 'param' && def.param.in === paramIn);
    }

    function createObjectLiteralProperty(parameters: QueryArgDefinition[], propertyName: string) {
      if (parameters.length === 0) return undefined;

      const properties = parameters.map((param) => {
        const value = isFlatArg
          ? variablesObject
          : factory.createPropertyAccessExpression(variablesObject, factory.createIdentifier(param.name));

        const encodedValue =
          encodeQueryParams && param.param?.in === 'query'
            ? factory.createConditionalExpression(
                value,
                undefined,
                factory.createCallExpression(factory.createIdentifier('encodeURIComponent'), undefined, [
                  factory.createCallExpression(factory.createIdentifier('String'), undefined, [value]),
                ]),
                undefined,
                factory.createIdentifier('undefined')
              )
            : value;

        return createPropertyAssignment(param.originalName, encodedValue);
      });

      return factory.createPropertyAssignment(
        factory.createIdentifier(propertyName),
        factory.createObjectLiteralExpression(properties, true)
      );
    }

    const contentType = getContentType();

    return factory.createArrowFunction(
      undefined,
      undefined,
      [factory.createParameterDeclaration(undefined, undefined, rootObject, undefined, undefined, undefined)],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      factory.createParenthesizedExpression(
        factory.createObjectLiteralExpression(
          [
            factory.createPropertyAssignment(
              factory.createIdentifier('url'),
              generatePathExpression(path, pickParams('path'), variablesObject, isFlatArg, encodePathParams)
            ),
            isQuery && verb.toUpperCase() === 'GET'
              ? undefined
              : factory.createPropertyAssignment(
                  factory.createIdentifier('method'),
                  factory.createStringLiteral(verb.toUpperCase())
                ),
            contentType
              ? factory.createPropertyAssignment(
                  factory.createIdentifier('contentType'),
                  factory.createStringLiteral(contentType)
                )
              : undefined,
            bodyParameter === undefined
              ? undefined
              : factory.createPropertyAssignment(
                  factory.createIdentifier('body'),
                  isFlatArg
                    ? variablesObject
                    : factory.createPropertyAccessExpression(
                        variablesObject,
                        factory.createIdentifier(bodyParameter.name)
                      )
                ),
            createObjectLiteralProperty(pickParams('cookie'), 'cookies'),
            createObjectLiteralProperty(pickParams('query'), 'params'),
            factory.createPropertyAssignment(
              factory.createIdentifier('fetchOptions'),
              factory.createPropertyAccessChain(
                rootObject,
                factory.createToken(ts.SyntaxKind.QuestionDotToken),
                factory.createIdentifier('fetchOptions')
              )
            ),
          ].filter(removeUndefined),
          false
        )
      )
    );
  }

  function generateQueryEndpointProps({}: { operationDefinition: OperationDefinition }): ObjectPropertyDefinitions {
    return {};
  }

  function generateMutationEndpointProps({}: { operationDefinition: OperationDefinition }): ObjectPropertyDefinitions {
    return {};
  }

  function wrapWithSchemeIfComponent(typeNode: ts.TypeNode): ts.TypeNode {
    if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName)) {
      const typeName = typeNode.typeName.text;

      // 檢查是否為 enum 類型（包括在 enumAliases 和 aliases 中的）
      const isEnumType =
        useEnumType &&
        (apiGen.enumAliases.some((enumDecl) => {
          if (ts.isEnumDeclaration(enumDecl) || ts.isTypeAliasDeclaration(enumDecl)) {
            return enumDecl.name.text === typeName;
          }
          return false;
        }) ||
          apiGen.aliases.some((alias) => {
            if (ts.isTypeAliasDeclaration(alias) && alias.type) {
              // 檢查是否為 union type 的 enum
              if (ts.isUnionTypeNode(alias.type)) {
                return alias.name.text === typeName;
              }
            }
            return false;
          }));

      if (isEnumType) {
        return factory.createTypeReferenceNode(
          factory.createQualifiedName(factory.createIdentifier('Enum'), typeNode.typeName),
          typeNode.typeArguments?.map(wrapWithSchemeIfComponent)
        );
      }

      if (schemeTypeNames.has(typeName)) {
        return factory.createTypeReferenceNode(
          factory.createQualifiedName(factory.createIdentifier('Scheme'), typeNode.typeName),
          typeNode.typeArguments?.map(wrapWithSchemeIfComponent)
        );
      }
      if (typeNode.typeArguments) {
        return factory.createTypeReferenceNode(
          typeNode.typeName,
          typeNode.typeArguments.map(wrapWithSchemeIfComponent)
        );
      }
    }
    if (ts.isArrayTypeNode(typeNode)) {
      return factory.createArrayTypeNode(wrapWithSchemeIfComponent(typeNode.elementType));
    }
    if (ts.isUnionTypeNode(typeNode)) {
      // 檢查是否為 enum 的 union type
      const unionTypes = typeNode.types;
      if (
        unionTypes.length > 0 &&
        unionTypes.every(
          (type) =>
            ts.isLiteralTypeNode(type) && (ts.isStringLiteral(type.literal) || ts.isNumericLiteral(type.literal))
        )
      ) {
        // 這是一個 enum 的 union type，我們需要找到對應的 enum 類型
        const enumValues = unionTypes
          .map((type) => {
            if (ts.isLiteralTypeNode(type)) {
              if (ts.isStringLiteral(type.literal)) {
                return type.literal.text;
              } else if (ts.isNumericLiteral(type.literal)) {
                return type.literal.text;
              }
            }
            return null;
          })
          .filter(Boolean);

        // 查找對應的 enum 類型
        const matchingEnum = apiGen.aliases.find((alias) => {
          if (ts.isTypeAliasDeclaration(alias) && ts.isUnionTypeNode(alias.type)) {
            const aliasValues = alias.type.types
              .map((type) => {
                if (ts.isLiteralTypeNode(type)) {
                  if (ts.isStringLiteral(type.literal)) {
                    return type.literal.text;
                  } else if (ts.isNumericLiteral(type.literal)) {
                    return type.literal.text;
                  }
                }
                return null;
              })
              .filter(Boolean);

            return aliasValues.length === enumValues.length && aliasValues.every((val) => enumValues.includes(val));
          }
          return false;
        });

        // 對於所有的 enum 類型，直接使用字串型別，不轉換為 Enum
        // 這樣可以避免自動命名造成的變更問題
        if (matchingEnum && ts.isTypeAliasDeclaration(matchingEnum)) {
          // 直接返回原始的 union type，不轉換為 Enum
          return typeNode;
        }
      }

      return factory.createUnionTypeNode(typeNode.types.map(wrapWithSchemeIfComponent));
    }
    if (ts.isTypeLiteralNode(typeNode)) {
      return factory.createTypeLiteralNode(
        typeNode.members.map((member) => {
          if (ts.isPropertySignature(member) && member.type) {
            return factory.updatePropertySignature(
              member,
              member.modifiers,
              member.name,
              member.questionToken,
              wrapWithSchemeIfComponent(member.type)
            );
          }
          return member;
        })
      );
    }
    return typeNode;
  }
}

function accessProperty(rootObject: ts.Identifier, propertyName: string) {
  return isValidIdentifier(propertyName)
    ? factory.createPropertyAccessExpression(rootObject, factory.createIdentifier(propertyName))
    : factory.createElementAccessExpression(rootObject, factory.createStringLiteral(propertyName));
}

function generatePathExpression(
  path: string,
  pathParameters: QueryArgDefinition[],
  rootObject: ts.Identifier | ts.PropertyAccessExpression,
  isFlatArg: boolean,
  encodePathParams: boolean
) {
  const expressions: Array<[string, string]> = [];

  const head = path.replace(/\{(.*?)}(.*?)(?=\{|$)/g, (_, expression, literal) => {
    const param = pathParameters.find((p) => p.originalName === expression);
    if (!param) {
      throw new Error(`path parameter ${expression} does not seem to be defined in '${path}'!`);
    }
    expressions.push([param.name, literal]);
    return '';
  });

  return expressions.length
    ? factory.createTemplateExpression(
        factory.createTemplateHead(head),
        expressions.map(([prop, literal], index) => {
          const value = isFlatArg
            ? rootObject
            : factory.createPropertyAccessExpression(rootObject, factory.createIdentifier(prop));
          const encodedValue = encodePathParams
            ? factory.createCallExpression(factory.createIdentifier('encodeURIComponent'), undefined, [
                factory.createCallExpression(factory.createIdentifier('String'), undefined, [value]),
              ])
            : value;
          return factory.createTemplateSpan(
            encodedValue,
            index === expressions.length - 1
              ? factory.createTemplateTail(literal)
              : factory.createTemplateMiddle(literal)
          );
        })
      )
    : factory.createNoSubstitutionTemplateLiteral(head);
}

type QueryArgDefinition = {
  name: string;
  originalName: string;
  type: ts.TypeNode;
  required?: boolean;
  param?: OpenAPIV3.ParameterObject;
} & (
  | {
      origin: 'param';
      param: OpenAPIV3.ParameterObject;
    }
  | {
      origin: 'body';
      body: OpenAPIV3.RequestBodyObject;
    }
);
type QueryArgDefinitions = Record<string, QueryArgDefinition>;
