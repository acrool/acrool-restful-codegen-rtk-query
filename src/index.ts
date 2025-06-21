import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { generateApi } from './generate';
import type { CommonOptions, ConfigFile, GenerationOptions, OutputFileOptions } from './types';
import { isValidUrl, prettify, getV3Doc, downloadSchemaFile } from './utils';
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
async function ensureBaseFilesExist(outputDir: string) {
  const enhanceEndpointsPath = path.join(outputDir, 'enhanceEndpoints.ts');
  const indexPath = path.join(outputDir, 'index.ts');
  const apiName = getApiNameFromDir(outputDir);

  // 如果 enhanceEndpoints.ts 不存在，創建它
  if (!fileExists(enhanceEndpointsPath)) {
    const enhanceEndpointsContent = `import api from './query.generated';

const enhancedApi = api.enhanceEndpoints({
    endpoints: {
    },
});

export default enhancedApi;
`;
    await fs.promises.writeFile(enhanceEndpointsPath, enhanceEndpointsContent, 'utf-8');
  }

  // 如果 index.ts 不存在，創建它
  if (!fileExists(indexPath)) {
    const indexContent = `export * from './query.generated';
export {default as ${apiName}} from './enhanceEndpoints';
`;
    await fs.promises.writeFile(indexPath, indexContent, 'utf-8');
  }
}


// 從路徑中提取分類名稱
function getGroupNameFromPath(path: string, pattern: RegExp): string {
  // console.log('pattern', pattern);

  const match = path.match(pattern);
  // console.log('match', path, match);

  if (match && match[1]) {
    return camelCase(match[1]);
  }
  return 'common';
}





export async function generateEndpoints(options: GenerationOptions): Promise<string | void> {
  // 如果是網址，先下載到指定路徑
  const actualSchemaFile = await downloadSchemaFile(options.schemaFile, options.downloadPath);
  
  // 更新 options 中的 schemaFile 為實際的檔案路徑
  const updatedOptions = {
    ...options,
    schemaFile: actualSchemaFile
  };

  const schemaLocation = updatedOptions.schemaFile;

  const schemaAbsPath = isValidUrl(updatedOptions.schemaFile)
    ? updatedOptions.schemaFile
    : path.resolve(process.cwd(), schemaLocation);

  // 如果是 URL 且使用 outputFiles 配置，需要特殊處理
  if (isValidUrl(options.schemaFile) && 'outputFiles' in options) {
    const { outputFiles, ...commonConfig } = updatedOptions as any;
    
    // 異步獲取 OpenAPI 文檔
    const openApiDoc = await getV3Doc(actualSchemaFile, updatedOptions.httpResolverOptions);
    const paths = Object.keys(openApiDoc.paths);

    // 從配置中獲取分類規則
    const outputFilesEntries = Object.entries(outputFiles);
    const [outputPath, config] = outputFilesEntries[0];
    const patterns = (config as any).groupMatch;
    const filterEndpoint = (config as any).filterEndpoint;
    const queryMatch = (config as any).queryMatch;

    const pattern = patterns;
    // 根據路徑自動分類
    const groupedPaths = paths.reduce((acc, path) => {
      const groupName = getGroupNameFromPath(path, pattern);
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(path);
      return acc;
    }, {} as Record<string, string[]>);

    // 為每個分類生成配置並執行
    for (const [groupName, paths] of Object.entries(groupedPaths)) {
      const finalOutputPath = outputPath.replace('$1', groupName);

      if (filterEndpoint) {
        // 如果有 filterEndpoint，使用基於路徑的篩選函數
        const pathBasedFilter = (operationName: string, operationDefinition: any) => {
          const path = operationDefinition.path;
          
          // 檢查路徑是否匹配當前分組
          const pathGroupName = getGroupNameFromPath(path, pattern);
          if (pathGroupName !== groupName) {
            return false;
          }

          // 使用 filterEndpoint 進行額外篩選
          const endpointFilter = filterEndpoint(groupName);
          if (endpointFilter instanceof RegExp) {
            return endpointFilter.test(operationName);
          }

          return true;
        };

        const groupOptions = {
          ...commonConfig,
          outputFile: finalOutputPath,
          filterEndpoints: pathBasedFilter,
          queryMatch,
        };

        await generateSingleEndpoint(groupOptions);
      } else {
        // 如果沒有 filterEndpoint，只使用路徑分組
        const pathBasedFilter = (operationName: string, operationDefinition: any) => {
          const path = operationDefinition.path;
          
          // 檢查路徑是否匹配當前分組
          const pathGroupName = getGroupNameFromPath(path, pattern);
          return pathGroupName === groupName;
        };

        const groupOptions = {
          ...commonConfig,
          outputFile: finalOutputPath,
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

  const schemaAbsPath = isValidUrl(options.schemaFile)
    ? options.schemaFile
    : path.resolve(process.cwd(), schemaLocation);

  const sourceCode = await enforceOazapftsTsVersion(async () => {
    return generateApi(schemaAbsPath, options);
  });
  const { outputFile, prettierConfigFile } = options;
  if (outputFile) {
    const outputPath = path.resolve(process.cwd(), outputFile);
    await ensureDirectoryExists(outputPath);

    // 確保基礎文件存在
    const outputDir = path.dirname(outputPath);
    await ensureBaseFilesExist(outputDir);

    fs.writeFileSync(
      outputPath,
      await prettify(outputFile, sourceCode, prettierConfigFile)
    );
  } else {
    return await prettify(null, sourceCode, prettierConfigFile);
  }
}

export function parseConfig(fullConfig: ConfigFile) {
  const outFiles: (CommonOptions & OutputFileOptions)[] = [];

  if ('outputFiles' in fullConfig) {
    const { outputFiles, ...commonConfig } = fullConfig;

    // 讀取 OpenAPI 文檔 - 支援 URL 和本地文件
    let openApiDoc: any;
    if (isValidUrl(fullConfig.schemaFile)) {
      // 如果是 URL，直接返回原始配置，讓 generateEndpoints 處理下載
      outFiles.push(fullConfig as any);
      return outFiles;
    } else {
      // 如果是本地文件，直接讀取
      openApiDoc = JSON.parse(fs.readFileSync(fullConfig.schemaFile, 'utf-8'));
    }

    const paths = Object.keys(openApiDoc.paths);

    // 從配置中獲取分類規則
    const outputFilesEntries = Object.entries(outputFiles);
    const [outputPath, config] = outputFilesEntries[0];
    const patterns = (config as any).groupMatch;
    const filterEndpoint = (config as any).filterEndpoint;
    const queryMatch = (config as any).queryMatch;

    const pattern = patterns;
    // 根據路徑自動分類
    const groupedPaths = paths.reduce((acc, path) => {
      const groupName = getGroupNameFromPath(path, pattern);
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(path);
      return acc;
    }, {} as Record<string, string[]>);

    // 為每個分類生成配置
    Object.entries(groupedPaths).forEach(([groupName, paths]) => {
      const finalOutputPath = outputPath.replace('$1', groupName);

      if (filterEndpoint) {
        // 如果有 filterEndpoint，使用基於路徑的篩選函數
        const pathBasedFilter = (operationName: string, operationDefinition: any) => {
          const path = operationDefinition.path;
          
          // 檢查路徑是否匹配當前分組
          const pathGroupName = getGroupNameFromPath(path, pattern);
          if (pathGroupName !== groupName) {
            return false;
          }

          // 使用 filterEndpoint 進行額外篩選
          const endpointFilter = filterEndpoint(groupName);
          if (endpointFilter instanceof RegExp) {
            return endpointFilter.test(operationName);
          }

          return true;
        };

        outFiles.push({
          ...commonConfig,
          outputFile: finalOutputPath,
          filterEndpoints: pathBasedFilter,
          queryMatch,
        });
      } else {
        // 如果沒有 filterEndpoint，只使用路徑分組
        const pathBasedFilter = (operationName: string, operationDefinition: any) => {
          const path = operationDefinition.path;
          
          // 檢查路徑是否匹配當前分組
          const pathGroupName = getGroupNameFromPath(path, pattern);
          return pathGroupName === groupName;
        };

        outFiles.push({
          ...commonConfig,
          outputFile: finalOutputPath,
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
