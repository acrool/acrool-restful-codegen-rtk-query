/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostAuthSmsCodesReq = {
  body: {
    /** 手機號碼 */
    phoneNumber: string;
    /** 用途 */
    scene: "signup" | "resetPassword" | "payoutSetting";
  };
};

export type PostAuthSmsCodesRes = {
  message: string;
  smsCodeId: string;
};
