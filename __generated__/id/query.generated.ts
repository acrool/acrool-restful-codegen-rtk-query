/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { GetAuditByIdReq, PutAuditByIdReq, PostAuditByIdReq, PutAuditByIdProfileReq, PostAuditByIdAuditSignatureReq, PostAuditByIdManagerSignatureReq, PostAuditByIdExportAuditReq, PostAuditByIdExportAssetsReq, DeleteAuditByIdAnnexReq, GetAuditByIdOperatorPasswordReq, PostAuditByIdInvalidReq, PostAuditByIdReturnsReq, GetAuditByIdRes, PutAuditByIdRes, PostAuditByIdRes, PutAuditByIdProfileRes, PostAuditByIdAuditSignatureRes, PostAuditByIdManagerSignatureRes, PostAuditByIdExportAuditRes, PostAuditByIdExportAssetsRes, DeleteAuditByIdAnnexRes, GetAuditByIdOperatorPasswordRes, PostAuditByIdInvalidRes, PostAuditByIdReturnsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 查詢 觀察表 */
        getAuditById: build.mutation<
            GetAuditByIdRes,
            IRestFulEndpointsQueryReturn<GetAuditByIdReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}`,
                method: "GET",
                contentType: "application/json",
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 更新 觀察表/步驟表 */
        putAuditById: build.mutation<
            PutAuditByIdRes,
            IRestFulEndpointsQueryReturn<PutAuditByIdReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}`,
                method: "PUT",
                contentType: "application/json",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** <暫時不用>完成 觀察表 (含所有題目更新) */
        postAuditById: build.mutation<
            PostAuditByIdRes,
            IRestFulEndpointsQueryReturn<PostAuditByIdReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}`,
                method: "POST",
                contentType: "application/json",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 更新 觀察表/Profile */
        putAuditByIdProfile: build.mutation<
            PutAuditByIdProfileRes,
            IRestFulEndpointsQueryReturn<PutAuditByIdProfileReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}/profile`,
                method: "PUT",
                contentType: "multipart/form-data",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 觀察人員簽名 */
        postAuditByIdAuditSignature: build.mutation<
            PostAuditByIdAuditSignatureRes,
            IRestFulEndpointsQueryReturn<PostAuditByIdAuditSignatureReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}/auditSignature`,
                method: "POST",
                contentType: "multipart/form-data",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 現場人員簽名 */
        postAuditByIdManagerSignature: build.mutation<
            PostAuditByIdManagerSignatureRes,
            IRestFulEndpointsQueryReturn<PostAuditByIdManagerSignatureReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}/managerSignature`,
                method: "POST",
                contentType: "multipart/form-data",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 匯出 觀察表(PDF) */
        postAuditByIdExportAudit: build.mutation<
            PostAuditByIdExportAuditRes,
            IRestFulEndpointsQueryReturn<PostAuditByIdExportAuditReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}/exportAudit`,
                method: "POST",
                contentType: "application/json",
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 匯出 觀察表(資源) */
        postAuditByIdExportAssets: build.mutation<
            PostAuditByIdExportAssetsRes,
            IRestFulEndpointsQueryReturn<PostAuditByIdExportAssetsReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}/exportAssets`,
                method: "POST",
                contentType: "application/json",
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 刪除 觀察表佐證附檔 */
        deleteAuditByIdAnnex: build.mutation<
            DeleteAuditByIdAnnexRes,
            IRestFulEndpointsQueryReturn<DeleteAuditByIdAnnexReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}/annex`,
                method: "DELETE",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 查詢 觀察的老闆密碼 */
        getAuditByIdOperatorPassword: build.mutation<
            GetAuditByIdOperatorPasswordRes,
            IRestFulEndpointsQueryReturn<GetAuditByIdOperatorPasswordReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}/operatorPassword`,
                method: "GET",
                contentType: "application/json",
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 作廢 觀察單 */
        postAuditByIdInvalid: build.mutation<
            PostAuditByIdInvalidRes,
            IRestFulEndpointsQueryReturn<PostAuditByIdInvalidReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}/invalid`,
                method: "POST",
                contentType: "multipart/form-data",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
        /** 退件 觀察單 */
        postAuditByIdReturns: build.mutation<
            PostAuditByIdReturnsRes,
            IRestFulEndpointsQueryReturn<PostAuditByIdReturnsReq>
        >({
            query: (queryArg) => ({
                url: `/audit/${queryArg.variables.id}/returns`,
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
