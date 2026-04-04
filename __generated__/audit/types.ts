/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostOperatorIdAuditByIdSignatureReq = {
  id: string;
  body: {
    /** 老闆簽名 */
    signature?: Blob;
  };
};

export type PostOperatorIdAuditByIdSignatureRes = {
  /** 訊息 */
  message: string;
};

export type GetOperatorIdAuditByIdReq = {
  password: string;
  id: string;
};

export type GetOperatorIdAuditByIdRes = Schema.AuditDetail;
