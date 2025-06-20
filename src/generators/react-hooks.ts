import ts from 'typescript';
import { getOperationName } from 'oazapfts/generate';
import { capitalize, isQuery } from '../utils';
import type { OperationDefinition, EndpointOverrides, ConfigFile } from '../types';
import { getOverrides } from '../generate';
import { factory } from '../utils/factory';

type HooksConfigOptions = NonNullable<ConfigFile['hooks']>;

type GetReactHookNameParams = {
  operationDefinition: OperationDefinition;
  endpointOverrides: EndpointOverrides[] | undefined;
  config: HooksConfigOptions;
  queryMatch?: (method: string, path: string) => boolean;
};

type CreateBindingParams = {
  operationDefinition: OperationDefinition;
  overrides?: EndpointOverrides;
  isLazy?: boolean;
  queryMatch?: (method: string, path: string) => boolean;
};

const createBinding = ({
  operationDefinition: { verb, path },
  overrides,
  isLazy = false,
  queryMatch,
}: CreateBindingParams) =>
  factory.createBindingElement(
    undefined,
    undefined,
    factory.createIdentifier(
      `use${isLazy ? 'Lazy' : ''}${capitalize(getOperationName(verb, path, undefined))}${
        isQuery(verb, path, overrides, queryMatch) ? 'Query' : 'Mutation'
      }`
    ),
    undefined
  );

const getReactHookName = ({ operationDefinition, endpointOverrides, config, queryMatch }: GetReactHookNameParams) => {
  const overrides = getOverrides(operationDefinition, endpointOverrides);

  const baseParams = {
    operationDefinition,
    overrides,
    queryMatch,
  };

  const _isQuery = isQuery(operationDefinition.verb, operationDefinition.path, overrides, queryMatch);

  // If `config` is true, just generate everything
  if (typeof config === 'boolean') {
    return createBinding(baseParams);
  }

  // `config` is an object and we need to check for the configuration of each property
  if (_isQuery) {
    return [
      ...(config.queries ? [createBinding(baseParams)] : []),
      ...(config.lazyQueries ? [createBinding({ ...baseParams, isLazy: true })] : []),
    ];
  }

  return config.mutations ? createBinding(baseParams) : [];
};

type GenerateReactHooksParams = {
  exportName: string;
  operationDefinitions: OperationDefinition[];
  endpointOverrides: EndpointOverrides[] | undefined;
  config: HooksConfigOptions;
  queryMatch?: (method: string, path: string) => boolean;
};
export const generateReactHooks = ({
  exportName,
  operationDefinitions,
  endpointOverrides,
  config,
  queryMatch,
}: GenerateReactHooksParams) =>
  factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createObjectBindingPattern(
            operationDefinitions
              .map((operationDefinition) => getReactHookName({ operationDefinition, endpointOverrides, config, queryMatch }))
              .flat()
          ),
          undefined,
          undefined,
          factory.createIdentifier(exportName)
        ),
      ],
      ts.NodeFlags.Const
    )
  );
