import type SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3 } from 'openapi-types';
import ts from 'typescript';

// 重新匯出服務相關類型
export type { 
  GroupConfig,
  GroupInfo 
} from './services/group-service';

export type { 
  FileWriteResult 
} from './services/file-writer-service';


export type {
  UnifiedGenerationOptions as EndpointGenerationOptions,
  UnifiedGenerationResult as EndpointGenerationResult
} from './services/unified-code-generator';

export type OperationDefinition = {
  path: string;
  verb: (typeof operationKeys)[number];
  pathItem: OpenAPIV3.PathItemObject;
  operation: OpenAPIV3.OperationObject;
};

export type ParameterDefinition = OpenAPIV3.ParameterObject;

type Require<T, K extends keyof T> = { [k in K]-?: NonNullable<T[k]> } & Omit<T, K>;
type Optional<T, K extends keyof T> = { [k in K]?: NonNullable<T[k]> } & Omit<T, K>;
type Id<T> = { [K in keyof T]: T[K] } & {};
type AtLeastOneKey<T> = {
  [K in keyof T]-?: Pick<T, K> & Partial<T>;
}[keyof T];

export const operationKeys = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;

export type GenerationOptions = Id<
  CommonOptions &
    Optional<OutputFileOptions, 'outputFile'> & {
      isDataResponse?(
        code: string,
        includeDefault: boolean,
        response: OpenAPIV3.ResponseObject,
        allResponses: OpenAPIV3.ResponsesObject
      ): boolean;
    }
>;

export interface CommonOptions {
  /**
   * local schema file path (only supports local files)
   */
  schemaFile: string;
  /**
   * remote schema file URL (when provided, will download to schemaFile path)
   */
  remoteFile?: string;
  /**
   * Configuration for WebApiConfiguration import
   * defaults to { file: "@core/api/web-api-configuration", importName: "WebApiConfiguration" }
   */
  apiConfiguration?: {
    file: string;
    importName: string;
  };
  /**
   * HTTP client configuration for API calls
   * defaults to { file: "@core/httpClient/webapi/webapi-http-client.providers", importName: "WEBAPI_HTTP_CLIENT" }
   */
  httpClient?: {
    file: string;
    importReturnTypeName: string; // 用於指定別名導入，例如 IRestFulEndpointsQueryReturn
  };
  /**
   * defaults to "enhancedApi"
   */
  exportName?: string;
  /**
   * defaults to "Req"
   */
  argSuffix?: string;
  /**
   * defaults to "Res"
   */
  responseSuffix?: string;
  /**
   * defaults to empty
   */
  operationNameSuffix?: string;
  /**
   * defaults to `false`
   * `true` will generate lazy query hooks (useLazy prefix) for query endpoints
   */
  useLazyQueries?: boolean;
  /**
   * defaults to false
   * `true` will generate a union type for `undefined` properties like: `{ id?: string | undefined }` instead of `{ id?: string }`
   */
  unionUndefined?: boolean;
  /**
   * defaults to false
   * `true` will result in all generated endpoints having `providesTags`/`invalidatesTags` declarations for the `tags` of their respective operation definition
   * @see https://redux-toolkit.js.org/rtk-query/usage/code-generation for more information
   */
  tag?: boolean;
  /**
   * defaults to false
   * `true` will add `encodeURIComponent` to the generated path parameters
   */
  encodePathParams?: boolean;
  /**
   * defaults to false
   * `true` will add `encodeURIComponent` to the generated query parameters
   */
  encodeQueryParams?: boolean;
  /**
   * defaults to false
   * `true` will "flatten" the arg so that you can do things like `useGetEntityById(1)` instead of `useGetEntityById({ entityId: 1 })`
   */
  flattenArg?: boolean;
  /**
   * default to false
   * If set to `true`, the default response type will be included in the generated code for all endpoints.
   * @see https://swagger.io/docs/specification/describing-responses/#default
   */
  includeDefault?: boolean;
  /**
   * default to false
   * `true` will not generate separate types for read-only and write-only properties.
   */
  mergeReadWriteOnly?: boolean;
  /**
   *
   * HTTPResolverOptions object that is passed to the SwaggerParser bundle function.
   */
  httpResolverOptions?: SwaggerParser.HTTPResolverOptions;

  /**
   * defaults to undefined
   * If present the given file will be used as prettier config when formatting the generated code. If undefined the default prettier config
   * resolution mechanism will be used.
   */
  prettierConfigFile?: string;
  /**
   * defaults to "@acrool/react-fetcher"
   * File path for importing IRestFulEndpointsQueryReturn type
   */
  endpointsQueryReturnTypeFile?: string;
}

export type TextMatcher = string | RegExp | (string | RegExp)[];

export type EndpointMatcherFunction = (operationName: string, operationDefinition: OperationDefinition) => boolean;

export type EndpointMatcher = TextMatcher | EndpointMatcherFunction;

export type ParameterMatcherFunction = (parameterName: string, parameterDefinition: ParameterDefinition) => boolean;

export type ParameterMatcher = TextMatcher | ParameterMatcherFunction;

export interface OutputFileOptions extends Partial<CommonOptions> {
  outputFile: string;
  filterEndpoints?: EndpointMatcher;
  endpointOverrides?: EndpointOverrides[];
  queryMatch?: (method: string, path: string) => boolean;
  sharedTypesFile?: string;
  /**
   * groupKey for service class naming, e.g., "room" -> "RoomService"
   */
  groupKey?: string;
}

export type EndpointOverrides = {
  pattern: EndpointMatcher;
} & AtLeastOneKey<{
  type: 'mutation' | 'query';
  parameterFilter: ParameterMatcher;
}>;

export type OutputFilesConfig = {
  groupKeyMatch: (path: string) => string;
  outputDir: string;
  queryMatch?: (method: string, path: string) => boolean;
  filterEndpoint?: (operationName: string, path: string, groupKey: string) => boolean;
};

export type ConfigFile =
  | Id<Require<CommonOptions & OutputFileOptions, 'outputFile'>>
  | Id<
      Omit<CommonOptions, 'outputFile'> & {
        // outputFiles: { [outputFile: string]: Omit<OutputFileOptions, 'outputFile'> };
        outputFiles: OutputFilesConfig
      }
    >;

export type GenerateApiResult = {
  operationNames: string[];
  files: {
    types: string;
    queryService: string; // RTK Query generated file
    index: string;
    enhanceEndpoints?: string; // RTK Query enhance endpoints file
    commonTypes?: string;
    componentSchema?: string;
  };
};



export type QueryArgDefinition = {
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

export type QueryArgDefinitions = Record<string, QueryArgDefinition>;