/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostAuthLoginReq = {
  body: {
    /** 帳號 */
    account: string;
    /** 密碼 */
    password: string;
    /** 原始 userAgent */
    deviceUserAgent?: string;
    /** OS系統 */
    deviceOS?: string;
    /** 瀏覽器 */
    deviceBrowser?: string;
    /** 裝置 */
    deviceType?: "desktop" | "mobile";
    hostName?: string;
  };
};

export type PostAuthLoginRes = {
  message: string;
  authTokens: Schema.AuthTokens;
};
