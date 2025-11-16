import ApiGenerator from 'oazapfts/generate';
import type { OpenAPIV3 } from 'openapi-types';
import type { GenerationOptions } from '../types';
import { getOperationDefinitions } from '../utils';

/**
 * OpenAPI 解析器服務 - 負責解析 OpenAPI 文檔並提取相關數據
 */
export class OpenApiParserService {
  private apiGen: ApiGenerator;

  constructor(
    private v3Doc: OpenAPIV3.Document,
    options: Partial<GenerationOptions>
  ) {
    this.apiGen = new ApiGenerator(v3Doc, {
      unionUndefined: options.unionUndefined,
      mergeReadWriteOnly: options.mergeReadWriteOnly,
    });
  }

  /**
   * 初始化 - 預處理組件
   */
  initialize(): void {
    if (this.apiGen.spec.components?.schemas) {
      this.apiGen.preprocessComponents(this.apiGen.spec.components.schemas);
      
      // 手動為每個 schema 生成 type alias
      Object.keys(this.apiGen.spec.components.schemas).forEach(schemaName => {
        try {
          this.apiGen.getRefAlias({ $ref: `#/components/schemas/${schemaName}` });
        } catch (error) {
          // 忽略無法生成的 schema
        }
      });
    }
  }

  /**
   * 獲取操作定義列表
   * @param filterEndpoints - 端點過濾函數
   */
  getOperationDefinitions(filterEndpoints?: any) {
    const { operationMatches } = require('../utils/http');
    return getOperationDefinitions(this.v3Doc).filter(operationMatches(filterEndpoints));
  }

  /**
   * 獲取 API 生成器實例
   */
  getApiGenerator(): ApiGenerator {
    return this.apiGen;
  }

  /**
   * 獲取 OpenAPI 文檔
   */
  getDocument(): OpenAPIV3.Document {
    return this.v3Doc;
  }

  /**
   * 獲取所有 schema 類型名稱
   */
  getSchemaTypeNames(): Set<string> {
    const schemeTypeNames = new Set<string>();
    // 這裡可以根據需要添加 schema 類型名稱的提取邏輯
    return schemeTypeNames;
  }
}