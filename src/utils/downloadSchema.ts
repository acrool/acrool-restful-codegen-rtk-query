import fs from 'node:fs';
import path from 'node:path';
import { isValidUrl } from './isValidUrl';

/**
 * 下載遠端 OpenAPI schema 並寫到本地路徑
 * @param remoteFile - 遠端 schema 網址
 * @param targetPath - 本地儲存路徑
 * @param patToken - 個人存取權杖，有值時以 `Authorization: Bearer` 送出
 */
export async function downloadSchemaFile(remoteFile: string, targetPath: string, patToken?: string): Promise<string> {
  // 如果不是網址，拋出錯誤
  if (!isValidUrl(remoteFile)) {
    throw new Error(`remoteFile must be a valid URL: ${remoteFile}`);
  }

  try {
    // 確保目錄存在
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }

    // 下載檔案
    const headers: Record<string, string> = patToken ? { Authorization: `Bearer ${patToken}` } : {};
    const response = await fetch(remoteFile, { headers });
    if (!response.ok) {
      throw new Error(`Failed to download schema from ${remoteFile}: ${response.status} ${response.statusText}`);
    }

    const content = await response.text();
    await fs.promises.writeFile(targetPath, content, 'utf-8');

    console.log(`Schema downloaded from ${remoteFile} to ${targetPath}`);
    return targetPath;
  } catch (error) {
    console.error(`Error downloading schema from ${remoteFile}:`, error);
    throw error;
  }
} 