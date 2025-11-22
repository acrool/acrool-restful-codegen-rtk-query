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
  hasRequestBody: boolean;
}>, options: GenerationOptions) {

  const { groupKey } = options;

  // 獲取類型名稱
  const httpClientTypeName = options.httpClient?.importReturnTypeName || options.httpClient?.importName || 'IRestFulEndpointsQueryReturn';

  // 生成端點定義
  const endpoints = endpointInfos.map(info => {
    const methodType = info.isQuery ? 'query' : 'mutation';
    const argType = info.isVoidArg ? 'void' : `${httpClientTypeName}<${info.argTypeName}>`;

    // 處理 path parameters - 替換 {id} 為 ${queryArg.variables.id}
    let urlPath = info.path;
    if (info.pathParams && info.pathParams.length > 0) {
      info.pathParams.forEach((param: any) => {
        urlPath = urlPath.replace(`{${param.name}}`, `\${queryArg.variables.${param.name}}`);
      });
      // 使用模板字符串
      urlPath = '`' + urlPath + '`';
    } else {
      // 使用普通字符串
      urlPath = `"${urlPath}"`;
    }

    // 處理 query parameters
    let paramsSection = '';
    if (info.queryParams && info.queryParams.length > 0) {
      const paramsLines = info.queryParams.map((param: any) =>
        `                    ${param.name}: queryArg.variables.${param.name},`
      ).join('\n');
      paramsSection = `
                params: {
${paramsLines}
                },`;
    }

    return `        /** ${info.summary || info.operationName} */
        ${info.operationName}: build.${methodType}<
            ${info.responseTypeName},
            ${argType}
        >({
            query: (queryArg) => ({
                url: ${urlPath},
                method: "${info.verb.toUpperCase()}",
                contentType: "${info.contentType}",${paramsSection}${info.hasRequestBody ? `
                body: queryArg.variables.body,` : ''}${info.isVoidArg ? '' : `
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
    ? `import {${options.apiConfiguration.importName} as api} from "${options.apiConfiguration.file.replace(/\.ts$/, '')}";
`
    : `import {baseApi as api} from "../../../library/redux/baseApi";
`;

  const httpClientImport = options.httpClient
    ? `import {${options.httpClient.importReturnTypeName || options.httpClient.importName}} from "${options.httpClient.file}";
`
    : `import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
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