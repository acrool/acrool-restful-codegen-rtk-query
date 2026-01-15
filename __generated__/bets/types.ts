/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetHistoryBetsReq = {
  lobbyCode: string;
  startDate?: string;
  endDate?: string;
  currentPage?: number;
  pageLimit?: number;
};

export type GetHistoryBetsRes = {
  paginateInfo: {
    totalItems: number;
    totalPages: number;
  };
  paginateMeta: {
    currentPage: number;
    pageLimit: number;
  };
  rows: Schema.HistoryBetData[];
};
