import type { OpenAPIV3 } from 'openapi-types';
import { getV3Doc, downloadSchemaFile } from '../utils';

/**
 * OpenAPI 服務 - 負責獲取和處理 OpenAPI 文檔
 * 
 * 單一職責：
 * - 從本地文件或遠程URL獲取OpenAPI文檔
 * - 管理文檔快取
 * - 提供文檔基本操作方法
 * 
 * 設計原則：
 * - 非收集模式：每次調用都是獨立的操作
 * - 無副作用：不修改傳入的參數
 * - 可測試性：所有方法都有明確的輸入輸出
 */
export class OpenApiService {
  private docCache: Record<string, OpenAPIV3.Document> = {};

  /**
   * 獲取 OpenAPI 文檔
   * @param schemaLocation - Schema 位置 (URL 或本地路徑)
   * @param httpResolverOptions - HTTP 解析選項
   */
  async getDocument(
    schemaLocation: string, 
    httpResolverOptions?: any
  ): Promise<OpenAPIV3.Document> {
    if (this.docCache[schemaLocation]) {
      return this.docCache[schemaLocation];
    }

    const doc = await getV3Doc(schemaLocation, httpResolverOptions);
    this.docCache[schemaLocation] = doc;
    return doc;
  }

  /**
   * 下載遠程 Schema 文件
   * @param remoteUrl - 遠程 URL
   * @param localPath - 本地儲存路徑
   */
  async downloadSchema(remoteUrl: string, localPath: string): Promise<string> {
    return downloadSchemaFile(remoteUrl, localPath);
  }

  /**
   * 獲取所有 API 路徑
   * @param doc - OpenAPI 文檔
   */
  getPaths(doc: OpenAPIV3.Document): string[] {
    return Object.keys(doc.paths || {});
  }

  /**
   * 清除快取
   */
  clearCache(): void {
    this.docCache = {};
  }
}