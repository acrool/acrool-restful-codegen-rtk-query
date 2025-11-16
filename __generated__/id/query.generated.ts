/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { baseApi as api } from "./src/library/redux/baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";

import type { GetAuditByIdReq, PutAuditByIdReq, PostAuditByIdReq, PutAuditByIdProfileReq, PostAuditByIdAuditSignatureReq, PostAuditByIdManagerSignatureReq, PostAuditByIdExportAuditReq, PostAuditByIdExportAssetsReq, DeleteAuditByIdAnnexReq, GetAuditByIdOperatorPasswordReq, PostAuditByIdInvalidReq, PostAuditByIdReturnsReq, GetAuditByIdRes, PutAuditByIdRes, PostAuditByIdRes, PutAuditByIdProfileRes, PostAuditByIdAuditSignatureRes, PostAuditByIdManagerSignatureRes, PostAuditByIdExportAuditRes, PostAuditByIdExportAssetsRes, DeleteAuditByIdAnnexRes, GetAuditByIdOperatorPasswordRes, PostAuditByIdInvalidRes, PostAuditByIdReturnsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAuditById: build.mutation<
      GetAuditByIdRes,
      IRestFulEndpointsQueryReturn<GetAuditByIdReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}",
        method: "GET",
        contentType: "application/json",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    putAuditById: build.mutation<
      PutAuditByIdRes,
      IRestFulEndpointsQueryReturn<PutAuditByIdReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}",
        method: "PUT",
        contentType: "application/json",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditById: build.mutation<
      PostAuditByIdRes,
      IRestFulEndpointsQueryReturn<PostAuditByIdReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}",
        method: "POST",
        contentType: "application/json",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    putAuditByIdProfile: build.mutation<
      PutAuditByIdProfileRes,
      IRestFulEndpointsQueryReturn<PutAuditByIdProfileReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}/profile",
        method: "PUT",
        contentType: "multipart/form-data",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdAuditSignature: build.mutation<
      PostAuditByIdAuditSignatureRes,
      IRestFulEndpointsQueryReturn<PostAuditByIdAuditSignatureReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}/auditSignature",
        method: "POST",
        contentType: "multipart/form-data",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdManagerSignature: build.mutation<
      PostAuditByIdManagerSignatureRes,
      IRestFulEndpointsQueryReturn<PostAuditByIdManagerSignatureReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}/managerSignature",
        method: "POST",
        contentType: "multipart/form-data",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdExportAudit: build.mutation<
      PostAuditByIdExportAuditRes,
      IRestFulEndpointsQueryReturn<PostAuditByIdExportAuditReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}/exportAudit",
        method: "POST",
        contentType: "application/json",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdExportAssets: build.mutation<
      PostAuditByIdExportAssetsRes,
      IRestFulEndpointsQueryReturn<PostAuditByIdExportAssetsReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}/exportAssets",
        method: "POST",
        contentType: "application/json",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    deleteAuditByIdAnnex: build.mutation<
      DeleteAuditByIdAnnexRes,
      IRestFulEndpointsQueryReturn<DeleteAuditByIdAnnexReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}/annex",
        method: "DELETE",
        contentType: "application/x-www-form-urlencoded",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    getAuditByIdOperatorPassword: build.mutation<
      GetAuditByIdOperatorPasswordRes,
      IRestFulEndpointsQueryReturn<GetAuditByIdOperatorPasswordReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}/operatorPassword",
        method: "GET",
        contentType: "application/json",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdInvalid: build.mutation<
      PostAuditByIdInvalidRes,
      IRestFulEndpointsQueryReturn<PostAuditByIdInvalidReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}/invalid",
        method: "POST",
        contentType: "multipart/form-data",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdReturns: build.mutation<
      PostAuditByIdReturnsRes,
      IRestFulEndpointsQueryReturn<PostAuditByIdReturnsReq>
    >({
      query: (queryArg) => ({
        url: "/audit/{id}/returns",
        method: "POST",
        contentType: "multipart/form-data",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
  }),
});

export const {
  useGetAuditByIdMutation,
  usePutAuditByIdMutation,
  usePostAuditByIdMutation,
  usePutAuditByIdProfileMutation,
  usePostAuditByIdAuditSignatureMutation,
  usePostAuditByIdManagerSignatureMutation,
  usePostAuditByIdExportAuditMutation,
  usePostAuditByIdExportAssetsMutation,
  useDeleteAuditByIdAnnexMutation,
  useGetAuditByIdOperatorPasswordMutation,
  usePostAuditByIdInvalidMutation,
  usePostAuditByIdReturnsMutation,
} = injectedRtkApi;

export default injectedRtkApi;
