/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostAuthSignLoginReq = {
  body: {
    /** 帳號 */
    account?: string;
    /** 密碼 */
    password?: string;
  };
};

export type PostAuthSignLoginRes = {
  tokenInfo: {
    accessToken: string;
    refreshToken: string;
  };
  /** 角色類型 */
  roleType: string;
  /** 訊息 */
  message: string;
};

export type PostAuthSignRefreshReq = {
  body: {
    /** 更新用Token */
    refreshToken?: string;
  };
};

export type PostAuthSignRefreshRes = {
  tokenInfo: {
    accessToken: string;
    refreshToken: string;
  };
};

export type PostAuthSignLogoutReq = void;

export type PostAuthSignLogoutRes = {
  /** 訊息 */
  message: string;
};
