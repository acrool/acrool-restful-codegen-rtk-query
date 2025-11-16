import path from 'node:path';
import fs from 'node:fs';

/**
 * 確保目錄存在的函數
 * @param filePath
 */
export async function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    await fs.promises.mkdir(dirname, { recursive: true });
  }
}

/**
 * 檢查檔案是否存在的函數
 * @param filePath
 */
export function fileExists(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * 獲取資料夾名稱並轉換為 API 名稱
 * @param dirPath
 */
export function getApiNameFromDir(dirPath: string): string {
  const dirName = path.basename(dirPath);
  return `${dirName}Api`;
}




/**
 * 確保基礎文件存在的函數
 * @param outputDir
 * @param operationNames
 */
export async function ensureBaseFilesExist(outputDir: string, operationNames: string[]) {
  const enhanceEndpointsPath = path.join(outputDir, 'enhanceEndpoints.ts');
  const indexPath = path.join(outputDir, 'index.ts');

  // 如果 enhanceEndpoints.ts 不存在，創建它
  if (!fileExists(enhanceEndpointsPath)) {
    // 生成操作名稱的字符串
    const operationNamesString = operationNames
      .map(name => `        ${name}: {},`)
      .join('\n');

    const enhanceEndpointsContent = `import api from './query.service';

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
    const indexContent = `export * from './query.service';
`;
    await fs.promises.writeFile(indexPath, indexContent, 'utf-8');
  }
}