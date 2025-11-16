import fs from 'node:fs';
import path from 'node:path';
import { ensureDirectoryExists } from '../utils/directory';

/**
 * 檔案寫入結果
 */
export interface FileWriteResult {
  path: string;
  success: boolean;
  error?: Error;
}

/**
 * 檔案寫入服務 - 負責將產生的內容寫入檔案
 */
export class FileWriterService {
  /**
   * 寫入單一檔案
   * @param filePath - 檔案路徑
   * @param content - 檔案內容
   */
  async writeFile(filePath: string, content: string): Promise<FileWriteResult> {
    try {
      const resolvedPath = path.resolve(process.cwd(), filePath);
      const fileName = path.basename(resolvedPath);

      // enhanceEndpoints.ts 如果已存在則跳過寫入
      if (fileName === 'enhanceEndpoints.ts' && fs.existsSync(resolvedPath)) {
        return {
          path: resolvedPath,
          success: true
        };
      }

      await ensureDirectoryExists(resolvedPath);

      fs.writeFileSync(resolvedPath, content);

      return {
        path: resolvedPath,
        success: true
      };
    } catch (error) {
      return {
        path: filePath,
        success: false,
        error: error as Error
      };
    }
  }

  /**
   * 批次寫入多個檔案
   * @param files - 檔案路徑與內容的對應表
   */
  async writeFiles(files: Record<string, string>): Promise<FileWriteResult[]> {
    const results: FileWriteResult[] = [];

    for (const [filePath, content] of Object.entries(files)) {
      const result = await this.writeFile(filePath, content);
      results.push(result);
    }

    return results;
  }


  /**
   * 為群組寫入 RTK Query 檔案結構
   * @param groupOutputDir - 群組輸出目錄
   * @param files - 檔案內容
   */
  async writeGroupFiles(
    groupOutputDir: string,
    files: {
      types?: string; // types.ts
      queryService?: string; // query.generated.ts
      enhanceEndpoints?: string; // enhanceEndpoints.ts
      index?: string; // index.ts
    }
  ): Promise<FileWriteResult[]> {
    const filesToWrite: Record<string, string> = {};

    if (files.types) {
      filesToWrite[path.join(groupOutputDir, 'types.ts')] = files.types;
    }

    if (files.queryService) {
      filesToWrite[path.join(groupOutputDir, 'query.generated.ts')] = files.queryService;
    }

    if (files.enhanceEndpoints) {
      filesToWrite[path.join(groupOutputDir, 'enhanceEndpoints.ts')] = files.enhanceEndpoints;
    }

    if (files.index) {
      filesToWrite[path.join(groupOutputDir, 'index.ts')] = files.index;
    }

    return this.writeFiles(filesToWrite);
  }

  /**
   * 寫入共享檔案
   * @param outputDir - 輸出目錄
   * @param sharedFiles - 共享檔案內容
   */
  async writeSharedFiles(
    outputDir: string,
    sharedFiles: {
      commonTypes?: string;
      doNotModify?: string;
      utils?: string;
    }
  ): Promise<FileWriteResult[]> {
    const filesToWrite: Record<string, string> = {};

    if (sharedFiles.commonTypes) {
      filesToWrite[path.join(outputDir, 'common-types.ts')] = sharedFiles.commonTypes;
    }
    

    if (sharedFiles.doNotModify) {
      filesToWrite[path.join(outputDir, 'DO_NOT_MODIFY.md')] = sharedFiles.doNotModify;
    }

    if (sharedFiles.utils) {
      filesToWrite[path.join(outputDir, 'utils.ts')] = sharedFiles.utils;
    }

    return this.writeFiles(filesToWrite);
  }

  /**
   * 寫入共享檔案
   * @param outputDir - 輸出目錄
   * @param schema
   */
  async writeSchemaFile(
    outputDir: string,
    schema: string
  ): Promise<FileWriteResult[]> {
    const filesToWrite: Record<string, string> = {};

    filesToWrite[path.join(outputDir, 'schema.ts')] = schema;

    return this.writeFiles(filesToWrite);
  }


}