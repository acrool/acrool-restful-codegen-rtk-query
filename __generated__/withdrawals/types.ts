/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type PostWalletWithdrawalsBankCardReq = {
  body: {
    /** 銀行卡ID */
    bankCardId: string;
    /** 金額 */
    amount: number;
    /** 提款密碼 */
    withdrawalPassword: string;
  };
};

export type PostWalletWithdrawalsBankCardRes = {
  message: string;
};

export type PostWalletWithdrawalsCryptoReq = {
  body: {
    /** 虛擬貨幣錢包ID */
    cryptoWalletId: string;
    /** 金額 */
    amount: number;
    /** 交易密碼 */
    withdrawalPassword: string;
  };
};

export type PostWalletWithdrawalsCryptoRes = {
  message: string;
};
