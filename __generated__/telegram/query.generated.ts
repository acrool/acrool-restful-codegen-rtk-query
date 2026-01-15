/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { PostOauthTelegramReq, PostOauthTelegramRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** Telegram 第三方登入／綁定 */
        postOauthTelegram: build.mutation<
            PostOauthTelegramRes,
            void
        >({
            query: (queryArg) => ({
                url: "/oauth/telegram",
                method: "POST",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  usePostOauthTelegramMutation,
} = injectedRtkApi;

export default injectedRtkApi;
