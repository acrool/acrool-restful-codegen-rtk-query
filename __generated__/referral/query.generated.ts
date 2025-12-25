/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

import {baseApi as api} from "./src/library/redux/baseApi";
import {IRestFulEndpointsQueryReturn} from "@acrool/react-fetcher";

import type { GetProfileReferralRewardReq, PostProfileReferralRewardClaimReq, GetProfileReferralRewardRes, PostProfileReferralRewardClaimRes } from "./types";


const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        /** 取得好友推薦獎勵資訊 */
        getProfileReferralReward: build.mutation<
            GetProfileReferralRewardRes,
            void
        >({
            query: (queryArg) => ({
                url: "/profile/referral/reward",
                method: "GET",
                contentType: "application/json",
            }),
        }),
        /** 領收好友推薦獎勵 */
        postProfileReferralRewardClaim: build.mutation<
            PostProfileReferralRewardClaimRes,
            void
        >({
            query: (queryArg) => ({
                url: "/profile/referral/reward/claim",
                method: "POST",
                contentType: "application/json",
            }),
        }),
    }),
});

export const {
  useGetProfileReferralRewardMutation,
  usePostProfileReferralRewardClaimMutation,
} = injectedRtkApi;

export default injectedRtkApi;
