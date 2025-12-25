/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetPromotionsByIdReq, PostMissionsByIdClaimReq, GetPromotionsByIdRes, PostMissionsByIdClaimRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢優惠活動明細 */
        getPromotionsById: build.mutation<
            GetPromotionsByIdRes,
            IRestFulEndpointsQueryReturn<GetPromotionsByIdReq>
        >({
            query: (queryArg) => ({
                url: `/promotions/${queryArg.variables.id}`,
                method: "GET",
                contentType: "application/json",
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 領取任務獎勵 */
        postMissionsByIdClaim: build.mutation<
            PostMissionsByIdClaimRes,
            IRestFulEndpointsQueryReturn<PostMissionsByIdClaimReq>
        >({
            invalidatesTags: [ECacheTagTypes.MISSIONS],
            query: (queryArg) => ({
                url: `/missions/${queryArg.variables.id}/claim`,
                method: "POST",
                contentType: "application/json",
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  useGetPromotionsByIdMutation,
  usePostMissionsByIdClaimMutation,
} = injectedRtkApi;

export default injectedRtkApi;
