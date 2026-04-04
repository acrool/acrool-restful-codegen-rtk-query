/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostAuditExportReportReq, PostAuditExportReportRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 匯出 觀察報表(Excel) */
        postAuditExportReport: build.mutation<
            PostAuditExportReportRes,
            IRestFulEndpointsQueryReturn<PostAuditExportReportReq>
        >({
            query: (queryArg) => ({
                url: "/audit/exportReport",
                method: "POST",
                contentType: "multipart/form-data",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePostAuditExportReportMutation,
} = injectedRtkApi;

export default injectedRtkApi;
