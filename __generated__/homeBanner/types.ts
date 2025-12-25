/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetAdHomeBannerReq = void;

export type GetAdHomeBannerRes = {
  rows: ({
    id: string;
    imageUrl: string;
    href: {
      type: "url" | "route" | "blank";
      value: string;
    };
  })[];
};
