/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetAuditByIdReq = {
  id: string;
};

export type GetAuditByIdRes = Schema.AuditDetail;

export type PutAuditByIdReq = {
  id: string;
  body: {
    question: Schema.UpdateAuditQuestion;
  };
};

export type PutAuditByIdRes = {
  /** 訊息 */
  message: string;
};

export type PostAuditByIdReq = {
  id: string;
  body: {
    /** 問題回答 */
    questions?: Schema.UpdateAuditQuestion[];
    /** 備註 */
    remark?: string;
    /** 觀察人員簽名 */
    auditSignature?: Blob;
    /** 現場人員簽名 */
    managerSignature?: Blob;
  };
};

export type PostAuditByIdRes = {
  /** 訊息 */
  message: string;
  /** 新的ID */
  newId: string;
};

export type PutAuditByIdProfileReq = {
  id: string;
  body: {
    /** 區域代號 */
    areaCode: string;
    /** 站點名稱 */
    stationName?: string;
  };
};

export type PutAuditByIdProfileRes = {
  /** 訊息 */
  message: string;
};

export type PostAuditByIdAuditSignatureReq = {
  id: string;
  body: {
    /** 觀察人員簽名 */
    auditSignature?: Blob;
    /** 備註 */
    remark?: string;
  };
};

export type PostAuditByIdAuditSignatureRes = {
  /** 訊息 */
  message: string;
  /** 新的ID */
  newId: string;
};

export type PostAuditByIdManagerSignatureReq = {
  id: string;
  body: {
    /** 現場人員簽名 */
    managerSignature?: Blob;
  };
};

export type PostAuditByIdManagerSignatureRes = {
  /** 訊息 */
  message: string;
  /** 新的ID */
  newId: string;
};

export type PostAuditByIdExportAuditReq = {
  id: string;
};

export type PostAuditByIdExportAuditRes = {
  /** 匯出檔案名稱 */
  name: string;
  /** 檔案MIME TYPE */
  mimeType: string;
  /** Buffer */
  buffer: string;
  /** 訊息 */
  message: string;
};

export type PostAuditByIdExportAssetsReq = {
  id: string;
};

export type PostAuditByIdExportAssetsRes = {
  /** 匯出檔案名稱 */
  name: string;
  /** 檔案MIME TYPE */
  mimeType: string;
  /** Buffer */
  buffer: string;
  /** 訊息 */
  message: string;
};

export type DeleteAuditByIdAnnexReq = {
  id: string;
  body: {
    /** 附件檔案代碼 */
    fId?: string[];
  };
};

export type DeleteAuditByIdAnnexRes = {
  /** 訊息 */
  message: string;
};

export type GetAuditByIdOperatorPasswordReq = {
  id: string;
};

export type GetAuditByIdOperatorPasswordRes = {
  /** 名稱 */
  operatorName: string;
  /** 密碼 */
  password: string;
};

export type PostAuditByIdInvalidReq = {
  id: string;
  body: {
    /** 原因 */
    reason?: string;
  };
};

export type PostAuditByIdInvalidRes = {
  /** 訊息 */
  message: string;
};

export type PostAuditByIdReturnsReq = {
  id: string;
  body: {
    /** 原因 */
    reason: string;
  };
};

export type PostAuditByIdReturnsRes = {
  /** 訊息 */
  message: string;
};
