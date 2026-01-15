/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { GetVipLevelsReq, GetVipLevelsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 取得 VIP 等級表 */
        getVipLevels: build.mutation<
            GetVipLevelsRes,
            void
        >({
            query: (queryArg) => ({
                url: "/vip/levels",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetVipLevelsMutation,
} = injectedRtkApi;

export default injectedRtkApi;
