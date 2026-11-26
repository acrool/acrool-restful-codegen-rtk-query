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
  tags: string[];
}>, options: GenerationOptions) {

  const { groupKey } = options;

  // 獲取類型名稱
  const httpClientTypeName = options.httpClient?.importReturnTypeName || 'IRestFulEndpointsQueryReturn';

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

    // 處理 tags
    let tagsSection = '';
    if (info.tags && info.tags.length > 0) {
      const tagsArray = info.tags.map(tag => {
        // 將 tag 轉為大駝峰（去除空格），與 ECacheTagTypes 枚舉 key 一致
        const pascalTag = tag.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
        return `ECacheTagTypes.${pascalTag}`;
      }).join(', ');
      if (info.isQuery) {
        tagsSection = `
            providesTags: [${tagsArray}],`;
      } else {
        tagsSection = `
            invalidatesTags: (result, error) => error ? [] : [${tagsArray}],`;
      }
    }

    return `        /** ${info.summary || info.operationName} */
        ${info.operationName}: build.${methodType}<
            ${info.responseTypeName},
            ${argType}
        >({${tagsSection}
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
    ? `import {${options.httpClient.importReturnTypeName}} from "${options.httpClient.file}";
`
    : `import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
`;

  // 檢查是否有任何 endpoint 使用了 tags
  const hasTags = endpointInfos.some(info => info.tags && info.tags.length > 0);
  const tagTypesImport = hasTags
    ? `import {ECacheTagTypes} from "../tagTypes";
`
    : '';

  // 判斷是否有各種 hook 類型，決定需要導入哪些簡化型別
  const hasVoidQuery = endpointInfos.some(info => info.isQuery && info.isVoidArg);
  const hasArgQuery = endpointInfos.some(info => info.isQuery && !info.isVoidArg);
  const hasLazyQuery = endpointInfos.some(info => info.isQuery) && !!options.useLazyQueries;
  const hasMutation = endpointInfos.some(info => !info.isQuery);

  const simpleTypeImports: string[] = [];
  if (hasArgQuery) simpleTypeImports.push('SimpleQueryHook');
  if (hasVoidQuery) simpleTypeImports.push('SimpleVoidQueryHook');
  if (hasLazyQuery) simpleTypeImports.push('SimpleLazyQueryHook');
  if (hasMutation) simpleTypeImports.push('UseSimpleMutation');

  const simpleTypeImportStatement = simpleTypeImports.length > 0
    ? `import type { ${simpleTypeImports.join(', ')} } from "../common-types";\n`
    : '';

  // 生成逐個導出（使用 as 切斷型別推導鏈）
  // tuple 回傳（mutation, lazy query）使用 as unknown as；object 回傳（query）使用 as
  const hookExports = endpointInfos.map(info => {
    const capitalizedOperationName = info.operationName.charAt(0).toUpperCase() + info.operationName.slice(1);
    const argType = info.isVoidArg ? 'void' : `${httpClientTypeName}<${info.argTypeName}>`;
    const lines: string[] = [];

    if (info.isQuery) {
      const regularHook = `use${capitalizedOperationName}Query`;
      if (info.isVoidArg) {
        lines.push(`export const ${regularHook} = injectedRtkApi.${regularHook} as SimpleVoidQueryHook<${info.responseTypeName}>;`);
      } else {
        lines.push(`export const ${regularHook} = injectedRtkApi.${regularHook} as SimpleQueryHook<${info.responseTypeName}, ${argType}>;`);
      }
      if (options.useLazyQueries) {
        const lazyHook = `useLazy${capitalizedOperationName}Query`;
        lines.push(`export const ${lazyHook} = injectedRtkApi.${lazyHook} as unknown as SimpleLazyQueryHook<${info.responseTypeName}, ${argType}>;`);
      }
    } else {
      const mutationHook = `use${capitalizedOperationName}Mutation`;
      lines.push(`export const ${mutationHook} = injectedRtkApi.${mutationHook} as unknown as UseSimpleMutation<${info.responseTypeName}, ${argType}>;`);
    }

    return lines.join('\n');
  }).join('\n');

  return `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

${apiImport}${httpClientImport}${tagTypesImport}${simpleTypeImportStatement}
${typeImportStatement}


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
${endpoints}
    }),
});

${hookExports}

export default injectedRtkApi;
`;
}
