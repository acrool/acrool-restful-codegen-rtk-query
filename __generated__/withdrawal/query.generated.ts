/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetWalletWithdrawalStatusReq, GetWalletWithdrawalStatusRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢提款單狀態 */
        getWalletWithdrawalStatus: build.mutation<
            GetWalletWithdrawalStatusRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE, ECacheTagTypes.PROFILE_WITHDRAWAL_STATUS],
            query: (queryArg) => ({
                url: "/wallet/withdrawal/status",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetWalletWithdrawalStatusMutation,
} = injectedRtkApi;

export default injectedRtkApi;
