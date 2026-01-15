/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { ECacheTagTypes } from "@/store/tagTypes";
import api from "./query.generated";

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    getProfilePayoutMethodsBankCard: {
      invalidatesTags: (result, error, arg) => [],
    },
    postProfilePayoutMethodsBankCard: {
      invalidatesTags: (result, error, arg) => [],
    },
    getProfilePayoutMethodsCryptoUsdt: {
      invalidatesTags: (result, error, arg) => [],
    },
    postProfilePayoutMethodsCryptoUsdt: {
      invalidatesTags: (result, error, arg) => [],
    },
  },
});

export default enhancedApi;
