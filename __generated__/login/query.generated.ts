/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostAuthLoginReq, PostAuthLoginRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 帳號登入 */
        postAuthLogin: build.mutation<
            PostAuthLoginRes,
            IRestFulEndpointsQueryReturn<PostAuthLoginReq>
        >({
            query: (queryArg) => ({
                url: "/auth/login",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePostAuthLoginMutation,
} = injectedRtkApi;

export default injectedRtkApi;
