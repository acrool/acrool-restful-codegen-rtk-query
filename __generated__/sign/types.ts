/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostAuthSignLoginReq = {
  body: {
    account?: string;
    password?: string;
  };
};

export type PostAuthSignLoginRes = {
  tokenInfo: {
    accessToken: string;
    refreshToken: string;
  };
  roleType: string; // 角色類型
  message: string; // 訊息
};

export type PostAuthSignRefreshReq = {
  body: {
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
  message: string; // 訊息
};
