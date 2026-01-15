/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetHistoryPayoutsReq = {
  startDate?: string;
  endDate?: string;
  currentPage?: number;
  pageLimit?: number;
};

export type GetHistoryPayoutsRes = {
  paginateInfo: {
    totalItems: number;
    totalPages: number;
  };
  paginateMeta: {
    currentPage: number;
    pageLimit: number;
  };
  rows: Schema.HistoryPayoutData[];
};
