import { baseApi as api } from "../../baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";
import { SharedTypes } from "./test_output/shared-types";
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
export const { useGetParameterOperatorsQuery, useGetParameterCommonQuery } =
  injectedRtkApi;
