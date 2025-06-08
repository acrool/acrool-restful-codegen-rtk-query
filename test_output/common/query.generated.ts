import { baseApi as api } from "../../baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
  }),
  overrideExisting: false,
});
export default injectedRtkApi;
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
export type Param = {
  /** 代碼 */
  code: string;
  /** 名稱 */
  name: string;
};
export const { useGetParameterOperatorsQuery, useGetParameterCommonQuery } =
  injectedRtkApi;
