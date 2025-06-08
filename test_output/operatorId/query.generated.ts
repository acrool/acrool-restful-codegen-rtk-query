import { baseApi as api } from "../../baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";
import * as SharedTypes from "../shared-types";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
export const {
  usePostOperatorIdAuditByIdSignatureMutation,
  useGetOperatorIdAuditByIdQuery,
} = injectedRtkApi;
