/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { PostAuthSignoutReq, PostAuthSignoutRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 會員登出 */
        postAuthSignout: build.mutation<
            PostAuthSignoutRes,
            IRestFulEndpointsQueryReturn<PostAuthSignoutReq>
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE, ECacheTagTypes.WALLET],
            query: (queryArg) => ({
                url: "/auth/signout",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePostAuthSignoutMutation,
} = injectedRtkApi;

export default injectedRtkApi;
