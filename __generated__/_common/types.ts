/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetAuditReq = {
  currentPage: number;
  pageLimit: number;
  stationName?: string;
  operatorId?: string;
  statusId?: string;
  templateId?: string;
  auditStartDate?: string;
  auditEndDate?: string;
  areaCode?: string;
};

export type GetAuditRes = {
  rows: Schema.AuditRows[];
  paginateInfo: Schema.PaginateInfo;
  paginateMeta: Schema.PaginateMeta;
};

export type PostAuditReq = {
  body: {
    templateId: string;
    operatorId?: string;
    stationName?: string;
    auditDate?: string;
    areaCode?: string;
  };
};

export type PostAuditRes = {
  message: string; // 訊息
  newId: string; // 新的ID
};
