/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostOauthWhatsappReq, PostOauthWhatsappRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** WhatsApp 第三方登入／綁定 */
        postOauthWhatsapp: build.mutation<
            PostOauthWhatsappRes,
            void
        >({
            query: (queryArg) => ({
                url: "/oauth/whatsapp",
                method: "POST",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  usePostOauthWhatsappMutation,
} = injectedRtkApi;

export default injectedRtkApi;
