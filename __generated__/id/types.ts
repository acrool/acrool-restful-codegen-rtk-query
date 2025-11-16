/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetAuditByIdReq = {
  id: string;
};

export type GetAuditByIdRes = void;

export type PutAuditByIdReq = {
  id: string;
  body: {
    question: Schema.UpdateAuditQuestion;
  };
};

export type PutAuditByIdRes = {
  message: string; // 訊息
};

export type PostAuditByIdReq = {
  id: string;
  body: {
    questions?: Schema.UpdateAuditQuestion[];
    remark?: string;
    auditSignature?: Blob;
    managerSignature?: Blob;
  };
};

export type PostAuditByIdRes = {
  message: string; // 訊息
  newId: string; // 新的ID
};

export type PutAuditByIdProfileReq = {
  id: string;
  body: {
    areaCode: string;
    stationName?: string;
  };
};

export type PutAuditByIdProfileRes = {
  message: string; // 訊息
};

export type PostAuditByIdAuditSignatureReq = {
  id: string;
  body: {
    auditSignature?: Blob;
    remark?: string;
  };
};

export type PostAuditByIdAuditSignatureRes = {
  message: string; // 訊息
  newId: string; // 新的ID
};

export type PostAuditByIdManagerSignatureReq = {
  id: string;
  body: {
    managerSignature?: Blob;
  };
};

export type PostAuditByIdManagerSignatureRes = {
  message: string; // 訊息
  newId: string; // 新的ID
};

export type PostAuditByIdExportAuditReq = {
  id: string;
};

export type PostAuditByIdExportAuditRes = {
  name: string; // 匯出檔案名稱
  mimeType: string; // 檔案MIME TYPE
  buffer: string; // Buffer
  message: string; // 訊息
};

export type PostAuditByIdExportAssetsReq = {
  id: string;
};

export type PostAuditByIdExportAssetsRes = {
  name: string; // 匯出檔案名稱
  mimeType: string; // 檔案MIME TYPE
  buffer: string; // Buffer
  message: string; // 訊息
};

export type DeleteAuditByIdAnnexReq = {
  id: string;
  body: {
    fId?: string[];
  };
};

export type DeleteAuditByIdAnnexRes = {
  message: string; // 訊息
};

export type GetAuditByIdOperatorPasswordReq = {
  id: string;
};

export type GetAuditByIdOperatorPasswordRes = {
  operatorName: string; // 名稱
  password: string; // 密碼
};

export type PostAuditByIdInvalidReq = {
  id: string;
  body: {
    reason?: string;
  };
};

export type PostAuditByIdInvalidRes = {
  message: string; // 訊息
};

export type PostAuditByIdReturnsReq = {
  id: string;
  body: {
    reason: string;
  };
};

export type PostAuditByIdReturnsRes = {
  message: string; // 訊息
};
