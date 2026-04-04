import ts from 'typescript';
import type { GenerationOptions } from '../types';

/**
 * 轉換類型名稱為大駝峰命名
 */
const toPascalCase = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export interface EndpointInfo {
  operationName: string;
  argTypeName: string;
  responseTypeName: string;
  isQuery: boolean;
  verb: string;
  path: string;
  queryKeyName: string;
  queryParams: any[];
  pathParams: any[];
  isVoidArg: boolean;
  summary: string;
}

export function generateTypesFile(
  endpointInfos: EndpointInfo[],
  _options: GenerationOptions,
  schemaInterfaces?: Record<string, ts.InterfaceDeclaration | ts.TypeAliasDeclaration>,
  operationDefinitions?: any[]
) {

  // 創建 schema 類型名稱映射表 - 使用實際生成的類型名稱
  const schemaTypeMap: Record<string, string> = {};

  if (schemaInterfaces) {
    Object.keys(schemaInterfaces).forEach(actualTypeName => {
      // 直接使用實際生成的類型名稱，不進行轉換
      // 這確保了 types.ts 中的引用與 schema.ts 中的定義完全一致
      schemaTypeMap[actualTypeName] = actualTypeName;

      // 為了兼容 OpenAPI 中可能存在的不同命名方式，添加常見的映射
      // 例如：TokenResponseVO -> TokenResponseVo
      if (actualTypeName.endsWith('Vo')) {
        const openApiName = actualTypeName.slice(0, -2) + 'VO';
        schemaTypeMap[openApiName] = actualTypeName;
      }
      if (actualTypeName.endsWith('Dto')) {
        const openApiName = actualTypeName.slice(0, -3) + 'DTO';
        schemaTypeMap[openApiName] = actualTypeName;
      }
    });
  }

  // 生成 import 語句
  let importStatement = `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
`;

  // 檢查是否需要引入 schema.ts
  const hasSchemaTypes = schemaInterfaces && Object.keys(schemaInterfaces).length > 0;
  if (hasSchemaTypes) {
    importStatement += `import * as Schema from "../schema";\n`;
  }

  importStatement += '\n';

  // 收集所有需要的類型定義
  const typeDefinitions: string[] = [];

  // 注意：不再在 types.ts 中重複生成 schema 類型
  // schema 類型已經在 schema.ts 中生成，這裡直接使用 Schema.* 引用

  // 無論是否有 schema，都要生成 endpoint 特定的 Req/Res 類型
  const endpointTypes: string[] = [];

  // 為每個端點生成 Req/Res 類型
  endpointInfos.forEach(endpoint => {
    // 使用 endpoint 中提供的準確類型名稱
    const reqTypeName = endpoint.argTypeName;
    const resTypeName = endpoint.responseTypeName;

    // 生成 Request 類型（總是生成）
    if (reqTypeName) {
      const requestTypeContent = generateRequestTypeContent(endpoint, operationDefinitions, schemaTypeMap);
      if (requestTypeContent.trim() === '') {
        // 如果沒有實際內容，使用 void
        endpointTypes.push(
          `export type ${reqTypeName} = void;`,
          ``
        );
      } else {
        // 有實際內容，使用 type 定義
        endpointTypes.push(
          `export type ${reqTypeName} = {`,
          requestTypeContent,
          `};`,
          ``
        );
      }
    }

    // 生成 Response 類型（總是生成）
    if (resTypeName) {
      const responseTypeResult = generateResponseTypeContent(endpoint, operationDefinitions, schemaTypeMap);
      if (responseTypeResult.content.trim() === '') {
        // 如果沒有實際內容，使用 void
        endpointTypes.push(
          `export type ${resTypeName} = void;`,
          ``
        );
      } else if (responseTypeResult.isDirectType) {
        // 直接類型引用（如 $ref、array、primitive），使用 type alias
        endpointTypes.push(
          `export type ${resTypeName} = ${responseTypeResult.content};`,
          ``
        );
      } else {
        // 有 object 屬性內容，使用 type 定義
        endpointTypes.push(
          `export type ${resTypeName} = {`,
          responseTypeResult.content,
          `};`,
          ``
        );
      }
    }
  });

  if (endpointTypes.length > 0) {
    typeDefinitions.push(endpointTypes.join('\n'));
  }

  // 如果沒有任何類型定義，至少添加一些基本說明
  if (typeDefinitions.length === 0) {
    typeDefinitions.push(
      `// 此檔案用於定義 API 相關的類型`,
      `// 類型定義會根據 OpenAPI Schema 自動生成`,
      ``
    );
  }

  return importStatement + typeDefinitions.join('\n\n');
}

/**
 * 生成 Request 類型的內容
 */
function generateRequestTypeContent(endpoint: EndpointInfo, operationDefinitions?: any[], schemaTypeMap: Record<string, string> = {}): string {
  const properties: string[] = [];

  // 如果有 query 參數
  if (endpoint.queryParams && endpoint.queryParams.length > 0) {
    endpoint.queryParams.forEach(param => {
      const optional = param.required ? '' : '?';
      const paramType = getTypeFromParameter(param, schemaTypeMap);
      properties.push(`  ${param.name}${optional}: ${paramType};`);
    });
  }

  // 如果有 path 參數
  if (endpoint.pathParams && endpoint.pathParams.length > 0) {
    endpoint.pathParams.forEach(param => {
      const optional = param.required ? '' : '?';
      const paramType = getTypeFromParameter(param, schemaTypeMap);
      properties.push(`  ${param.name}${optional}: ${paramType};`);
    });
  }

  // 如果有 request body（從 operationDefinitions 中獲取）
  const operationDef = operationDefinitions?.find(op => {
    // 嘗試多種匹配方式
    return op.operation?.operationId === endpoint.operationName ||
      op.operation?.operationId === endpoint.operationName.toLowerCase() ||
      // 也嘗試匹配 verb + path 組合
      (op.verb === endpoint.verb.toLowerCase() && op.path === endpoint.path);
  });

  if (operationDef?.operation?.requestBody) {
    const requestBody = operationDef.operation.requestBody;
    const content = requestBody.content;

    // 處理不同的 content types，優先使用 application/json，其次嘗試其他類型
    const jsonContent = content['application/json'] || content['*/*'];
    const formContent = content['multipart/form-data'] || content['application/x-www-form-urlencoded'];

    if (jsonContent?.schema) {
      // indentLevel=1 因為 body 屬性已經在類型定義內（有 2 個空格縮排）
      const bodyType = getTypeFromSchema(jsonContent.schema, schemaTypeMap, 1);
      properties.push(`  body: ${bodyType};`);
    } else if (formContent?.schema) {
      // indentLevel=1 因為 body 屬性已經在類型定義內（有 2 個空格縮排）
      const bodyType = getTypeFromSchema(formContent.schema, schemaTypeMap, 1);
      properties.push(`  body: ${bodyType};`);
    } else {
      // fallback 到第一個可用的 content-type
      const firstContent = Object.values(content)[0] as any;
      if (firstContent?.schema) {
        const bodyType = getTypeFromSchema(firstContent.schema, schemaTypeMap, 1);
        properties.push(`  body: ${bodyType};`);
      } else {
        properties.push(`  body?: any; // Request body from OpenAPI`);
      }
    }
  }

  // 如果沒有任何參數，返回空內容（將由調用方處理為 void）
  if (properties.length === 0) {
    return ''; // 返回空字串，讓調用方決定使用 void
  }

  return properties.join('\n');
}

interface ResponseTypeResult {
  content: string;
  /** true when content is a direct type (e.g. Schema.Pet, string[]) rather than object properties */
  isDirectType: boolean;
}

/**
 * 生成 Response 類型的內容
 */
function generateResponseTypeContent(endpoint: EndpointInfo, operationDefinitions?: any[], schemaTypeMap: Record<string, string> = {}): ResponseTypeResult {
  // 嘗試從 operationDefinitions 中獲取響應結構
  const operationDef = operationDefinitions?.find(op => {
    // 嘗試多種匹配方式
    return op.operation?.operationId === endpoint.operationName ||
      op.operation?.operationId === endpoint.operationName.toLowerCase() ||
      // 也嘗試匹配 verb + path 組合
      (op.verb === endpoint.verb.toLowerCase() && op.path === endpoint.path);
  });

  if (operationDef?.operation?.responses) {
    // 檢查 200 響應
    const successResponse = operationDef.operation.responses['200'] ||
      operationDef.operation.responses['201'];

    if (successResponse?.content) {
      // 優先使用 application/json，其次嘗試其他 content-type（包括 */*）
      const jsonContent = successResponse.content['application/json'] ||
        successResponse.content['*/*'] ||
        Object.values(successResponse.content)[0]; // fallback 到第一個可用的 content-type

      if (jsonContent?.schema) {
        const schema = jsonContent.schema;

        // 如果 schema 是 $ref 引用、array、或 primitive，直接使用 getTypeFromSchema
        if (schema.$ref || schema.type !== 'object' || !schema.properties) {
          const directType = getTypeFromSchema(schema, schemaTypeMap, 0);
          if (directType && directType !== 'any') {
            return { content: directType, isDirectType: true };
          }
        }

        // 如果是有 properties 的 object，展開為屬性列表
        const responseProps = parseSchemaProperties(schema, schemaTypeMap);
        if (responseProps.length > 0) {
          return { content: responseProps.join('\n'), isDirectType: false };
        }
      }
    }
  }

  // 如果沒有響應定義，返回空內容（將由調用方處理為 void）
  return { content: '', isDirectType: false };
}

/**
 * 解析 OpenAPI schema 的 properties 並生成 TypeScript 屬性定義
 */
function parseSchemaProperties(schema: any, schemaTypeMap: Record<string, string> = {}): string[] {
  const properties: string[] = [];

  if (schema.type === 'object' && schema.properties) {
    const required = schema.required || [];

    Object.entries(schema.properties).forEach(([propName, propSchema]: [string, any]) => {
      const isRequired = required.includes(propName);
      const optional = isRequired ? '' : '?';
      // indentLevel=1 因為屬性已經在類型定義內（有 2 個空格縮排）
      const propType = getTypeFromSchema(propSchema, schemaTypeMap, 1);

      // 如果屬性名包含特殊字符（如 -），需要加上引號
      const needsQuotes = /[^a-zA-Z0-9_$]/.test(propName);
      const quotedPropName = needsQuotes ? `"${propName}"` : propName;

      // 生成 JSDoc 註解
      if (propSchema.description) {
        properties.push(`  /** ${propSchema.description} */`);
      }
      properties.push(`  ${quotedPropName}${optional}: ${propType};`);
    });
  }

  return properties;
}

/**
 * 從 OpenAPI schema 獲取 TypeScript 類型
 * @param schema OpenAPI schema 定義
 * @param schemaTypeMap 類型名稱映射表
 * @param indentLevel 縮排層級，用於格式化內嵌物件
 */
function getTypeFromSchema(schema: any, schemaTypeMap: Record<string, string> = {}, indentLevel: number = 0): string {
  if (!schema) return 'any';

  // 處理 $ref 引用，使用 Schema.TypeName 格式
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (refPath.startsWith('#/components/schemas/')) {
      const originalTypeName = refPath.replace('#/components/schemas/', '');
      // 使用映射表查找實際的類型名稱，並轉換為大駝峰
      const actualTypeName = schemaTypeMap[originalTypeName] || originalTypeName;
      const pascalCaseTypeName = toPascalCase(actualTypeName);
      const baseType = `Schema.${pascalCaseTypeName}`;
      // 處理 nullable
      return schema.nullable ? `${baseType} | null` : baseType;
    }
  }

  let baseType: string;

  switch (schema.type) {
    case 'string':
      if (schema.enum) {
        baseType = schema.enum.map((val: string) => `"${val}"`).join(' | ');
      } else if (schema.format === 'binary') {
        // 處理檔案上傳：format: "binary" 應該對應 Blob 類型
        baseType = 'Blob';
      } else {
        baseType = 'string';
      }
      break;
    case 'number':
    case 'integer':
      baseType = 'number';
      break;
    case 'boolean':
      baseType = 'boolean';
      break;
    case 'array':
      const itemType = schema.items ? getTypeFromSchema(schema.items, schemaTypeMap, indentLevel) : 'any';
      // 如果 itemType 包含聯合類型（包含 |），需要加括號
      const needsParentheses = itemType.includes('|');
      baseType = needsParentheses ? `(${itemType})[]` : `${itemType}[]`;
      break;
    case 'object':
      if (schema.properties) {
        // 如果有具體的屬性定義，生成內聯對象類型（多行格式）
        const entries = Object.entries(schema.properties);

        // 如果沒有屬性但有 additionalProperties，生成 Record 類型
        if (entries.length === 0) {
          if (schema.additionalProperties) {
            const valueType = schema.additionalProperties === true
              ? 'any'
              : getTypeFromSchema(schema.additionalProperties, schemaTypeMap, indentLevel);
            baseType = `Record<string, ${valueType}>`;
          } else {
            baseType = '{}';
          }
        } else {
          // 計算下一層的縮排
          const nextIndent = '  '.repeat(indentLevel + 1);
          const currentIndent = '  '.repeat(indentLevel);

          const props: string[] = [];
          entries.forEach(([key, propSchema]: [string, any]) => {
            const required = schema.required || [];
            const optional = required.includes(key) ? '' : '?';
            const type = getTypeFromSchema(propSchema, schemaTypeMap, indentLevel + 1);

            // 如果屬性名包含特殊字符（如 -），需要加上引號
            const needsQuotes = /[^a-zA-Z0-9_$]/.test(key);
            const quotedKey = needsQuotes ? `"${key}"` : key;

            // 生成 JSDoc 註解
            if (propSchema.description) {
              props.push(`${nextIndent}/** ${propSchema.description} */`);
            }
            props.push(`${nextIndent}${quotedKey}${optional}: ${type};`);
          });

          baseType = `{\n${props.join('\n')}\n${currentIndent}}`;
        }
      } else if (schema.additionalProperties) {
        // 如果沒有 properties 但有 additionalProperties
        const valueType = schema.additionalProperties === true
          ? 'any'
          : getTypeFromSchema(schema.additionalProperties, schemaTypeMap, indentLevel);
        baseType = `Record<string, ${valueType}>`;
      } else {
        baseType = 'any';
      }
      break;
    default:
      baseType = 'any';
      break;
  }

  // 處理 nullable
  return schema.nullable ? `${baseType} | null` : baseType;
}

/**
 * 從參數定義中獲取 TypeScript 類型
 */
function getTypeFromParameter(param: any, schemaTypeMap: Record<string, string> = {}): string {
  if (!param.schema) return 'any';
  return getTypeFromSchema(param.schema, schemaTypeMap);
}
