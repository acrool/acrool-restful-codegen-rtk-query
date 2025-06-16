import type { ConfigFile } from '@acrool/rtk-query-codegen-openapi';

// 從路徑中提取分類名稱
const getGroupNameFromPath = (path: string): string => {
  // 匹配 /Manager/xxxx/* 格式的路徑
  const match = path.match(/^\/Manager\/(.+)\/.+$/);
  if (match) {
    return `Manager${match[1]}`;
  }
  return 'common';
};

// 生成輸出文件配置
const generateOutputFiles = () => {
  return {
    './test_output/ManagerAdmin/query.generated.ts': {
      filterEndpoints: [/^\/Manager\/Admin\/.+$/],
      typeOutputDir: './types',
      exportTypes: true,
    },
    './test_output/ManagerBetRecord/query.generated.ts': {
      filterEndpoints: [/^\/Manager\/BetRecord\/.+$/],
      typeOutputDir: './types',
      exportTypes: true,
    },
    './test_output/ManagerCommon/query.generated.ts': {
      filterEndpoints: [/^\/Manager\/Common\/.+$/],
      typeOutputDir: './types',
      exportTypes: true,
    },
    './test_output/common/query.generated.ts': {
      filterEndpoints: [/^(?!\/Manager\/).+$/],
      typeOutputDir: './types',
      exportTypes: true,
    }
  };
};

const config: ConfigFile = {
  schemaFile: 'openapi.json',
  apiFile: './baseApi.ts',
  apiImport: 'baseApi',
  outputFiles: generateOutputFiles(),
  hooks: true,
  useEnumType: true,
  sharedTypesFile: './test_output/shared-types.ts', // 共用類型文件
};

export default config;
