/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetHistoryTransactionsReq = {
  transactionType?: "deposit" | "withdrawal";
  startDate?: string;
  endDate?: string;
  currentPage?: number;
  pageLimit?: number;
};

export type GetHistoryTransactionsRes = {
  paginateInfo: {
    totalItems: number;
    totalPages: number;
  };
  paginateMeta: {
    currentPage: number;
    pageLimit: number;
  };
  rows: Schema.TransactionRow[];
};
