import type { ConfigFile, OutputFilesConfig } from '@acrool/rtk-query-codegen-openapi';


// 生成輸出文件配置
const generateOutputFiles = (): OutputFilesConfig => {
  return {
    './test_output3/$1/query.generated.ts': {
      // groupMatch: /^\/([^\/]+)/,
      groupMatch: /^\/Manager\/([^\/]+)/,
    },
  };
};

const config: ConfigFile = {
  // schemaFile: './openapi.json',
  schemaFile: './openapi8.json',
  // schemaFile: 'http://127.0.0.1:4523/export/openapi/2?version=3.0',
  apiFile: './baseApi.ts',
  apiImport: 'baseApi',
  outputFiles: generateOutputFiles(),
  sharedTypesFile: './test_output3/shared-types.ts', // 共用類型文件
  hooks: true,
  useEnumType: false,
};

export default config;
