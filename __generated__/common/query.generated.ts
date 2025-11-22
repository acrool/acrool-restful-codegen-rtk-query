/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api } from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { GetParameterCommonReq, GetParameterCommonRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢 參數/通用參數 */
        getParameterCommon: build.mutation<
            GetParameterCommonRes,
            void
        >({
            query: (queryArg) => ({
                url: "/parameter/common",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetParameterCommonMutation,
} = injectedRtkApi;

export default injectedRtkApi;
