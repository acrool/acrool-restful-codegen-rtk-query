/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostAuditExportReportReq = {
  body: {
    stationName?: string;
    operatorId?: string;
    statusId?: string;
    templateId?: string;
    auditStartDate?: string;
    auditEndDate?: string;
    areaCode?: string;
  };
};

export type PostAuditExportReportRes = {
  name: string; // 匯出檔案名稱
  mimeType: string; // 檔案MIME TYPE
  buffer: string; // Buffer
  message: string; // 訊息
};
