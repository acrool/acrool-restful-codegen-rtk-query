/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";
import {ECacheTagTypes} from "../tagTypes";

import type { PatchProfileBasicReq, PatchProfileBasicRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 更新個人基本資料 */
        patchProfileBasic: build.mutation<
            PatchProfileBasicRes,
            IRestFulEndpointsQueryReturn<PatchProfileBasicReq>
        >({
            invalidatesTags: [ECacheTagTypes.PROFILE_INFO],
            query: (queryArg) => ({
                url: "/profile/basic",
                method: "PATCH",
                contentType: "application/x-www-form-urlencoded",
                body: queryArg.variables.body,
                fetchOptions: queryArg?.fetchOptions,
            }),
        }),
    }),
});

export const {
  usePatchProfileBasicMutation,
} = injectedRtkApi;

export default injectedRtkApi;
