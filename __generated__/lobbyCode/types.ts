/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetLobbiesByLobbyCodeGamesReq = {
  lobbyCategoryCode?: string;
  currentPage?: number;
  pageLimit?: number;
  isMobileMode?: boolean;
  isFavorite?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  lobbyCode: string;
};

export type GetLobbiesByLobbyCodeGamesRes = {
  paginateInfo: {
    totalItems: number;
    totalPages: number;
  };
  paginateMeta: {
    currentPage: number;
    pageLimit: number;
  };
  rows: {
    id: string;
    name: string;
    isHot: boolean;
    isNew: boolean;
    isFavorite: boolean;
    isMaintain: boolean;
    rtp: number;
  }[];
};

export type PostLobbiesByLobbyCodeGamesAndGameIdEnterReq = {
  lobbyCode: string;
  gameId: string;
  body: {
    /** 遊戲館分類代號 */
    lobbyCategoryCode: string;
    /** 是否為手機模式（預設為 true） */
    isMobileMode?: boolean;
    /** 是否需要轉帳 */
    isNeedTransfer?: boolean;
  };
};

export type PostLobbiesByLobbyCodeGamesAndGameIdEnterRes = {
  url: string;
};

export type PutLobbiesByLobbyCodeGamesAndGameIdFavoriteReq = {
  lobbyCode: string;
  gameId: string;
  body: {
    /** 遊戲館分類代號 */
    lobbyCategoryCode?: string;
    /** 是否最愛 */
    isFavorite?: boolean;
  };
};

export type PutLobbiesByLobbyCodeGamesAndGameIdFavoriteRes = {
  message: string;
};
