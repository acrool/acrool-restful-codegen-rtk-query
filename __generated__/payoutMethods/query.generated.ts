/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetProfilePayoutMethodsBankCardReq, PostProfilePayoutMethodsBankCardReq, GetProfilePayoutMethodsCryptoUsdtReq, PostProfilePayoutMethodsCryptoUsdtReq, GetProfilePayoutMethodsBankCardRes, PostProfilePayoutMethodsBankCardRes, GetProfilePayoutMethodsCryptoUsdtRes, PostProfilePayoutMethodsCryptoUsdtRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢銀行卡提款設定 */
        getProfilePayoutMethodsBankCard: build.mutation<
            GetProfilePayoutMethodsBankCardRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE, ECacheTagTypes.PROFILE_BANK],
            query: (queryArg) => ({
                url: "/profile/payout-methods/bank-card",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 新增銀行卡 */
        postProfilePayoutMethodsBankCard: build.mutation<
            PostProfilePayoutMethodsBankCardRes,
            IRestFulEndpointsQueryReturn<PostProfilePayoutMethodsBankCardReq>
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE_BANK],
            query: (queryArg) => ({
                url: "/profile/payout-methods/bank-card",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 查詢USDT提款設定 */
        getProfilePayoutMethodsCryptoUsdt: build.mutation<
            GetProfilePayoutMethodsCryptoUsdtRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE, ECacheTagTypes.PROFILE_BANK],
            query: (queryArg) => ({
                url: "/profile/payout-methods/crypto-usdt",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 新增USDT錢包 */
        postProfilePayoutMethodsCryptoUsdt: build.mutation<
            PostProfilePayoutMethodsCryptoUsdtRes,
            IRestFulEndpointsQueryReturn<PostProfilePayoutMethodsCryptoUsdtReq>
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE_BANK],
            query: (queryArg) => ({
                url: "/profile/payout-methods/crypto-usdt",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  useGetProfilePayoutMethodsBankCardMutation,
  usePostProfilePayoutMethodsBankCardMutation,
  useGetProfilePayoutMethodsCryptoUsdtMutation,
  usePostProfilePayoutMethodsCryptoUsdtMutation,
} = injectedRtkApi;

export default injectedRtkApi;
