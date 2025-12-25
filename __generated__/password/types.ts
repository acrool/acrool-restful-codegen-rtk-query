/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostAuthPasswordResetReq = {
  body: {
    /** 手機號碼 */
    phoneNumber: string;
    /** SMSCode ID */
    smsCodeId: string;
    /** SMSCode Value */
    smsCodeValue?: string;
    /** 新密碼 */
    newPassword: string;
    /** 原始 userAgent */
    deviceUserAgent?: string;
    /** OS系統 */
    deviceOS?: string;
    /** 瀏覽器 */
    deviceBrowser?: string;
    /** 裝置 */
    deviceType?: "mobile" | "desktop";
    hostName?: string;
  };
};

export type PostAuthPasswordResetRes = {
  message: string;
  authTokens: Schema.AuthTokens;
};

export type PutProfilePasswordLoginReq = {
  body: {
    /** 原本的密碼 */
    password: string;
    /** 新密碼 */
    newPassword: string;
  };
};

export type PutProfilePasswordLoginRes = {
  message: string;
};

export type PutProfilePasswordWithdrawalReq = {
  body: {
    /** 原密碼 */
    password: string;
    /** 新密碼 */
    newPassword: string;
  };
};

export type PutProfilePasswordWithdrawalRes = {
  message: string;
};

export type PostProfilePasswordWithdrawalResetReq = {
  body: {
    /** 手機號碼 */
    phoneNumber: string;
    /** SMSCode ID */
    smsCodeId: string;
    /** SMSCode Value */
    smsCodeValue?: string;
    /** 新密碼 */
    newPassword: string;
  };
};

export type PostProfilePasswordWithdrawalResetRes = {
  message: string;
};
