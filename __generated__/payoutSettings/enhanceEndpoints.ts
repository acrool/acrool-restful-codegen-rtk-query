/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { ECacheTagTypes } from "@/store/tagTypes";
import api from "./query.generated";

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    getWalletPayoutSettingsBankCard: {
      invalidatesTags: (result, error, arg) => [],
    },
    getWalletPayoutSettingsCvsStores: {
      invalidatesTags: (result, error, arg) => [],
    },
    getWalletPayoutSettingsCryptoUsdt: {
      invalidatesTags: (result, error, arg) => [],
    },
    getWalletPayoutSettingsExchangeRate: {
      invalidatesTags: (result, error, arg) => [],
    },
    getWalletPayoutSettingsWithdrawalSetting: {
      invalidatesTags: (result, error, arg) => [],
    },
  },
});

export default enhancedApi;
