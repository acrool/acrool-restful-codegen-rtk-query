import type { ConfigFile } from '@acrool/rtk-query-codegen-openapi';

const config: ConfigFile = {
  // schemaFile: 'http://127.0.0.1:4523/export/openapi/2?version=3.0',
  schemaFile: 'openapi.json',
  apiFile: './baseApi.ts',
  apiImport: 'baseApi',
  // outputFiles: {
  //     './src/api/endpoints.ts': {
  //         exportName: 'api',
  //     },
  // },
  outputFile: './test_output/outputFile.ts',
  hooks: true,
  useEnumType: true,
};

export default config;
