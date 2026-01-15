/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetWalletPayoutSettingsBankCardReq, GetWalletPayoutSettingsCvsStoresReq, GetWalletPayoutSettingsCryptoUsdtReq, GetWalletPayoutSettingsExchangeRateReq, GetWalletPayoutSettingsWithdrawalSettingReq, GetWalletPayoutSettingsBankCardRes, GetWalletPayoutSettingsCvsStoresRes, GetWalletPayoutSettingsCryptoUsdtRes, GetWalletPayoutSettingsExchangeRateRes, GetWalletPayoutSettingsWithdrawalSettingRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢銀行設定列表 */
        getWalletPayoutSettingsBankCard: build.mutation<
            GetWalletPayoutSettingsBankCardRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE, ECacheTagTypes.WALLET_PAYOUT_SETTING],
            query: (queryArg) => ({
                url: "/wallet/payout-settings/bank-card",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 查詢超商列表 */
        getWalletPayoutSettingsCvsStores: build.mutation<
            GetWalletPayoutSettingsCvsStoresRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.WALLET_PAYOUT_SETTING],
            query: (queryArg) => ({
                url: "/wallet/payout-settings/cvs/stores",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 查詢 USDT 地址設定 */
        getWalletPayoutSettingsCryptoUsdt: build.mutation<
            GetWalletPayoutSettingsCryptoUsdtRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.WALLET_PAYOUT_SETTING],
            query: (queryArg) => ({
                url: "/wallet/payout-settings/crypto-usdt",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 查詢 匯率 */
        getWalletPayoutSettingsExchangeRate: build.mutation<
            GetWalletPayoutSettingsExchangeRateRes,
            IRestFulEndpointsQueryReturn<GetWalletPayoutSettingsExchangeRateReq>
        >({
            invalidatesTags: [ECacheTagTypes.WALLET_PAYOUT_SETTING],
            query: (queryArg) => ({
                url: "/wallet/payout-settings/exchange-rate",
                method: "GET",
                contentType: "application/json",
                params: {
                    currency: queryArg.variables.currency,
                },
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 查詢提款設定 */
        getWalletPayoutSettingsWithdrawalSetting: build.mutation<
            GetWalletPayoutSettingsWithdrawalSettingRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.WALLET_PAYOUT_SETTING],
            query: (queryArg) => ({
                url: "/wallet/payout-settings/withdrawal-setting",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetWalletPayoutSettingsBankCardMutation,
  useGetWalletPayoutSettingsCvsStoresMutation,
  useGetWalletPayoutSettingsCryptoUsdtMutation,
  useGetWalletPayoutSettingsExchangeRateMutation,
  useGetWalletPayoutSettingsWithdrawalSettingMutation,
} = injectedRtkApi;

export default injectedRtkApi;
