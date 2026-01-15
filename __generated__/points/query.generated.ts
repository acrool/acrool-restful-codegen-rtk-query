/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetHistoryPointsReq, GetHistoryPointsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢點數異動紀錄列表 */
        getHistoryPoints: build.mutation<
            GetHistoryPointsRes,
            IRestFulEndpointsQueryReturn<GetHistoryPointsReq>
        >({
            invalidatesTags: [ECacheTagTypes.HISTORY_POINT],
            query: (queryArg) => ({
                url: "/history/points",
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
  useGetHistoryPointsMutation,
} = injectedRtkApi;

export default injectedRtkApi;
