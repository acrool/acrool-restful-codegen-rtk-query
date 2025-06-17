import type { ConfigFile } from '@acrool/rtk-query-codegen-openapi';


// 生成輸出文件配置
const generateOutputFiles = () => {
  return {
    './test_output3/$1/query.generated.ts': {
      filterEndpoints: [/^\/Manager\/([^\/]+)/],
      hooks: true,
      useEnumType: true
    },
  };
};

const config: ConfigFile = {
  schemaFile: './openapi7.json',
  apiFile: './src/baseApi.ts',
  apiImport: 'baseApi',
  outputFiles: generateOutputFiles(),
  sharedTypesFile: './test_output3/shared-types.ts', // 共用類型文件
  hooks: true,
  useEnumType: true,
};

export default config;
