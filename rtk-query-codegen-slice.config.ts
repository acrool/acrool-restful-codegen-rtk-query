import type { ConfigFile } from '@acrool/rtk-query-codegen-openapi';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const getTargetPath = (key: string) => {
  return `./test_output/${key}/query.generated.ts`;
}

const generateOutputFiles = (keys: string[]) => {

  return Object.fromEntries(
    keys.map(key => {
      const operationNameSuffix = capitalize(key);
      const targetPath = getTargetPath(key);
      return [
        targetPath,
        {
          filterEndpoints: [new RegExp(`^(get|post|put|delete)${operationNameSuffix}`, 'i')],
          typeOutputDir: './types',
          exportTypes: true,
        }
      ];
    }).concat([
      [
        getTargetPath('common'),
        {
          filterEndpoints: [new RegExp(`^(?!.*(${keys.join('|')})).+$`, 'i')],
          typeOutputDir: './types',
          exportTypes: true,
        }
      ]
    ])
  );
};

const config: ConfigFile = {
  schemaFile: 'openapi.json',
  apiFile: './baseApi.ts',
  apiImport: 'baseApi',
  // outputFiles: generateOutputFiles(['auth', 'audit', 'operatorId']),
  outputFiles: generateOutputFiles(['auth', 'audit', 'operatorId']),
  hooks: true,
  useEnumType: true,
  sharedTypesFile: './test_output/shared-types.ts', // 共用類型文件
// typeOutputDir: './types',
  // exportTypes: true,
};

export default config;
