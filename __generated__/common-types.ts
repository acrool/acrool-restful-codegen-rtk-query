/* eslint-disable */
// [Warning] Generated automatically - do not edit manually
 
export interface RequestOptions {
  headers?: Record<string, string>;
  observe?: 'body' | 'events' | 'response';
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface IRequestConfig {
  timeout?: number;
}

export type IRestFulEndpointsQueryReturn<TVariables> = TVariables extends void ? 
  void | {fetchOptions?: IRequestConfig;}: 
  {
      variables: TVariables;
      fetchOptions?: IRequestConfig;
  };
