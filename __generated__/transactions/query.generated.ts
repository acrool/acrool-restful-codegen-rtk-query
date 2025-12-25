/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetHistoryTransactionsReq, GetHistoryTransactionsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢交易紀錄列表 */
        getHistoryTransactions: build.mutation<
            GetHistoryTransactionsRes,
            IRestFulEndpointsQueryReturn<GetHistoryTransactionsReq>
        >({
            invalidatesTags: [ECacheTagTypes.HISTORY_TRANSACTION],
            query: (queryArg) => ({
                url: "/history/transactions",
                method: "GET",
                contentType: "application/json",
                params: {
                    transactionType: queryArg.variables.transactionType,
                    startDate: queryArg.variables.startDate,
                    endDate: queryArg.variables.endDate,
                    currentPage: queryArg.variables.currentPage,
                    pageLimit: queryArg.variables.pageLimit,
                },
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  useGetHistoryTransactionsMutation,
} = injectedRtkApi;

export default injectedRtkApi;
