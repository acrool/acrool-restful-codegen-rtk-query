/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetAnnouncementsReq = {
  isActive?: boolean;
  currentPage?: number;
  pageLimit?: number;
};

export type GetAnnouncementsRes = {
  paginateInfo: {
    totalItems: number;
    totalPages: number;
  };
  paginateMeta: {
    currentPage: number;
    pageLimit: number;
  };
  rows: {
    title: string;
    content: string;
    createdAt: string;
  }[];
};

export type GetMessagesReq = {
  isActive?: boolean;
  currentPage?: number;
  pageLimit?: number;
};

export type GetMessagesRes = {
  paginateInfo: {
    totalItems: number;
    totalPages: number;
  };
  paginateMeta: {
    currentPage: number;
    pageLimit: number;
  };
  rows: {
    title: string;
    content: string;
    createdAt: string;
  }[];
};

export type GetProfileReq = void;

export type GetProfileRes = {
  account: string;
  /** 隱碼處理 */
  realName: string;
  /** 隱碼處理 */
  phoneNumber: string;
  lineId: string;
  birthday: string;
  referralCode: string;
  address: Schema.AddressMap;
  notificationPreferences: {
    isPromo: boolean;
    isTransaction: boolean;
  };
  vip: {
    level: string;
    name: string;
    nextLevel: string;
    turnover: string;
  };
  isHasWithdrawalPassword: boolean;
};

export type GetLobbiesReq = void;

export type GetLobbiesRes = {
  rows: {
    code: string;
    name: string;
    isHot: boolean;
    isMaintain: boolean;
    categoryCode: string;
  }[];
};

export type GetPromotionsReq = {
  currentPage?: number;
  pageLimit?: number;
};

export type GetPromotionsRes = {
  rows: ({
    id: string;
    title: string;
    endTime: string;
    bannerImageUrl: string;
    dataType: "content" | "url" | "route";
    /** 路由或網址(依類型) */
    dataUrl: string;
    category: {
      id: string;
      name: string;
    };
  })[];
};

export type GetMissionsReq = void;

export type GetMissionsRes = {
  rows: ({
    id: string;
    title: string;
    requiredValidBetAmount: number;
    currentValidBetAmount: number;
    claimStatusCode: "not-eligible" | "claimable" | "claimed";
  })[];
};
