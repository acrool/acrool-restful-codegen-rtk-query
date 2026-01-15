/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostAuthSmsCodesReq, PostAuthSmsCodesRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 發送手機驗證簡訊 */
        postAuthSmsCodes: build.mutation<
            PostAuthSmsCodesRes,
            IRestFulEndpointsQueryReturn<PostAuthSmsCodesReq>
        >({
            query: (queryArg) => ({
                url: "/auth/sms-codes",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePostAuthSmsCodesMutation,
} = injectedRtkApi;

export default injectedRtkApi;
