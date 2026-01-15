/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { PatchProfileSecurityReq, PatchProfileSecurityRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 更新個人安全資料 */
        patchProfileSecurity: build.mutation<
            PatchProfileSecurityRes,
            IRestFulEndpointsQueryReturn<PatchProfileSecurityReq>
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE_INFO],
            query: (queryArg) => ({
                url: "/profile/security",
                method: "PATCH",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePatchProfileSecurityMutation,
} = injectedRtkApi;

export default injectedRtkApi;
