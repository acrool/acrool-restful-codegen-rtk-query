/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostAuthSignupReq = {
  body: {
    /** 代理帳號 */
    agentAccount?: string;
    /** 帳號 */
    account: string;
    /** 暱稱 */
    nickName: string;
    /** 密碼 */
    password: string;
    /** 手機號碼 */
    phoneNumber: string;
    /** 簡訊驗證碼ID */
    smsCodeId?: string;
    /** 簡訊驗證碼值 */
    smsCodeValue: string;
    /** 原始 userAgent */
    deviceUserAgent?: string;
    /** OS系統 */
    deviceOS?: string;
    /** 瀏覽器 */
    deviceBrowser?: string;
    /** 瀏覽器 */
    deviceType?: "mobile" | "desktop";
    /** 網域名稱 */
    hostName?: string;
    /** 推薦碼 */
    referralCode?: string;
  };
};

export type PostAuthSignupRes = {
  message: string;
  authTokens: Schema.AuthTokens;
};
