/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { ECacheTagTypes } from "@/store/tagTypes";
import api from "./query.generated";

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    getAudit: {
      invalidatesTags: (result, error, arg) => [],
    },
    postAudit: {
      invalidatesTags: (result, error, arg) => [],
    },
  },
});

export default enhancedApi;
