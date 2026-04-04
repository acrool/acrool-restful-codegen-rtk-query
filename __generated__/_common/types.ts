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
    /** 範本ID */
    templateId: string;
    /** 老闆ID */
    operatorId?: string;
    /** 站點名稱 */
    stationName?: string;
    /** 觀察日期 */
    auditDate?: string;
    /** 區域代碼 */
    areaCode?: string;
  };
};

export type PostAuditRes = {
  /** 訊息 */
  message: string;
  /** 新的ID */
  newId: string;
};
