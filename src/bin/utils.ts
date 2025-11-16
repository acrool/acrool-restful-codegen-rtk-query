import program from 'commander';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { existsSync, rmSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const require = createRequire(__filename);




/**
 * 備份 enhanceEndpoints.ts 檔案
 * @param {string} outputDir - 輸出目錄路徑
 * @returns {Map<string, Buffer>} 備份的檔案內容對應
 */
function backupEnhanceEndpoints(outputDir: string): Map<string, Buffer> {
  const backupMap = new Map<string, Buffer>();

  if (!existsSync(outputDir)) {
    return backupMap;
  }

  function scanDirectory(dir: string): void {
    try {
      const items = readdirSync(dir);

      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = statSync(itemPath);

        if (stat.isDirectory()) {
          scanDirectory(itemPath);
        } else if (item === 'enhanceEndpoints.ts') {
          // 讀取檔案內容到記憶體
          const content = require('node:fs').readFileSync(itemPath);
          backupMap.set(itemPath, content);
        }
      }
    } catch (error) {
      // 忽略掃描錯誤，繼續處理其他目錄
    }
  }

  scanDirectory(outputDir);
  return backupMap;
}

/**
 * 還原 enhanceEndpoints.ts 檔案
 * @param {Map<string, Buffer>} backupMap - 備份檔案內容對應
 */
function restoreEnhanceEndpoints(backupMap: Map<string, Buffer>): void {
  for (const [originalPath, content] of backupMap) {
    try {
      // 確保目錄存在
      const dir = path.dirname(originalPath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      // 寫入檔案內容
      require('node:fs').writeFileSync(originalPath, content);
    } catch (error) {
      console.warn(`Failed to restore ${originalPath}:`, error);
    }
  }
}

/**
 * 清理輸出目錄，但保護 enhanceEndpoints.ts 檔案
 * 移除設定檔中指定的 outputDir 目錄及其內容，但會備份並還原 enhanceEndpoints.ts
 * @param {string} outputDir - 要清理的目錄路徑
 */
export function cleanOutputDirectory(outputDir: string): void {
  // 安全檢查：避免刪除重要目錄
  const dangerousPaths = ['/', '/usr', '/etc', '/var', '/home', '/Users', '.', '..'];
  const normalizedPath = resolve(outputDir);

  if (dangerousPaths.some(path => normalizedPath === resolve(path))) {
    console.error(`Dangerous path detected: ${normalizedPath}. Refusing to delete.`);
    process.exit(1);
  }

  if (existsSync(outputDir)) {
    console.log(`Cleaning output directory: ${outputDir}`);

    // 1. 備份所有 enhanceEndpoints.ts 檔案
    const backupMap = backupEnhanceEndpoints(outputDir);

    // 2. 刪除整個目錄
    rmSync(outputDir, { recursive: true, force: true });

    // 3. 還原 enhanceEndpoints.ts 檔案
    if (backupMap.size > 0) {
      restoreEnhanceEndpoints(backupMap);
      console.log(`Protected ${backupMap.size} enhanceEndpoints.ts file(s) from deletion`);
    }

    console.log(`Directory cleaned: ${outputDir}`);
  }
}


/**
 * 設置 TypeScript 支援
 * 優先使用 esbuild-runner，其次使用 ts-node
 * @returns {boolean} 是否成功設置 TypeScript 支援
 */
export function setupTypeScriptSupport(): boolean {
  try {
    if (require.resolve('esbuild') && require.resolve('esbuild-runner')) {
      require('esbuild-runner/register');
      return true;
    }
  } catch {}

  try {
    if (require.resolve('typescript') && require.resolve('ts-node')) {
      (require('ts-node') as typeof import('ts-node')).register({
        transpileOnly: true,
        compilerOptions: {
          target: 'es6',
          module: 'commonjs',
        },
      });
      return true;
    }
  } catch {}

  return false;
}

/**
 * 驗證設定檔案格式是否有效
 * 支援 .js/.ts/.mjs/.mts/.cjs/.cts/.json/.jsonc 格式
 * @param {string} configFile - 設定檔案路徑
 */
export function validateConfigFile(configFile: string): void {
  if (!configFile || !/\.([mc]?(jsx?|tsx?)|jsonc?)?$/.test(configFile)) {
    console.error('Please provide a valid configuration file.');
    program.help();
  }
}

/**
 * 驗證 TypeScript 設定檔是否有相應的執行環境支援
 * @param {string} configFile - 設定檔案路徑
 * @param {boolean} hasTypeScriptSupport - 是否已設置 TypeScript 支援
 */
export function validateTypeScriptSupport(configFile: string, hasTypeScriptSupport: boolean): void {
  if (/\.[mc]?tsx?$/.test(configFile) && !hasTypeScriptSupport) {
    console.error('Encountered a TypeScript config file, but neither esbuild-runner nor ts-node are installed.');
    process.exit(1);
  }
}
