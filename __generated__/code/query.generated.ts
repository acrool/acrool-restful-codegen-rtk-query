/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostLobbiesByCodeEnterReq, PostLobbiesByCodeEnterRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 進入遊戲館 */
        postLobbiesByCodeEnter: build.mutation<
            PostLobbiesByCodeEnterRes,
            IRestFulEndpointsQueryReturn<PostLobbiesByCodeEnterReq>
        >({
            query: (queryArg) => ({
                url: `/lobbies/${queryArg.variables.code}/enter`,
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePostLobbiesByCodeEnterMutation,
} = injectedRtkApi;

export default injectedRtkApi;
