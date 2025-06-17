import type { ConfigFile } from '@acrool/rtk-query-codegen-openapi';

const config: ConfigFile = {
  // schemaFile: 'http://127.0.0.1:4523/export/openapi/2?version=3.0',
  schemaFile: 'openapi6.json',
  apiFile: './baseApi.ts',
  apiImport: 'baseApi',
  // outputFiles: {
  //     './src/api/endpoints.ts': {
  //         exportName: 'api',
  //     },
  // },
  sharedTypesFile: './test_output2/shared-types.ts', // 共用類型文件
  outputFile: './test_output2/outputFile.ts',
  hooks: true,
  useEnumType: true,
};

export default config;
