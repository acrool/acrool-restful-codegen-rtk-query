/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PatchProfileBasicReq = {
  body: {
    /** LINE ID */
    lineId?: string;
    /** 生日 */
    birthday?: string;
    /** 地址 城市 */
    addressCityCode?: string;
    /** 地址 鄉鎮市區 */
    addressDistrictCode?: string;
    /** 地址 明細 */
    addressDetail?: string;
    /** 接收訊息通知-優惠訊息 */
    notificationPreferencesIsPromo?: string;
    /** 接收訊息通知-託售結果 */
    notificationPreferencesIsTransaction?: string;
  };
};

export type PatchProfileBasicRes = {
  message: string;
};
