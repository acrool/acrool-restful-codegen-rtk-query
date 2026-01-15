import type { GenerationOptions } from '../types';

export function generateRtkEnhanceEndpointsFile(endpointInfos: Array<{
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
}>, options: GenerationOptions) {

  // 生成端點配置
  const endpointConfigs = endpointInfos.map(info => {
    // 為 query 類型的端點添加 providesTags，為 mutation 類型的添加 invalidatesTags
    if (info.isQuery) {
      // Query 端點提供 tags
      return `    ${info.operationName}: {
      providesTags: (result, error, arg) => [],
    },`;
    } else {
      // Mutation 端點使 tags 失效
      return `    ${info.operationName}: {
      invalidatesTags: (result, error, arg) => [],
    },`;
    }
  }).join('\n');

  // 生成 import 語句
  const importStatements = `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import api from "./query.generated";
`;

  return `${importStatements}
const enhancedApi = api.enhanceEndpoints({
  endpoints: {
${endpointConfigs}
  },
});

export default enhancedApi;
`;
}
