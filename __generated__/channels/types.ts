/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetSupportChannelsReq = void;

export type GetSupportChannelsRes = {
  channels: ({
    type: "line" | "email" | "link";
    name: string;
    url: string;
  })[];
};
