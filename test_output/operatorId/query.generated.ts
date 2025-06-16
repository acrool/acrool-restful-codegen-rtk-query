import { baseApi as api, IRestFulEndpointsQueryReturn } from "../../baseApi";
import * as SharedTypes from "../shared-types";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({}),
  overrideExisting: false,
});
export default injectedRtkApi;
export const {} = injectedRtkApi;
