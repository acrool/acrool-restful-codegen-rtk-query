/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { ECacheTagTypes } from "@/store/tagTypes";
import api from "./query.generated";

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    postOauthTelegram: {
      invalidatesTags: (result, error, arg) => [],
    },
  },
});

export default enhancedApi;
