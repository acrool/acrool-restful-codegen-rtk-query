/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostAuthPasswordResetReq, PutProfilePasswordLoginReq, PutProfilePasswordWithdrawalReq, PostProfilePasswordWithdrawalResetReq, PostAuthPasswordResetRes, PutProfilePasswordLoginRes, PutProfilePasswordWithdrawalRes, PostProfilePasswordWithdrawalResetRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 重設登入密碼 */
        postAuthPasswordReset: build.mutation<
            PostAuthPasswordResetRes,
            IRestFulEndpointsQueryReturn<PostAuthPasswordResetReq>
        >({
            query: (queryArg) => ({
                url: "/auth/password/reset",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 變更登入密碼 */
        putProfilePasswordLogin: build.mutation<
            PutProfilePasswordLoginRes,
            IRestFulEndpointsQueryReturn<PutProfilePasswordLoginReq>
        >({
            query: (queryArg) => ({
                url: "/profile/password/login",
                method: "PUT",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 變更提款密碼 */
        putProfilePasswordWithdrawal: build.mutation<
            PutProfilePasswordWithdrawalRes,
            IRestFulEndpointsQueryReturn<PutProfilePasswordWithdrawalReq>
        >({
            query: (queryArg) => ({
                url: "/profile/password/withdrawal",
                method: "PUT",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 重設提款密碼 */
        postProfilePasswordWithdrawalReset: build.mutation<
            PostProfilePasswordWithdrawalResetRes,
            IRestFulEndpointsQueryReturn<PostProfilePasswordWithdrawalResetReq>
        >({
            query: (queryArg) => ({
                url: "/profile/password/withdrawal/reset",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePostAuthPasswordResetMutation,
  usePutProfilePasswordLoginMutation,
  usePutProfilePasswordWithdrawalMutation,
  usePostProfilePasswordWithdrawalResetMutation,
} = injectedRtkApi;

export default injectedRtkApi;
