/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api } from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostAuthSignLoginReq, PostAuthSignRefreshReq, PostAuthSignLogoutReq, PostAuthSignLoginRes, PostAuthSignRefreshRes, PostAuthSignLogoutRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 登入 */
        postAuthSignLogin: build.mutation<
            PostAuthSignLoginRes,
            IRestFulEndpointsQueryReturn<PostAuthSignLoginReq>
        >({
            query: (queryArg) => ({
                url: "/auth/sign/login",
                method: "POST",
                contentType: "multipart/form-data",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 刷新 */
        postAuthSignRefresh: build.mutation<
            PostAuthSignRefreshRes,
            IRestFulEndpointsQueryReturn<PostAuthSignRefreshReq>
        >({
            query: (queryArg) => ({
                url: "/auth/sign/refresh",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 登出 */
        postAuthSignLogout: build.mutation<
            PostAuthSignLogoutRes,
            void
        >({
            query: (queryArg) => ({
                url: "/auth/sign/logout",
                method: "POST",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  usePostAuthSignLoginMutation,
  usePostAuthSignRefreshMutation,
  usePostAuthSignLogoutMutation,
} = injectedRtkApi;

export default injectedRtkApi;
