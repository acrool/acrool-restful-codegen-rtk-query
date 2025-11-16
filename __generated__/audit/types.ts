/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostOperatorIdAuditByIdSignatureReq = {
  id: string;
  body: {
    signature?: Blob;
  };
};

export type PostOperatorIdAuditByIdSignatureRes = {
  message: string; // 訊息
};

export type GetOperatorIdAuditByIdReq = {
  password: string;
  id: string;
};

export type GetOperatorIdAuditByIdRes = void;
