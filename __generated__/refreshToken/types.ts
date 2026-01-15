/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostAuthRefreshTokenReq = {
  body: {
    refreshToken?: string;
  };
};

export type PostAuthRefreshTokenRes = {
  message: string;
  authTokens: Schema.AuthTokens;
};
