/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import { baseApi as api } from "./src/library/redux/baseApi";
import { IRestFulEndpointsQueryReturn } from "@acrool/react-fetcher";

import type { GetParameterOperatorsReq, GetParameterOperatorsRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getParameterOperators: build.mutation<
      GetParameterOperatorsRes,
      void
    >({
      query: (queryArg) => ({
        url: "/parameter/operators",
        method: "GET",
        contentType: "application/json",
      }),
    }),
  }),
});

export const {
  useGetParameterOperatorsMutation,
} = injectedRtkApi;

export default injectedRtkApi;
