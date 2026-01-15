import type { OpenAPIV3 } from 'openapi-types';
import ts from 'typescript';
import { OpenApiParserService } from './openapi-parser-service';
import { EndpointInfoExtractor } from './endpoint-info-extractor';
import { generateTypesFile } from '../generators/types-generator';
import { generateRtkQueryFile } from '../generators/rtk-query-generator';
import { generateRtkEnhanceEndpointsFile } from '../generators/rtk-enhance-endpoints-generator';
import type { GenerationOptions, GenerateApiResult } from '../types';

/**
 * API 程式碼生成器 - 負責生成單一群組的 RTK Query 相關程式碼
 *
 * 設計理念：
 * - 類別化管理：使用 class 封裝邏輯
 * - RTK Query 專用：只生成 React/RTK Query 代碼
 * - 重用資源：接受外部已處理的 v3Doc，避免重複處理
 */
export class ApiCodeGenerator {
  private infoExtractor: EndpointInfoExtractor;

  constructor(
    private parserService: OpenApiParserService,
    private options: GenerationOptions
  ) {
    // 初始化端點資訊提取器
    this.infoExtractor = new EndpointInfoExtractor(options);
  }

  /**
   * 生成完整的 RTK Query 程式碼
   */
  async generate(): Promise<GenerateApiResult> {
    // 步驟 1: 獲取操作定義
    const operationDefinitions = this.parserService.getOperationDefinitions(this.options.filterEndpoints);

    // 步驟 2: 提取端點資訊
    const endpointInfos = this.infoExtractor.extractEndpointInfos(operationDefinitions);

    // 步驟 3: 生成 RTK Query 代碼
    return this.generateRtkQueryCode(endpointInfos);
  }

  /**
   * 生成 RTK Query 代碼
   */
  private generateRtkQueryCode(endpointInfos: Array<any>): GenerateApiResult {
    // 步驟 1: 生成 types 檔案 (React 模式也需要)
    const typesContent = this.generateTypes(endpointInfos);

    // 步驟 2: 生成 RTK Query 檔案
    const rtkQueryContent = generateRtkQueryFile(endpointInfos, this.options);

    // 步驟 3: 生成 enhance endpoints 檔案
    const enhanceEndpointsContent = generateRtkEnhanceEndpointsFile(endpointInfos, this.options);

    // 步驟 4: 生成 index 檔案
    const indexContent = this.generateIndex();


    // 步驟 6: 收集操作名稱
    const operationNames = endpointInfos.map(info => info.operationName);

    // 步驟 7: 收集所有 tags
    const allTags = new Set<string>();
    endpointInfos.forEach(info => {
      if (info.tags && Array.isArray(info.tags)) {
        info.tags.forEach((tag: string) => allTags.add(tag));
      }
    });

    return {
      operationNames,
      tags: Array.from(allTags),
      files: {
        types: typesContent,
        queryService: rtkQueryContent, // RTK Query 檔案
        index: indexContent,
        enhanceEndpoints: enhanceEndpointsContent // 新增的 enhance endpoints 檔案
      }
    };
  }


  /**
   * 生成 Types 檔案內容
   */
  private generateTypes(endpointInfos: Array<any>): string {
    const generatorOptions = {
      ...this.options,
      apiConfiguration: this.options.apiConfiguration || { 
        file: '@/store/webapi', 
        importName: 'WebApiConfiguration' 
      }
    };

    // 從 parser service 獲取 schema interfaces
    const apiGen = this.parserService.getApiGenerator();
    const schemaInterfaces = apiGen.aliases.reduce<Record<string, ts.InterfaceDeclaration | ts.TypeAliasDeclaration>>((curr, alias) => {
      if (ts.isInterfaceDeclaration(alias) || ts.isTypeAliasDeclaration(alias)) {
        const name = alias.name.text;
        return {
          ...curr,
          [name]: alias,
        };
      }
      return curr;
    }, {});

    // 獲取操作定義以供類型生成使用
    const operationDefinitions = this.parserService.getOperationDefinitions(this.options.filterEndpoints);

    return generateTypesFile(endpointInfos, generatorOptions, schemaInterfaces, operationDefinitions);
  }


  /**
   * 生成 Index 檔案內容
   */
  private generateIndex(): string {
    const groupKey = this.options.groupKey || '';
    const exportName = groupKey ?
      `${groupKey.charAt(0).toLowerCase() + groupKey.slice(1)}Api` :
      'api';

    return `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

export { default as ${exportName} } from "./enhanceEndpoints";
export * from "./query.generated";
export * from "./types";
`;
  }

  // /**
  //  * 獲取已解析的 parser service（供外部使用）
  //  */
  // getParserService(): OpenApiParserService {
  //   return this.parserService;
  // }
  //
  // /**
  //  * 獲取端點資訊提取器（供外部使用）
  //  */
  // getInfoExtractor(): EndpointInfoExtractor {
  //   return this.infoExtractor;
  // }
}