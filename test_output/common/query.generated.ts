import { baseApi as api } from "../../baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";
import * as SharedTypes from "../shared-types";
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
  rows: {
    id: string;
    name: string;
  }[];
};
export type GetParameterOperatorsApiArg = void;
export type GetParameterCommonApiResponse = /** status 200  */ {
  auditStatus: SharedTypes.Param[];
  templates: SharedTypes.Param[];
  areas: SharedTypes.Param[];
};
export type GetParameterCommonApiArg = void;
export const { useGetParameterOperatorsQuery, useGetParameterCommonQuery } =
  injectedRtkApi;
