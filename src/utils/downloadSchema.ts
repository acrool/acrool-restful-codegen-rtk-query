import fs from 'node:fs';
import path from 'node:path';
import { isValidUrl } from './isValidUrl';

export async function downloadSchemaFile(remoteFile: string, targetPath: string): Promise<string> {
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
    const response = await fetch(remoteFile);
    if (!response.ok) {
      throw new Error(`Failed to download schema from ${remoteFile}: ${response.statusText}`);
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