import { baseApi as api } from "../../baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";
import * as SharedTypes from "../shared-types";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAudit: build.query<
      GetAuditApiResponse,
      IRestFulEndpointsQueryReturn<GetAuditApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit`,
        params: {
          currentPage: queryArg.variables.currentPage,
          pageLimit: queryArg.variables.pageLimit,
          stationName: queryArg.variables.stationName,
          operatorId: queryArg.variables.operatorId,
          statusId: queryArg.variables.statusId,
          templateId: queryArg.variables.templateId,
          auditStartDate: queryArg.variables.auditStartDate,
          auditEndDate: queryArg.variables.auditEndDate,
          areaCode: queryArg.variables.areaCode,
        },
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAudit: build.mutation<
      PostAuditApiResponse,
      IRestFulEndpointsQueryReturn<PostAuditApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    getAuditById: build.query<
      GetAuditByIdApiResponse,
      IRestFulEndpointsQueryReturn<GetAuditByIdApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}`,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    putAuditById: build.mutation<
      PutAuditByIdApiResponse,
      IRestFulEndpointsQueryReturn<PutAuditByIdApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}`,
        method: "PUT",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditById: build.mutation<
      PostAuditByIdApiResponse,
      IRestFulEndpointsQueryReturn<PostAuditByIdApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    putAuditByIdProfile: build.mutation<
      PutAuditByIdProfileApiResponse,
      IRestFulEndpointsQueryReturn<PutAuditByIdProfileApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}/profile`,
        method: "PUT",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdAuditSignature: build.mutation<
      PostAuditByIdAuditSignatureApiResponse,
      IRestFulEndpointsQueryReturn<PostAuditByIdAuditSignatureApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}/auditSignature`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdManagerSignature: build.mutation<
      PostAuditByIdManagerSignatureApiResponse,
      IRestFulEndpointsQueryReturn<PostAuditByIdManagerSignatureApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}/managerSignature`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdExportAudit: build.mutation<
      PostAuditByIdExportAuditApiResponse,
      IRestFulEndpointsQueryReturn<PostAuditByIdExportAuditApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}/exportAudit`,
        method: "POST",
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdExportAssets: build.mutation<
      PostAuditByIdExportAssetsApiResponse,
      IRestFulEndpointsQueryReturn<PostAuditByIdExportAssetsApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}/exportAssets`,
        method: "POST",
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    deleteAuditByIdAnnex: build.mutation<
      DeleteAuditByIdAnnexApiResponse,
      IRestFulEndpointsQueryReturn<DeleteAuditByIdAnnexApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}/annex`,
        method: "DELETE",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    getAuditByIdOperatorPassword: build.query<
      GetAuditByIdOperatorPasswordApiResponse,
      IRestFulEndpointsQueryReturn<GetAuditByIdOperatorPasswordApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}/operatorPassword`,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditExportReport: build.mutation<
      PostAuditExportReportApiResponse,
      IRestFulEndpointsQueryReturn<PostAuditExportReportApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/exportReport`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdInvalid: build.mutation<
      PostAuditByIdInvalidApiResponse,
      IRestFulEndpointsQueryReturn<PostAuditByIdInvalidApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}/invalid`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuditByIdReturns: build.mutation<
      PostAuditByIdReturnsApiResponse,
      IRestFulEndpointsQueryReturn<PostAuditByIdReturnsApiArg>
    >({
      query: (queryArg) => ({
        url: `/audit/${queryArg.variables.id}/returns`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
  }),
  overrideExisting: false,
});
export default injectedRtkApi;
export type GetAuditApiResponse = /** status 200 successful operation */ {
  rows: AuditRows[];
  paginateInfo: PaginateInfo;
  paginateMeta: PaginateMeta;
};
export type GetAuditApiArg = {
  /** 第幾頁 */
  currentPage: number;
  /** 一頁幾筆 */
  pageLimit: number;
  /** 站點名稱 */
  stationName?: string;
  /** 老闆ID */
  operatorId?: string;
  /** 觀察狀態 */
  statusId?: string;
  /** 樣板ID */
  templateId?: string;
  /** 觀察日期(開始) */
  auditStartDate?: string;
  /** 觀察日期(結束) */
  auditEndDate?: string;
  /** 區域代碼 */
  areaCode?: string;
};
export type PostAuditApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
  /** 新的ID */
  newId: string;
};
export type PostAuditApiArg = {
  body: {
    /** 範本ID */
    templateId: string;
    /** 老闆ID */
    operatorId?: string;
    /** 站點名稱 */
    stationName?: string;
    /** 觀察日期 */
    auditDate?: string;
    /** 區域代碼 */
    areaCode?: string;
  };
};
export type GetAuditByIdApiResponse =
  /** status 200 successful operation */ AuditDetail;
export type GetAuditByIdApiArg = {
  /** 觀察表Id */
  id: string;
};
export type PutAuditByIdApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type PutAuditByIdApiArg = {
  /** 觀察表ID */
  id: string;
  body: {
    question: UpdateAuditQuestion;
  };
};
export type PostAuditByIdApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
  /** 新的ID */
  newId: string;
};
export type PostAuditByIdApiArg = {
  id: string;
  body: {
    /** 問題回答 */
    questions?: UpdateAuditQuestion[];
    /** 備註 */
    remark?: string;
    /** 觀察人員簽名 */
    auditSignature?: Blob;
    /** 現場人員簽名 */
    managerSignature?: Blob;
  };
};
export type PutAuditByIdProfileApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type PutAuditByIdProfileApiArg = {
  /** 觀察表ID */
  id: string;
  body: {
    /** 區域代號 */
    areaCode: string;
    /** 站點名稱 */
    stationName?: string;
  };
};
export type PostAuditByIdAuditSignatureApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
  /** 新的ID */
  newId: string;
};
export type PostAuditByIdAuditSignatureApiArg = {
  id: string;
  body: {
    /** 觀察人員簽名 */
    auditSignature?: Blob;
    /** 備註 */
    remark?: string;
  };
};
export type PostAuditByIdManagerSignatureApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
  /** 新的ID */
  newId: string;
};
export type PostAuditByIdManagerSignatureApiArg = {
  id: string;
  body: {
    /** 現場人員簽名 */
    managerSignature?: Blob;
  };
};
export type PostAuditByIdExportAuditApiResponse = /** status 200  */ {
  /** 匯出檔案名稱 */
  name: string;
  /** 檔案MIME TYPE */
  mimeType: string;
  /** Buffer */
  buffer: string;
  /** 訊息 */
  message: string;
};
export type PostAuditByIdExportAuditApiArg = {
  id: string;
};
export type PostAuditByIdExportAssetsApiResponse = /** status 200  */ {
  /** 匯出檔案名稱 */
  name: string;
  /** 檔案MIME TYPE */
  mimeType: string;
  /** Buffer */
  buffer: string;
  /** 訊息 */
  message: string;
};
export type PostAuditByIdExportAssetsApiArg = {
  id: string;
};
export type DeleteAuditByIdAnnexApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type DeleteAuditByIdAnnexApiArg = {
  /** 觀察單單號 */
  id: string;
  body: {
    /** 附件檔案代碼 */
    fId?: string[];
  };
};
export type GetAuditByIdOperatorPasswordApiResponse =
  /** status 200 successful operation */ {
    /** 名稱 */
    operatorName: string;
    /** 密碼 */
    password: string;
  };
export type GetAuditByIdOperatorPasswordApiArg = {
  /** 觀察表Id */
  id: string;
};
export type PostAuditExportReportApiResponse = /** status 200  */ {
  /** 匯出檔案名稱 */
  name: string;
  /** 檔案MIME TYPE */
  mimeType: string;
  /** Buffer */
  buffer: string;
  /** 訊息 */
  message: string;
};
export type PostAuditExportReportApiArg = {
  body: {
    /** 站點名稱 */
    stationName?: string;
    /** 老闆ID */
    operatorId?: string;
    /** 觀察狀態 */
    statusId?: string;
    /** 樣板ID */
    templateId?: string;
    /** 觀察日期(開始) */
    auditStartDate?: string;
    /** 觀察日期(結束) */
    auditEndDate?: string;
    /** 區域代碼 */
    areaCode?: string;
  };
};
export type PostAuditByIdInvalidApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type PostAuditByIdInvalidApiArg = {
  id: string;
  body: {
    /** 原因 */
    reason?: string;
  };
};
export type PostAuditByIdReturnsApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type PostAuditByIdReturnsApiArg = {
  id: string;
  body: {
    /** 原因 */
    reason: string;
  };
};
export const {
  useGetAuditQuery,
  usePostAuditMutation,
  useGetAuditByIdQuery,
  usePutAuditByIdMutation,
  usePostAuditByIdMutation,
  usePutAuditByIdProfileMutation,
  usePostAuditByIdAuditSignatureMutation,
  usePostAuditByIdManagerSignatureMutation,
  usePostAuditByIdExportAuditMutation,
  usePostAuditByIdExportAssetsMutation,
  useDeleteAuditByIdAnnexMutation,
  useGetAuditByIdOperatorPasswordQuery,
  usePostAuditExportReportMutation,
  usePostAuditByIdInvalidMutation,
  usePostAuditByIdReturnsMutation,
} = injectedRtkApi;
