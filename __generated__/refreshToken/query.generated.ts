/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostAuthRefreshTokenReq, PostAuthRefreshTokenRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 刷新Token */
        postAuthRefreshToken: build.mutation<
            PostAuthRefreshTokenRes,
            IRestFulEndpointsQueryReturn<PostAuthRefreshTokenReq>
        >({
            query: (queryArg) => ({
                url: "/auth/refreshToken",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePostAuthRefreshTokenMutation,
} = injectedRtkApi;

export default injectedRtkApi;
