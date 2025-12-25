/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
  
import * as Schema from "../schema";

export type GetWalletPayoutSettingsBankCardReq = void;

export type GetWalletPayoutSettingsBankCardRes = {
  banks: {
    code: string;
    name: string;
  }[];
};

export type GetWalletPayoutSettingsCvsStoresReq = void;

export type GetWalletPayoutSettingsCvsStoresRes = {
  store: {
    code: string;
    name: string;
  }[];
};

export type GetWalletPayoutSettingsCryptoUsdtReq = void;

export type GetWalletPayoutSettingsCryptoUsdtRes = {
  currencies: {
    code: string;
    name: string;
    chains: {
      code: string;
      name: string;
    }[];
  }[];
};

export type GetWalletPayoutSettingsExchangeRateReq = {
  currency?: "usdt";
};

export type GetWalletPayoutSettingsExchangeRateRes = {
  value: number;
};

export type GetWalletPayoutSettingsWithdrawalSettingReq = void;

export type GetWalletPayoutSettingsWithdrawalSettingRes = {
  withdrawalLimits: {
    /** 需要打碼量 */
    remainingRolloverAmount: number;
    remainingWithdrawalTimesToday: number;
    maxWithdrawalAmountPerRequest: number;
    remainingWithdrawalQuotaAmount: number;
  };
  remark: string;
};
