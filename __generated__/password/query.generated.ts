/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { baseApi as api } from "./src/library/redux/baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";

import type { PutAuthPasswordReq, PutAuthPasswordRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    putAuthPassword: build.mutation<
      PutAuthPasswordRes,
      IRestFulEndpointsQueryReturn<PutAuthPasswordReq>
    >({
      query: (queryArg) => ({
        url: "/auth/password",
        method: "PUT",
        contentType: "application/x-www-form-urlencoded",
        body: queryArg.variables.body,
        fetchOptions: queryArg?.fetchOptions,
      }),
    }),
  }),
});

export const {
  usePutAuthPasswordMutation,
} = injectedRtkApi;

export default injectedRtkApi;
