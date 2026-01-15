/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { GetAnnouncementsReq, GetMessagesReq, GetProfileReq, GetLobbiesReq, GetPromotionsReq, GetMissionsReq, GetAnnouncementsRes, GetMessagesRes, GetProfileRes, GetLobbiesRes, GetPromotionsRes, GetMissionsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢公告列表 */
        getAnnouncements: build.mutation<
            GetAnnouncementsRes,
            IRestFulEndpointsQueryReturn<GetAnnouncementsReq>
        >({
            invalidatesTags: [ECacheTagTypes.ANNOUNCEMENTS],
            query: (queryArg) => ({
                url: "/announcements",
                method: "GET",
                contentType: "application/json",
                params: {
                    isActive: queryArg.variables.isActive,
                    currentPage: queryArg.variables.currentPage,
                    pageLimit: queryArg.variables.pageLimit,
                },
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 查詢訊息列表 */
        getMessages: build.mutation<
            GetMessagesRes,
            IRestFulEndpointsQueryReturn<GetMessagesReq>
        >({
            invalidatesTags: [ECacheTagTypes.MESSAGE],
            query: (queryArg) => ({
                url: "/messages",
                method: "GET",
                contentType: "application/json",
                params: {
                    isActive: queryArg.variables.isActive,
                    currentPage: queryArg.variables.currentPage,
                    pageLimit: queryArg.variables.pageLimit,
                },
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 查詢個人資料 */
        getProfile: build.mutation<
            GetProfileRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE, ECacheTagTypes.PROFILE_INFO],
            query: (queryArg) => ({
                url: "/profile",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 查詢 遊戲館列表 */
        getLobbies: build.mutation<
            GetLobbiesRes,
            void
        >({
            query: (queryArg) => ({
                url: "/lobbies",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 查詢優惠活動列表 */
        getPromotions: build.mutation<
            GetPromotionsRes,
            IRestFulEndpointsQueryReturn<GetPromotionsReq>
        >({
            query: (queryArg) => ({
                url: "/promotions",
                method: "GET",
                contentType: "application/json",
                params: {
                    currentPage: queryArg.variables.currentPage,
                    pageLimit: queryArg.variables.pageLimit,
                },
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 查詢任務 */
        getMissions: build.mutation<
            GetMissionsRes,
            void
        >({
            invalidatesTags: [ECacheTagTypes.MISSIONS, ECacheTagTypes.PROFILE],
            query: (queryArg) => ({
                url: "/missions",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetAnnouncementsMutation,
  useGetMessagesMutation,
  useGetProfileMutation,
  useGetLobbiesMutation,
  useGetPromotionsMutation,
  useGetMissionsMutation,
} = injectedRtkApi;

export default injectedRtkApi;
