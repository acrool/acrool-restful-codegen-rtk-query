/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { ECacheTagTypes } from "@/store/tagTypes";
import api from "./query.generated";

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    getAuditById: {
      invalidatesTags: (result, error, arg) => [],
    },
    putAuditById: {
      invalidatesTags: (result, error, arg) => [],
    },
    postAuditById: {
      invalidatesTags: (result, error, arg) => [],
    },
    putAuditByIdProfile: {
      invalidatesTags: (result, error, arg) => [],
    },
    postAuditByIdAuditSignature: {
      invalidatesTags: (result, error, arg) => [],
    },
    postAuditByIdManagerSignature: {
      invalidatesTags: (result, error, arg) => [],
    },
    postAuditByIdExportAudit: {
      invalidatesTags: (result, error, arg) => [],
    },
    postAuditByIdExportAssets: {
      invalidatesTags: (result, error, arg) => [],
    },
    deleteAuditByIdAnnex: {
      invalidatesTags: (result, error, arg) => [],
    },
    getAuditByIdOperatorPassword: {
      invalidatesTags: (result, error, arg) => [],
    },
    postAuditByIdInvalid: {
      invalidatesTags: (result, error, arg) => [],
    },
    postAuditByIdReturns: {
      invalidatesTags: (result, error, arg) => [],
    },
  },
});

export default enhancedApi;
