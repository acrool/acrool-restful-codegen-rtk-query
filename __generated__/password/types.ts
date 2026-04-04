/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PutAuthPasswordReq = {
  body: {
    /** 舊密碼 */
    oldPassword?: string;
    /** 新密碼 */
    newPassword?: string;
  };
};

export type PutAuthPasswordRes = {
  /** 訊息 */
  message: string;
};
