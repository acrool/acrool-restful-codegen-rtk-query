import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { generateApi } from './generate';
import type { CommonOptions, ConfigFile, GenerationOptions, OutputFileOptions } from './types';
import { prettify, getV3Doc, downloadSchemaFile } from './utils';
import camelCase from 'lodash.camelcase';
export type { OutputFilesConfig, ConfigFile } from './types';

const require = createRequire(__filename);

// 確保目錄存在的函數
async function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    await fs.promises.mkdir(dirname, { recursive: true });
  }
}

// 檢查檔案是否存在的函數
function fileExists(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

// 獲取資料夾名稱並轉換為 API 名稱
function getApiNameFromDir(dirPath: string): string {
  const dirName = path.basename(dirPath);
  return `${dirName}Api`;
}

// 確保基礎文件存在的函數
async function ensureBaseFilesExist(outputDir: string, operationNames: string[]) {
  const enhanceEndpointsPath = path.join(outputDir, 'enhanceEndpoints.ts');
  const indexPath = path.join(outputDir, 'index.ts');
  const apiName = getApiNameFromDir(outputDir);

  // 如果 enhanceEndpoints.ts 不存在，創建它
  if (!fileExists(enhanceEndpointsPath)) {
    // 生成操作名稱的字符串
    const operationNamesString = operationNames
      .map(name => `        ${name}: {},`)
      .join('\n');

    const enhanceEndpointsContent = `import api from './query.generated';

const enhancedApi = api.enhanceEndpoints({
    endpoints: {
${operationNamesString}
    },
});

export default enhancedApi;
`;
    await fs.promises.writeFile(enhanceEndpointsPath, enhanceEndpointsContent, 'utf-8');
  }
  // 如果文件已存在，不做任何修改

  // 如果 index.ts 不存在，創建它
  if (!fileExists(indexPath)) {
    const indexContent = `export * from './query.generated';
export {default as ${apiName}} from './enhanceEndpoints';
`;
    await fs.promises.writeFile(indexPath, indexContent, 'utf-8');
  }
}

export async function generateEndpoints(options: GenerationOptions): Promise<string | void> {
  // 如果有 remoteFile，先下載到 schemaFile 路徑
  let actualSchemaFile = options.schemaFile;
  
  if (options.remoteFile) {
    actualSchemaFile = await downloadSchemaFile(options.remoteFile, options.schemaFile);
  }
  
  // 更新 options 中的 schemaFile 為實際的檔案路徑
  const updatedOptions = {
    ...options,
    schemaFile: actualSchemaFile
  };

  const schemaLocation = updatedOptions.schemaFile;

  const schemaAbsPath = path.resolve(process.cwd(), schemaLocation);

  // 如果是使用 outputFiles 配置，需要特殊處理
  if ('outputFiles' in options) {
    const { outputFiles, ...commonConfig } = updatedOptions as any;
    
    // 異步獲取 OpenAPI 文檔
    const openApiDoc = await getV3Doc(actualSchemaFile, updatedOptions.httpResolverOptions);
    const paths = Object.keys(openApiDoc.paths);

    // 從配置中獲取分類規則
    const { groupKeyMatch, outputDir, filterEndpoint, queryMatch } = outputFiles;

    // 根據路徑自動分類
    const groupedPaths = paths.reduce((acc, path) => {
      // 使用 groupKeyMatch 方法獲取 groupKey，並轉換為小駝峰格式
      const groupKey = camelCase(groupKeyMatch(path));
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(path);
      return acc;
    }, {} as Record<string, string[]>);

    // 為每個分類生成配置並執行
    for (const [groupKey, paths] of Object.entries(groupedPaths)) {
      const finalOutputPath = `${outputDir}/${groupKey}/query.generated.ts`;

      if (filterEndpoint) {
        // 如果有 filterEndpoint，使用基於路徑的篩選函數
        const pathBasedFilter = (operationName: string, operationDefinition: any) => {
          const path = operationDefinition.path;

          // 檢查路徑是否匹配當前分組
          const pathGroupKey = camelCase(groupKeyMatch(path));
          if (pathGroupKey !== groupKey) {
            return false;
          }

          // 使用 filterEndpoint 進行額外篩選
          const endpointFilter = filterEndpoint(groupKey);
          if (endpointFilter instanceof RegExp) {
            return endpointFilter.test(operationName);
          }

          return true;
        };

        const groupOptions = {
          ...commonConfig,
          outputFile: finalOutputPath,
          sharedTypesFile: `${outputDir}/shared-types.ts`,
          filterEndpoints: pathBasedFilter,
          queryMatch,
        };

        await generateSingleEndpoint(groupOptions);
      } else {
        // 如果沒有 filterEndpoint，只使用路徑分組
        const pathBasedFilter = (operationName: string, operationDefinition: any) => {
          const path = operationDefinition.path;

          // 檢查路徑是否匹配當前分組
          const pathGroupKey = camelCase(groupKeyMatch(path));
          return pathGroupKey === groupKey;
        };

        const groupOptions = {
          ...commonConfig,
          outputFile: finalOutputPath,
          sharedTypesFile: `${outputDir}/shared-types.ts`,
          filterEndpoints: pathBasedFilter,
          queryMatch,
        };

        await generateSingleEndpoint(groupOptions);
      }
    }
    return;
  }

  // 原有的邏輯處理非 outputFiles 配置或本地文件
  await generateSingleEndpoint(updatedOptions);
}

async function generateSingleEndpoint(options: GenerationOptions): Promise<string | void> {
  const schemaLocation = options.schemaFile;

  const schemaAbsPath = path.resolve(process.cwd(), schemaLocation);

  const result = await enforceOazapftsTsVersion(async () => {
    return generateApi(schemaAbsPath, options);
  });
  
  const { outputFile, prettierConfigFile } = options;
  if (outputFile) {
    const outputPath = path.resolve(process.cwd(), outputFile);
    await ensureDirectoryExists(outputPath);

    // 確保基礎文件存在
    const outputDir = path.dirname(outputPath);
    await ensureBaseFilesExist(outputDir, result.operationNames);

    fs.writeFileSync(
      outputPath,
      await prettify(outputFile, result.sourceCode, prettierConfigFile)
    );
  } else {
    return await prettify(null, result.sourceCode, prettierConfigFile);
  }
}

export function parseConfig(fullConfig: ConfigFile) {
  const outFiles: (CommonOptions & OutputFileOptions)[] = [];

  if ('outputFiles' in fullConfig) {
    const { outputFiles, ...commonConfig } = fullConfig;

    // 讀取 OpenAPI 文檔 - 支援本地文件
    let openApiDoc: any;
    
    // 如果有 remoteFile，直接返回原始配置，讓 generateEndpoints 處理下載
    if (fullConfig.remoteFile) {
      outFiles.push(fullConfig as any);
      return outFiles;
    } else {
      // 如果是本地文件，直接讀取
      openApiDoc = JSON.parse(fs.readFileSync(fullConfig.schemaFile, 'utf-8'));
    }

    const paths = Object.keys(openApiDoc.paths);

    // 從配置中獲取分類規則
    const { groupKeyMatch, outputDir, filterEndpoint, queryMatch } = outputFiles;

    // 根據路徑自動分類
    const groupedPaths = paths.reduce((acc, path) => {
      // 使用 groupKeyMatch 方法獲取 groupKey，並轉換為小駝峰格式
      const groupKey = camelCase(groupKeyMatch(path));
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(path);
      return acc;
    }, {} as Record<string, string[]>);

    // 為每個分類生成配置
    Object.entries(groupedPaths).forEach(([groupKey, paths]) => {
      const finalOutputPath = `${outputDir}/${groupKey}/query.generated.ts`;

      if (filterEndpoint) {
        // 如果有 filterEndpoint，使用基於路徑的篩選函數
        const pathBasedFilter = (operationName: string, operationDefinition: any) => {
          const path = operationDefinition.path;

          // 檢查路徑是否匹配當前分組
          const pathGroupKey = camelCase(groupKeyMatch(path));
          if (pathGroupKey !== groupKey) {
            return false;
          }

          // 使用 filterEndpoint 進行額外篩選
          const endpointFilter = filterEndpoint(groupKey);
          if (endpointFilter instanceof RegExp) {
            return endpointFilter.test(operationName);
          }

          return true;
        };

        outFiles.push({
          ...commonConfig,
          outputFile: finalOutputPath,
          sharedTypesFile: `${outputDir}/shared-types.ts`,
          filterEndpoints: pathBasedFilter,
          queryMatch,
        });
      } else {
        // 如果沒有 filterEndpoint，只使用路徑分組
        const pathBasedFilter = (operationName: string, operationDefinition: any) => {
          const path = operationDefinition.path;

          // 檢查路徑是否匹配當前分組
          const pathGroupKey = camelCase(groupKeyMatch(path));
          return pathGroupKey === groupKey;
        };

        outFiles.push({
          ...commonConfig,
          outputFile: finalOutputPath,
          sharedTypesFile: `${outputDir}/shared-types.ts`,
          filterEndpoints: pathBasedFilter,
          queryMatch,
        });
      }
    });

  } else {
    outFiles.push(fullConfig);
  }
  return outFiles;
}

/**
 * Enforces `oazapfts` to use the same TypeScript version as this module itself uses.
 * That should prevent enums from running out of sync if both libraries use different TS versions.
 */
function enforceOazapftsTsVersion<T>(cb: () => T): T {
  const ozTsPath = require.resolve('typescript', { paths: [require.resolve('oazapfts')] });
  const tsPath = require.resolve('typescript');
  const originalEntry = require.cache[ozTsPath];
  try {
    require.cache[ozTsPath] = require.cache[tsPath];
    return cb();
  } finally {
    if (originalEntry) {
      require.cache[ozTsPath] = originalEntry;
    } else {
      delete require.cache[ozTsPath];
    }
  }
}
