/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetHistoryBetsReq, GetHistoryBetsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢投注紀錄列表 */
        getHistoryBets: build.mutation<
            GetHistoryBetsRes,
            IRestFulEndpointsQueryReturn<GetHistoryBetsReq>
        >({
            invalidatesTags: [ECacheTagTypes.HISTORY_BET],
            query: (queryArg) => ({
                url: "/history/bets",
                method: "GET",
                contentType: "application/json",
                params: {
                    lobbyCode: queryArg.variables.lobbyCode,
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
  useGetHistoryBetsMutation,
} = injectedRtkApi;

export default injectedRtkApi;
