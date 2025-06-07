// import {dialog} from '@acrool/react-dialog';
import {
  createRestFulFetcher,
  ERequestContentType,
  ERequestMethod,
  IRequestConfig,
  TContentTypeResolver,
  createAxiosInstance,
} from '@acrool/react-fetcher';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

const baseURL = '/api';

export const axiosInstance = createAxiosInstance({
  baseURL,
  headers: {
    'Cache-Control': 'no-cache',
    'X-Requested-With': 'XMLHttpRequest',
    'Client-Id': '5000EA53752D4FEA95FA878E3C56F83F',
    // Extend Headers...
  },
  timeout: 1200 * 1000,
});

const mutex = new Mutex();

// interface IQuery {
//     url: string
//     method?: string
//     body?: any
//     params?: any
//     args?: {
//         fetchOptions?: IRequestConfig,
//     }
// }

interface IQuery {
  url: string;
  method?: string;
  variables?: Record<string, any>;
  fetchOptions?: IRequestConfig;
}

/**
 * 根據 method 取得 Content-Type
 * @param method
 */
export const getContentTypeWithMethod: TContentTypeResolver = (method) => {
  if ([ERequestMethod.POST, ERequestMethod.PUT].includes(method)) return ERequestContentType.formData;
  if ([ERequestMethod.DELETE].includes(method)) return ERequestContentType.formUrlDecode;
  return ERequestContentType.json;
};

export const baseQueryWithAxios: BaseQueryFn<IQuery> = async (query, BaseQueryApi, extraOptions) => {
  await mutex.waitForUnlock();
  try {
    const { url, method, ...args } = query;

    console.log('args', args);

    const data = await createRestFulFetcher(axiosInstance, { url, method }, getContentTypeWithMethod)(args);

    return {
      data,
      meta: {},
    };
  } catch (error: any) {
    return {
      error: {
        code: error.code || 500,
        message: error.message,
      },
    };
  }
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAxios,
  endpoints: () => ({}),
  tagTypes: ['Audit'],
});
