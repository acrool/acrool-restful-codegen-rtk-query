/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetProfilePayoutMethodsBankCardReq = void;

export type GetProfilePayoutMethodsBankCardRes = {
  bankCards: {
    id: string;
    bank: {
      code: string;
      name: string;
    };
  }[];
};

export type PostProfilePayoutMethodsBankCardReq = {
  body: {
    /** 銀行代碼 */
    bankCode: string;
    /** 銀行帳號 */
    accountNumber: string;
  };
};

export type PostProfilePayoutMethodsBankCardRes = {
  message: string;
  newId: string;
};

export type GetProfilePayoutMethodsCryptoUsdtReq = void;

export type GetProfilePayoutMethodsCryptoUsdtRes = {
  cryptoWallets: {
    id: string;
    currency: {
      code: string;
      name: string;
      chains: {
        code: string;
        name: string;
      };
    };
    walletAddress: string;
  }[];
};

export type PostProfilePayoutMethodsCryptoUsdtReq = {
  body: {
    /** 幣種代號 */
    currencyCode: string;
    /** 鏈別代號 */
    chainsCode: string;
    /** 錢包地址 */
    walletAddress: string;
    /** 簡訊驗證碼ID */
    smsCodeId?: string;
    /** 簡訊驗證碼值 */
    smsCodeValue: string;
  };
};

export type PostProfilePayoutMethodsCryptoUsdtRes = void;
