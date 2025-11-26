import type { ConfigFile } from "@acrool/rtk-query-codegen-openapi";

const config: ConfigFile = {
    // remoteFile: "http://127.0.0.1:4523/export/openapi/6541975/0",
    schemaFile: "openapi.json",
    apiConfiguration: {
        file: "./src/library/redux/baseApi.ts",
        importName: "baseApi",
    },
    httpClient: {
        file: "@acrool/react-fetcher",
        importReturnTypeName: "IRestFulEndpointsQueryReturn",
    },
    cacheTagTypes: {
      file: "@/store/tagTypes",
      importReturnTypeName: "ECacheTagTypes",
    },
    outputFiles: {
        outputDir: "./__generated__",
        // filterEndpoint: 沒有提供時默認允許所有端點
        groupKeyMatch: (path: string) => {
            // 根據路徑模式提取 groupKey
            const paths = path.split("/").filter((path) => path !== "");

            return paths[1];
        },
        queryMatch: (_method: string, path: string) => {
            const paths = path.split("/");
            const lastPath = paths[paths.length - 1];
            return lastPath.startsWith("Read");
        },
    },
    useLazyQueries: true,
};

export default config;
