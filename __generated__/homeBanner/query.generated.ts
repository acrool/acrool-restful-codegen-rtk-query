/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { GetAdHomeBannerReq, GetAdHomeBannerRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 首頁輪播圖 */
        getAdHomeBanner: build.mutation<
            GetAdHomeBannerRes,
            void
        >({
            query: (queryArg) => ({
                url: "/ad/home-banner",
                method: "GET",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetAdHomeBannerMutation,
} = injectedRtkApi;

export default injectedRtkApi;
