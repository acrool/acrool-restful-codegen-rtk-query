import { baseApi as api } from "../../baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAuthSignLogin: build.mutation<
      PostAuthSignLoginApiResponse,
      IRestFulEndpointsQueryReturn<PostAuthSignLoginApiArg>
    >({
      query: (queryArg) => ({
        url: `/auth/sign/login`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuthSignRefresh: build.mutation<
      PostAuthSignRefreshApiResponse,
      IRestFulEndpointsQueryReturn<PostAuthSignRefreshApiArg>
    >({
      query: (queryArg) => ({
        url: `/auth/sign/refresh`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    putAuthPassword: build.mutation<
      PutAuthPasswordApiResponse,
      IRestFulEndpointsQueryReturn<PutAuthPasswordApiArg>
    >({
      query: (queryArg) => ({
        url: `/auth/password`,
        method: "PUT",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuthSignLogout: build.mutation<
      PostAuthSignLogoutApiResponse,
      IRestFulEndpointsQueryReturn<PostAuthSignLogoutApiArg>
    >({
      query: (queryArg) => ({
        url: `/auth/sign/logout`,
        method: "POST",
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
  }),
  overrideExisting: false,
});
export default injectedRtkApi;
export type PostAuthSignLoginApiResponse = /** status 200  */ {
  tokenInfo: {
    accessToken: string;
    refreshToken: string;
  };
  /** 角色類型 */
  roleType: string;
  /** 訊息 */
  message: string;
};
export type PostAuthSignLoginApiArg = {
  body: {
    /** 帳號 */
    account?: string;
    /** 密碼 */
    password?: string;
  };
};
export type PostAuthSignRefreshApiResponse = /** status 200  */ {
  tokenInfo: {
    accessToken: string;
    refreshToken: string;
  };
};
export type PostAuthSignRefreshApiArg = {
  body: {
    /** 更新用Token */
    refreshToken?: string;
  };
};
export type PutAuthPasswordApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type PutAuthPasswordApiArg = {
  body: {
    /** 舊密碼 */
    oldPassword?: string;
    /** 新密碼 */
    newPassword?: string;
  };
};
export type PostAuthSignLogoutApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type PostAuthSignLogoutApiArg = void;
export type AuditDetailValue = {
  /** 單選值 */
  single?: string | null;
  /** 多選值 */
  multiple?: string[] | null;
  /** 純文字 */
  plainTxt?: string | null;
  /** 複合文字 (依複合文字順序依序填入) */
  richTxt?: string[] | null;
};
export type AuditDetailAnnex = {
  /** 檔案代碼 */
  fId: string;
  /** 開啟位置 */
  src: string;
  /** 檔名 */
  name: string;
  /** 媒體類型 */
  mime: string | null;
  /** 顯示順序 */
  order: number;
};
export const {
  usePostAuthSignLoginMutation,
  usePostAuthSignRefreshMutation,
  usePutAuthPasswordMutation,
  usePostAuthSignLogoutMutation,
} = injectedRtkApi;
