/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetHistoryPayoutsReq, GetHistoryPayoutsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢派彩紀錄列表 */
        getHistoryPayouts: build.mutation<
            GetHistoryPayoutsRes,
            IRestFulEndpointsQueryReturn<GetHistoryPayoutsReq>
        >({
            invalidatesTags: [ECacheTagTypes.HISTORY_PAYOUT],
            query: (queryArg) => ({
                url: "/history/payouts",
                method: "GET",
                contentType: "application/json",
                params: {
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
  useGetHistoryPayoutsMutation,
} = injectedRtkApi;

export default injectedRtkApi;
