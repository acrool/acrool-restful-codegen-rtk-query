/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostLobbiesByCodeEnterReq = {
  code: string;
  body: {
    /** 遊戲館分類代號 */
    lobbyCategoryCode?: string;
    /** 是否為手機版 */
    isMobileMode: boolean;
  };
};

export type PostLobbiesByCodeEnterRes = {
  url: string;
};
