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

  return `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import api from "./query.generated";

const enhancedApi = api.enhanceEndpoints({
  endpoints: {},
});

export default enhancedApi;
`;
}
