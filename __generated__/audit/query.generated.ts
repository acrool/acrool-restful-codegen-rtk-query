/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { baseApi as api } from "./src/library/redux/baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";

import type { PostOperatorIdAuditByIdSignatureReq, GetOperatorIdAuditByIdReq, PostOperatorIdAuditByIdSignatureRes, GetOperatorIdAuditByIdRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postOperatorIdAuditByIdSignature: build.mutation<
      PostOperatorIdAuditByIdSignatureRes,
      IRestFulEndpointsQueryReturn<PostOperatorIdAuditByIdSignatureReq>
    >({
      query: (queryArg) => ({
        url: "/operatorId/audit/{id}/signature",
        method: "POST",
        contentType: "multipart/form-data",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    getOperatorIdAuditById: build.mutation<
      GetOperatorIdAuditByIdRes,
      IRestFulEndpointsQueryReturn<GetOperatorIdAuditByIdReq>
    >({
      query: (queryArg) => ({
        url: "/operatorId/audit/{id}",
        method: "GET",
        contentType: "application/json",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
  }),
});

export const {
  usePostOperatorIdAuditByIdSignatureMutation,
  useGetOperatorIdAuditByIdMutation,
} = injectedRtkApi;

export default injectedRtkApi;
