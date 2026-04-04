/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostAuditExportReportReq = {
  body: {
    /** 站點名稱 */
    stationName?: string;
    /** 老闆ID */
    operatorId?: string;
    /** 觀察狀態 */
    statusId?: string;
    /** 樣板ID */
    templateId?: string;
    /** 觀察日期(開始) */
    auditStartDate?: string;
    /** 觀察日期(結束) */
    auditEndDate?: string;
    /** 區域代碼 */
    areaCode?: string;
  };
};

export type PostAuditExportReportRes = {
  /** 匯出檔案名稱 */
  name: string;
  /** 檔案MIME TYPE */
  mimeType: string;
  /** Buffer */
  buffer: string;
  /** 訊息 */
  message: string;
};
