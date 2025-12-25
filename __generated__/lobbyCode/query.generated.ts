/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { GetLobbiesByLobbyCodeGamesReq, PostLobbiesByLobbyCodeGamesAndGameIdEnterReq, PutLobbiesByLobbyCodeGamesAndGameIdFavoriteReq, GetLobbiesByLobbyCodeGamesRes, PostLobbiesByLobbyCodeGamesAndGameIdEnterRes, PutLobbiesByLobbyCodeGamesAndGameIdFavoriteRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢 遊戲列表 */
        getLobbiesByLobbyCodeGames: build.mutation<
            GetLobbiesByLobbyCodeGamesRes,
            IRestFulEndpointsQueryReturn<GetLobbiesByLobbyCodeGamesReq>
        >({
            query: (queryArg) => ({
                url: `/lobbies/${queryArg.variables.lobbyCode}/games`,
                method: "GET",
                contentType: "application/json",
                params: {
                    lobbyCategoryCode: queryArg.variables.lobbyCategoryCode,
                    currentPage: queryArg.variables.currentPage,
                    pageLimit: queryArg.variables.pageLimit,
                    isMobileMode: queryArg.variables.isMobileMode,
                    isFavorite: queryArg.variables.isFavorite,
                    isHot: queryArg.variables.isHot,
                    isNew: queryArg.variables.isNew,
                },
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 進入遊戲 */
        postLobbiesByLobbyCodeGamesAndGameIdEnter: build.mutation<
            PostLobbiesByLobbyCodeGamesAndGameIdEnterRes,
            IRestFulEndpointsQueryReturn<PostLobbiesByLobbyCodeGamesAndGameIdEnterReq>
        >({
            query: (queryArg) => ({
                url: `/lobbies/${queryArg.variables.lobbyCode}/games/${queryArg.variables.gameId}/enter`,
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 設定 遊戲為最愛 */
        putLobbiesByLobbyCodeGamesAndGameIdFavorite: build.mutation<
            PutLobbiesByLobbyCodeGamesAndGameIdFavoriteRes,
            IRestFulEndpointsQueryReturn<PutLobbiesByLobbyCodeGamesAndGameIdFavoriteReq>
        >({
            query: (queryArg) => ({
                url: `/lobbies/${queryArg.variables.lobbyCode}/games/${queryArg.variables.gameId}/favorite`,
                method: "PUT",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  useGetLobbiesByLobbyCodeGamesMutation,
  usePostLobbiesByLobbyCodeGamesAndGameIdEnterMutation,
  usePutLobbiesByLobbyCodeGamesAndGameIdFavoriteMutation,
} = injectedRtkApi;

export default injectedRtkApi;
