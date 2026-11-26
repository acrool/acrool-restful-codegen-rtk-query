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

export interface RtkQueryBaseOptions {
  skip?: boolean;
  pollingInterval?: number;
  refetchOnMountOrArgChange?: boolean | number;
  refetchOnFocus?: boolean;
  refetchOnReconnect?: boolean;
}

export interface RtkQueryResult<TData> {
  data: TData | undefined;
  currentData: TData | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isUninitialized: boolean;
  error: unknown;
  refetch: () => void;
}

export type SimpleQueryHook<TData, TArg> = (
  arg: TArg,
  options?: RtkQueryBaseOptions
) => RtkQueryResult<TData>;

export type SimpleVoidQueryHook<TData> = (
  options?: RtkQueryBaseOptions
) => RtkQueryResult<TData>;

export type SimpleLazyQueryHook<TData, TArg> = () => readonly [
  (arg: TArg) => void,
  RtkQueryResult<TData>
];

export type UseSimpleMutation<TRes, TArg = void> = () => readonly [
  (arg: TArg) => Promise<TRes> & { unwrap: () => Promise<TRes> },
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
`;

}

