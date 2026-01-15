/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { ECacheTagTypes } from "@/store/tagTypes";
import api from "./query.generated";

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    getWalletDepositsBankTransferSetting: {
      invalidatesTags: (result, error, arg) => [],
    },
    postWalletDepositsBankTransfer: {
      invalidatesTags: (result, error, arg) => [],
    },
    getWalletDepositsCvsSetting: {
      invalidatesTags: (result, error, arg) => [],
    },
    postWalletDepositsCvs: {
      invalidatesTags: (result, error, arg) => [],
    },
    getWalletDepositsCryptoSetting: {
      invalidatesTags: (result, error, arg) => [],
    },
    postWalletDepositsCrypto: {
      invalidatesTags: (result, error, arg) => [],
    },
  },
});

export default enhancedApi;
