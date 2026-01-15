/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { GetSupportChannelsReq, GetSupportChannelsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢客服管道列表 */
        getSupportChannels: build.mutation<
            GetSupportChannelsRes,
            void
        >({
            query: (queryArg) => ({
                url: "/support/channels",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetSupportChannelsMutation,
} = injectedRtkApi;

export default injectedRtkApi;
