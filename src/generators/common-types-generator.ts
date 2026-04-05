/**
 * 產生 CommonTypeFile
 */
export function generateCommonTypesFile() {

  return `/* eslint-disable */
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

export type UseSimpleQuery<TRes, TArg = void> = (
  arg: TArg,
  options?: {
    skip?: boolean;
    pollingInterval?: number;
    refetchOnMountOrArgChange?: boolean | number;
    refetchOnFocus?: boolean;
    refetchOnReconnect?: boolean;
  }
) => {
  data: TRes | undefined;
  currentData: TRes | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isUninitialized: boolean;
  error: unknown;
  refetch: () => void;
};

export type UseSimpleMutation<TRes, TArg = void> = () => [
  (arg: TArg) => {unwrap: () => Promise<TRes>} & PromiseLike<{data: TRes} | {error: unknown}>,
  {
    data: TRes | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isUninitialized: boolean;
    error: unknown;
    reset: () => void;
  }
];

export type UseSimpleLazyQuery<TRes, TArg = void> = () => [
  (arg: TArg, preferCacheValue?: boolean) => void,
  {
    data: TRes | undefined;
    currentData: TRes | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    isUninitialized: boolean;
    error: unknown;
  },
  {lastArg: TArg | undefined}
];
`;

}

