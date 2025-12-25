/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetWalletDepositsBankTransferSettingReq = void;

export type GetWalletDepositsBankTransferSettingRes = {
  depositLimits: {
    min: number;
    max: number;
  };
  remark: string;
};

export type PostWalletDepositsBankTransferReq = {
  body: {
    /** 提款卡ID */
    bankCardId: string;
    /** 金額 */
    amount: number;
  };
};

export type PostWalletDepositsBankTransferRes = {
  message: string;
};

export type GetWalletDepositsCvsSettingReq = void;

export type GetWalletDepositsCvsSettingRes = {
  depositLimits: {
    min: number;
    max: number;
  };
  remark: string;
};

export type PostWalletDepositsCvsReq = {
  body: {
    /** 超商代號 */
    storeCode: string;
    /** 金額 */
    amount: number;
  };
};

export type PostWalletDepositsCvsRes = {
  message: string;
};

export type GetWalletDepositsCryptoSettingReq = void;

export type GetWalletDepositsCryptoSettingRes = {
  depositLimits: {
    min: number;
    max: number;
  };
  remark: string;
};

export type PostWalletDepositsCryptoReq = {
  body: {
    /** 金額 */
    amount: number;
  };
};

export type PostWalletDepositsCryptoRes = {
  message: string;
};
