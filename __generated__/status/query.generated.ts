/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { GetSystemStatusReq, GetSystemStatusRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢系統狀態 */
        getSystemStatus: build.mutation<
            GetSystemStatusRes,
            void
        >({
            query: (queryArg) => ({
                url: "/system/status",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetSystemStatusMutation,
} = injectedRtkApi;

export default injectedRtkApi;
