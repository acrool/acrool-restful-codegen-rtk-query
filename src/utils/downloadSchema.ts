import fs from 'node:fs';
import path from 'node:path';
import { isValidUrl } from './isValidUrl';

export async function downloadSchemaFile(schemaFile: string, downloadPath?: string): Promise<string> {
  // 如果不是網址，直接返回原始路徑
  if (!isValidUrl(schemaFile)) {
    return schemaFile;
  }

  // 如果沒有指定下載路徑，使用預設路徑
  const targetPath = downloadPath || path.join(process.cwd(), 'temp-schema.json');
  
  try {
    // 確保目錄存在
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }

    // 下載檔案
    const response = await fetch(schemaFile);
    if (!response.ok) {
      throw new Error(`Failed to download schema from ${schemaFile}: ${response.statusText}`);
    }

    const content = await response.text();
    await fs.promises.writeFile(targetPath, content, 'utf-8');

    console.log(`Schema downloaded from ${schemaFile} to ${targetPath}`);
    return targetPath;
  } catch (error) {
    console.error(`Error downloading schema from ${schemaFile}:`, error);
    throw error;
  }
} 