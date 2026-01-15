/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { ECacheTagTypes } from "@/store/tagTypes";
import api from "./query.generated";

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    getLobbiesByLobbyCodeGames: {
      invalidatesTags: (result, error, arg) => [],
    },
    postLobbiesByLobbyCodeGamesAndGameIdEnter: {
      invalidatesTags: (result, error, arg) => [],
    },
    putLobbiesByLobbyCodeGamesAndGameIdFavorite: {
      invalidatesTags: (result, error, arg) => [],
    },
  },
});

export default enhancedApi;
