/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetPromotionsByIdReq = {
  id: string;
};

export type GetPromotionsByIdRes = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  bannerImageUrl: string;
  category: Schema.IdNameMap;
  content: string;
};

export type PostMissionsByIdClaimReq = {
  id: string;
};

export type PostMissionsByIdClaimRes = {
  message: string;
};
