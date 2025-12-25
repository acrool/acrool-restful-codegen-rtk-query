/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostWalletWithdrawalsBankCardReq, PostWalletWithdrawalsCryptoReq, PostWalletWithdrawalsBankCardRes, PostWalletWithdrawalsCryptoRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 提款卡提款 */
        postWalletWithdrawalsBankCard: build.mutation<
            PostWalletWithdrawalsBankCardRes,
            IRestFulEndpointsQueryReturn<PostWalletWithdrawalsBankCardReq>
        >({
            query: (queryArg) => ({
                url: "/wallet/withdrawals/bank-card",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** USDT 提款 */
        postWalletWithdrawalsCrypto: build.mutation<
            PostWalletWithdrawalsCryptoRes,
            IRestFulEndpointsQueryReturn<PostWalletWithdrawalsCryptoReq>
        >({
            query: (queryArg) => ({
                url: "/wallet/withdrawals/crypto",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePostWalletWithdrawalsBankCardMutation,
  usePostWalletWithdrawalsCryptoMutation,
} = injectedRtkApi;

export default injectedRtkApi;
