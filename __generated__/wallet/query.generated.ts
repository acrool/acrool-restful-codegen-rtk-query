/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetProfileWalletBalanceReq, GetProfileWalletBalanceRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢錢包餘額 */
        getProfileWalletBalance: build.mutation<
            GetProfileWalletBalanceRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE, ECacheTagTypes.PROFILE_WALLET],
            query: (queryArg) => ({
                url: "/profile/wallet/balance",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetProfileWalletBalanceMutation,
} = injectedRtkApi;

export default injectedRtkApi;
