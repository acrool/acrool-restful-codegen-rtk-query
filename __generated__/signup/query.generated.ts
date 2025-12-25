/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostAuthSignupReq, PostAuthSignupRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 帳號註冊 */
        postAuthSignup: build.mutation<
            PostAuthSignupRes,
            IRestFulEndpointsQueryReturn<PostAuthSignupReq>
        >({
            query: (queryArg) => ({
                url: "/auth/signup",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePostAuthSignupMutation,
} = injectedRtkApi;

export default injectedRtkApi;
