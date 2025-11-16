import type { GenerationOptions } from '../types';

export function generateRtkQueryFile(endpointInfos: Array<{
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
  contentType: string;
}>, options: GenerationOptions) {

  const { groupKey } = options;

  // 獲取類型名稱
  const httpClientTypeName = options.httpClient?.importReturnTypeName || options.httpClient?.importName || 'IRestFulEndpointsQueryReturn';

  // 生成端點定義
  const endpoints = endpointInfos.map(info => {
    const methodType = info.isQuery ? 'query' : 'mutation';
    const argType = info.isVoidArg ? 'void' : `${httpClientTypeName}<${info.argTypeName}>`;

    return `    ${info.operationName}: build.${methodType}<
      ${info.responseTypeName},
      ${argType}
    >({
      query: (queryArg) => ({
        url: "${info.path}",
        method: "${info.verb.toUpperCase()}",
        contentType: "${info.contentType}",${info.isVoidArg ? '' : `
        body: queryArg.variables.body,`}${info.isVoidArg ? '' : `
        fetchOptions: queryArg?.fetchOptions,`}
      }),
    }),`;
  }).join('\n');

  // 生成類型導入
  const typeImports = [
    ...new Set([
      ...endpointInfos.map(info => info.argTypeName),
      ...endpointInfos.map(info => info.responseTypeName)
    ])
  ].filter(type => type !== 'VoidApiArg');

  const typeImportStatement = typeImports.length > 0
    ? `import type { ${typeImports.join(', ')} } from "./types";`
    : '';

  // 根據配置生成 import 語句
  const apiImport = options.apiConfiguration
    ? `import { ${options.apiConfiguration.importName} as api } from "${options.apiConfiguration.file.replace(/\.ts$/, '')}";
`
    : `import { baseApi as api } from "../../../library/redux/baseApi";
`;

  const httpClientImport = options.httpClient
    ? `import { ${options.httpClient.importReturnTypeName || options.httpClient.importName} } from "${options.httpClient.file}";
`
    : `import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";
`;

  return `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

${apiImport}${httpClientImport}
${typeImportStatement}


const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
${endpoints}
  }),
});

export const {
${endpointInfos.map(info => {
  const capitalizedOperationName = info.operationName.charAt(0).toUpperCase() + info.operationName.slice(1);
  if (info.isQuery) {
    // For queries, generate both regular and lazy hooks if useLazyQueries is enabled
    const regularHook = `use${capitalizedOperationName}Query`;
    if (options.useLazyQueries) {
      const lazyHook = `useLazy${capitalizedOperationName}Query`;
      return `  ${regularHook},\n  ${lazyHook},`;
    } else {
      return `  ${regularHook},`;
    }
  } else {
    // For mutations, only generate regular hook
    const mutationHook = `use${capitalizedOperationName}Mutation`;
    return `  ${mutationHook},`;
  }
}).join('\n')}
} = injectedRtkApi;

export default injectedRtkApi;
`;
}