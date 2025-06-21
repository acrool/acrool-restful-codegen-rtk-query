import type { ConfigFile } from '@acrool/rtk-query-codegen-openapi';

const config: ConfigFile = {
  remoteFile: 'http://127.0.0.1:4523/export/openapi/6541975/3235',
  schemaFile: 'openapi8.json',
  apiFile: './baseApi.ts',
  apiImport: 'baseApi',
  outputFiles: {
    outputDir: './test_output3',
    groupKeyMatch: (path: string) => {
      // 根據路徑模式提取 groupKey
      const paths = path.split('/')
        .filter(path => path !== '');

      return paths[1];
    },
    queryMatch: (method: string, path: string) => {
      const paths = path.split('/');
      const lastPath = paths[paths.length - 1];
      return lastPath.startsWith('Read');
    },
  },
  endpointsQueryReturnTypeFile: '@acrool/react-fetcher',
  hooks: true,
  useEnumType: false,
};

export default config;
