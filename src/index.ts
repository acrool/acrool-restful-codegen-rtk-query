import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { generateApi } from './generate';
import type { CommonOptions, ConfigFile, GenerationOptions, OutputFileOptions } from './types';
import { isValidUrl, prettify } from './utils';
export type { ConfigFile } from './types';

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

export async function generateEndpoints(options: GenerationOptions): Promise<string | void> {
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
    for (const [outputFile, specificConfig] of Object.entries(outputFiles)) {
      outFiles.push({
        ...commonConfig,
        ...specificConfig,
        outputFile,
      });
    }
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
