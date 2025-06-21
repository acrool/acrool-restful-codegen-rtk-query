import type { ConfigFile, OutputFilesConfig } from '@acrool/rtk-query-codegen-openapi';


// 生成輸出文件配置
const generateOutputFiles = (): OutputFilesConfig => {
  return {
    './test_output3/$1/query.generated.ts': {
      // groupMatch: /^\/([^\/]+)/,
      groupMatch: /^\/Manager\/([^\/]+)/,
      queryMatch: (method: string, path: string) => {
        const paths = path.split('/');
        const lastPath = paths[paths.length - 1];
        return lastPath.startsWith('Read');
      }
    },
  };
};

const config: ConfigFile = {
  // schemaFile: './openapi.json',
  // schemaFile: './openapi8.json',
  // schemaFile: 'http://127.0.0.1:4523/export/openapi/2?version=3.0',
  schemaFile: 'http://127.0.0.1:4523/export/openapi/6541975/3235',
  downloadPath: './openapi9.json',
  apiFile: './baseApi.ts',
  apiImport: 'baseApi',
  outputFiles: generateOutputFiles(),
  sharedTypesFile: './test_output3/shared-types.ts', // 共用類型文件
  hooks: true,
  useEnumType: false,
};

export default config;
