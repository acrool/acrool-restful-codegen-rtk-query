import type { ConfigFile } from '@acrool/rtk-query-codegen-openapi';

const config: ConfigFile = {
  schemaFile: './fixtures/petstore.yaml',
  apiFile: './fixtures/emptyApi.ts',
  outputFile: './tmp/example.ts',
};

export default config;
