/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { GetLobbiesCategoriesReq, GetPromotionsCategoriesReq, GetLobbiesCategoriesRes, GetPromotionsCategoriesRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢 遊戲館分類列表 */
        getLobbiesCategories: build.mutation<
            GetLobbiesCategoriesRes,
            void
        >({
            query: (queryArg) => ({
                url: "/lobbies/categories",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 查詢優惠活動類型列表 */
        getPromotionsCategories: build.mutation<
            GetPromotionsCategoriesRes,
            void
        >({
            query: (queryArg) => ({
                url: "/promotions/categories",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetLobbiesCategoriesMutation,
  useGetPromotionsCategoriesMutation,
} = injectedRtkApi;

export default injectedRtkApi;
