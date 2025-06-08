import { baseApi as api } from "../../baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";
import { SharedTypes } from "./test_output/shared-types";
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
export const {
  usePostAuthSignLoginMutation,
  usePostAuthSignRefreshMutation,
  usePutAuthPasswordMutation,
  usePostAuthSignLogoutMutation,
} = injectedRtkApi;
