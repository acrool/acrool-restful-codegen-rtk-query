/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { baseApi as api } from "./src/library/redux/baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";

import type { GetAuditReq, PostAuditReq, GetAuditRes, PostAuditRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAudit: build.mutation<
      GetAuditRes,
      IRestFulEndpointsQueryReturn<GetAuditReq>
    >({
      query: (queryArg) => ({
        url: "/audit",
        method: "GET",
        contentType: "application/json",
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
      PostAuditRes,
      IRestFulEndpointsQueryReturn<PostAuditReq>
    >({
      query: (queryArg) => ({
        url: "/audit",
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
  }),
});

export const {
  useGetAuditMutation,
  usePostAuditMutation,
} = injectedRtkApi;

export default injectedRtkApi;
