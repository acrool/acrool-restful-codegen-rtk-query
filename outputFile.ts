import { baseApi as api } from "./baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAuthSignLogin: build.mutation<
      PostAuthSignLoginApiResponse,
      IRestFulEndpointsQueryReturn<PostAuthSignLoginApiArg>
    >({
      query: (queryArg) => ({
        url: `/auth/sign/login`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuthSignRefresh: build.mutation<
      PostAuthSignRefreshApiResponse,
      IRestFulEndpointsQueryReturn<PostAuthSignRefreshApiArg>
    >({
      query: (queryArg) => ({
        url: `/auth/sign/refresh`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    getParameterOperators: build.query<
      GetParameterOperatorsApiResponse,
      IRestFulEndpointsQueryReturn<GetParameterOperatorsApiArg>
    >({
      query: (queryArg) => ({
        url: `/parameter/operators`,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    getParameterCommon: build.query<
      GetParameterCommonApiResponse,
      IRestFulEndpointsQueryReturn<GetParameterCommonApiArg>
    >({
      query: (queryArg) => ({
        url: `/parameter/common`,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    putAuthPassword: build.mutation<
      PutAuthPasswordApiResponse,
      IRestFulEndpointsQueryReturn<PutAuthPasswordApiArg>
    >({
      query: (queryArg) => ({
        url: `/auth/password`,
        method: "PUT",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    postAuthSignLogout: build.mutation<
      PostAuthSignLogoutApiResponse,
      IRestFulEndpointsQueryReturn<PostAuthSignLogoutApiArg>
    >({
      query: (queryArg) => ({
        url: `/auth/sign/logout`,
        method: "POST",
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
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
    postOperatorIdAuditByIdSignature: build.mutation<
      PostOperatorIdAuditByIdSignatureApiResponse,
      IRestFulEndpointsQueryReturn<PostOperatorIdAuditByIdSignatureApiArg>
    >({
      query: (queryArg) => ({
        url: `/operatorId/audit/${queryArg.variables.id}/signature`,
        method: "POST",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
    getOperatorIdAuditById: build.query<
      GetOperatorIdAuditByIdApiResponse,
      IRestFulEndpointsQueryReturn<GetOperatorIdAuditByIdApiArg>
    >({
      query: (queryArg) => ({
        url: `/operatorId/audit/${queryArg.variables.id}`,
        params: {
          password: queryArg.variables.password,
        },
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
  }),
  overrideExisting: false,
});
export default injectedRtkApi;
export type PostAuthSignLoginApiResponse = /** status 200  */ {
  tokenInfo: {
    accessToken: string;
    refreshToken: string;
  };
  /** 角色類型 */
  roleType: string;
  /** 訊息 */
  message: string;
};
export type PostAuthSignLoginApiArg = {
  body: {
    /** 帳號 */
    account?: string;
    /** 密碼 */
    password?: string;
  };
};
export type PostAuthSignRefreshApiResponse = /** status 200  */ {
  tokenInfo: {
    accessToken: string;
    refreshToken: string;
  };
};
export type PostAuthSignRefreshApiArg = {
  body: {
    /** 更新用Token */
    refreshToken?: string;
  };
};
export type GetParameterOperatorsApiResponse = /** status 200  */ {
  /** 角色列表 */
  rows: {
    /** ID */
    id: string;
    name: string;
  }[];
};
export type GetParameterOperatorsApiArg = void;
export type GetParameterCommonApiResponse = /** status 200  */ {
  /** 狀態 */
  auditStatus: Param[];
  /** 範本 */
  templates: Param[];
  /** 區域 */
  areas: Param[];
};
export type GetParameterCommonApiArg = void;
export type PutAuthPasswordApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type PutAuthPasswordApiArg = {
  body: {
    /** 舊密碼 */
    oldPassword?: string;
    /** 新密碼 */
    newPassword?: string;
  };
};
export type PostAuthSignLogoutApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type PostAuthSignLogoutApiArg = void;
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
export type PostOperatorIdAuditByIdSignatureApiResponse = /** status 200  */ {
  /** 訊息 */
  message: string;
};
export type PostOperatorIdAuditByIdSignatureApiArg = {
  id: string;
  body: {
    /** 老闆簽名 */
    signature?: Blob;
  };
};
export type GetOperatorIdAuditByIdApiResponse =
  /** status 200 successful operation */ AuditDetail;
export type GetOperatorIdAuditByIdApiArg = {
  /** 觀察表Id */
  id: string;
  /** 老闆簽核碼 */
  password: string;
};
export type Param = {
  /** 代碼 */
  code: string;
  /** 名稱 */
  name: string;
};
export type AuditRows = {
  id: string;
  /** 老闆名稱 */
  operatorName: string;
  /** 狀態 */
  status: string;
  /** 站點名稱 */
  stationName: string;
  /** 區域名稱 */
  areaName: string;
  /** 建立日期 */
  auditDate: string;
  /** 現場人員是否簽名 */
  isManagerSignature: boolean;
  /** 觀察員是否已簽名 */
  isAuditSignature: boolean;
  /** 老闆是否已簽名 */
  isOperatorSignature: boolean;
  /** 更新者名稱 */
  updaterName: string;
  /** 更新時間 */
  updatedAt: string;
};
export type PaginateInfo = {
  /** 總筆數 */
  totalItems: number;
  /** 總頁數 */
  totalPages: number;
};
export type PaginateMeta = {
  /** 目前頁面 */
  currentPage: number;
  /** 一次顯示幾筆 */
  pageLimit: number;
};
export type AuditDetailValue = {
  /** 單選值 */
  single?: string | null;
  /** 多選值 */
  multiple?: string[] | null;
  /** 純文字 */
  plainTxt?: string | null;
  /** 複合文字 (依複合文字順序依序填入) */
  richTxt?: string[] | null;
};
export type AuditDetailAnnex = {
  /** 檔案代碼 */
  fId: string;
  /** 開啟位置 */
  src: string;
  /** 檔名 */
  name: string;
  /** 媒體類型 */
  mime: string | null;
  /** 顯示順序 */
  order: number;
};
export type AuditDetail = {
  /** 老闆名稱 */
  operatorName: string;
  /** 站點名稱 */
  stationName: string;
  /** 觀察日期 */
  auditDate: string;
  /** 區域名稱 */
  areaName: string;
  /** 區域代碼 */
  areaCode: string;
  /** 備註 */
  remark: string;
  /** 觀察員簽名檔網址 */
  auditSignatureUrl: string;
  /** 現場人員簽名檔網址 */
  managerSignatureUrl: string;
  /** 老闆簽名檔網址 */
  operatorSignatureUrl: string;
  /** 題目清單 */
  questions: {
    /** 題目 ID */
    qId: string;
    /** 題目類別描述 */
    description?: string;
    /** 是否已完成 */
    isDone: boolean;
    /** 題目內容 (含 HTML 標籤) */
    content: string;
    /** 選項附件上傳模式 (1：不限、2：單檔、3：多檔)  */
    attachMode: number;
    /** 顯示順序 */
    order: number;
    /** 答題選項 */
    options?: {
      /** 選項 ID */
      optId: string;
      /** 選項類型 ( 1：單選、2：複選 / 含單個核選框、3：文字-純文字、4：文字-複合文字) */
      type: number;
      /** 選項文字 */
      label?: string;
      /** 選項值 */
      value: string;
      /** 選項顯示順序 */
      order: number;
    }[];
    /** 已填寫答案 */
    value: AuditDetailValue;
    /** 附件 */
    annex?: AuditDetailAnnex[];
  }[];
};
export type UpdateAuditQuestion = {
  /** 題目代碼 */
  qId: string;
  /** 單選答案值 */
  valueSingle?: string;
  /** 多選答案值 (字串陣列) */
  valueMultiple?: string[];
  /** 純文字答案值 */
  valuePlainTxt?: string;
  /** 複合文字答案值 (字串陣列) */
  valueRichTxt?: string[];
  /** 檔案附件 */
  annex?: Blob;
};
export const {
  usePostAuthSignLoginMutation,
  usePostAuthSignRefreshMutation,
  useGetParameterOperatorsQuery,
  useGetParameterCommonQuery,
  usePutAuthPasswordMutation,
  usePostAuthSignLogoutMutation,
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
  usePostOperatorIdAuditByIdSignatureMutation,
  useGetOperatorIdAuditByIdQuery,
} = injectedRtkApi;
