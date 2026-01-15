/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetWalletDepositsBankTransferSettingReq, PostWalletDepositsBankTransferReq, GetWalletDepositsCvsSettingReq, PostWalletDepositsCvsReq, GetWalletDepositsCryptoSettingReq, PostWalletDepositsCryptoReq, GetWalletDepositsBankTransferSettingRes, PostWalletDepositsBankTransferRes, GetWalletDepositsCvsSettingRes, PostWalletDepositsCvsRes, GetWalletDepositsCryptoSettingRes, PostWalletDepositsCryptoRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢 銀行轉帳存款設定 */
        getWalletDepositsBankTransferSetting: build.mutation<
            GetWalletDepositsBankTransferSettingRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.WALLET_DEPOSITS],
            query: (queryArg) => ({
                url: "/wallet/deposits/bank-transfer/setting",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 銀行轉帳存款 */
        postWalletDepositsBankTransfer: build.mutation<
            PostWalletDepositsBankTransferRes,
            IRestFulEndpointsQueryReturn<PostWalletDepositsBankTransferReq>
        >({
            invalidatesTags: [ECacheTagTypes.WALLET],
            query: (queryArg) => ({
                url: "/wallet/deposits/bank-transfer",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 查詢 超商付款存款設定 */
        getWalletDepositsCvsSetting: build.mutation<
            GetWalletDepositsCvsSettingRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.WALLET_DEPOSITS],
            query: (queryArg) => ({
                url: "/wallet/deposits/cvs/setting",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 超商付款存款 */
        postWalletDepositsCvs: build.mutation<
            PostWalletDepositsCvsRes,
            IRestFulEndpointsQueryReturn<PostWalletDepositsCvsReq>
        >({
            invalidatesTags: [ECacheTagTypes.WALLET],
            query: (queryArg) => ({
                url: "/wallet/deposits/cvs",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 查詢 USDT存款設定 */
        getWalletDepositsCryptoSetting: build.mutation<
            GetWalletDepositsCryptoSettingRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.WALLET_DEPOSITS],
            query: (queryArg) => ({
                url: "/wallet/deposits/crypto/setting",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** USDT 存款 */
        postWalletDepositsCrypto: build.mutation<
            PostWalletDepositsCryptoRes,
            IRestFulEndpointsQueryReturn<PostWalletDepositsCryptoReq>
        >({
            invalidatesTags: [ECacheTagTypes.WALLET],
            query: (queryArg) => ({
                url: "/wallet/deposits/crypto",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  useGetWalletDepositsBankTransferSettingMutation,
  usePostWalletDepositsBankTransferMutation,
  useGetWalletDepositsCvsSettingMutation,
  usePostWalletDepositsCvsMutation,
  useGetWalletDepositsCryptoSettingMutation,
  usePostWalletDepositsCryptoMutation,
} = injectedRtkApi;

export default injectedRtkApi;
