/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetSystemStatusReq = void;

export type GetSystemStatusRes = {
  isMaintenance: boolean;
  maintenance: {
    startTime: string;
    endTime: string;
    message: string;
  };
};
