import path from 'node:path';
import ts from 'typescript';
import type { OpenAPIV3 } from 'openapi-types';
import { OpenApiService } from './openapi-service';
import { GroupService, type GroupConfig } from './group-service';
import { FileWriterService, type FileWriteResult } from './file-writer-service';
import { OpenApiParserService } from './openapi-parser-service';
import { generateCommonTypesFile } from '../generators/common-types-generator';
import { generateComponentSchemaFile } from '../generators/component-schema-generator';
import { generateDoNotModifyFile } from '../generators/do-not-modify-generator';
import type { GenerationOptions, CommonOptions } from '../types';
import { ApiCodeGenerator } from './api-code-generator';
import { generateUtilsFile } from '../generators/utils-generator';
import { generateTagTypesFile } from '../generators/tag-types-generator';

/**
 * 統一代碼生成器選項
 */
export interface UnifiedGenerationOptions extends CommonOptions {
  outputFiles: GroupConfig;
  remoteFile?: string;
}

/**
 * 統一代碼生成器結果
 */
export interface UnifiedGenerationResult {
  success: boolean;
  writtenFiles: FileWriteResult[];
  errors: Error[];
  generatedGroups: string[];
}

/**
 * 統一代碼生成器
 * 
 * 設計理念：
 * - 統一管理所有生成流程
 * - 內建 schema 處理和存儲
 * - 提供準備、生成、發佈的分階段操作
 * - 避免重複初始化和處理
 * 
 * 使用方式：
 * 1. prepare() - 準備階段：解析 schema、初始化服務
 * 2. generateContent() - 生成階段：產生所有內容但不寫檔
 * 3. release() - 發佈階段：統一寫入所有檔案
 */
export class UnifiedCodeGenerator {
  private _options: UnifiedGenerationOptions;

  private openApiService = new OpenApiService();
  private groupService = new GroupService();
  private fileWriterService = new FileWriterService();
  
  // 內部狀態存儲
  private openApiDoc: OpenAPIV3.Document | null = null;
  private parserService: OpenApiParserService | null = null;
  private schemaInterfaces: Record<string, ts.InterfaceDeclaration | ts.TypeAliasDeclaration> = {};
  private actualSchemaFile: string = '';
  
  // 生成內容存儲
  private generatedContent: {
    groups: Array<{
      groupKey: string;
      outputPath: string;
      content: any;
    }>;
    commonTypes: string;
    componentSchema: string;
    doNotModify: string;
    utils: string;
    tagTypes: string;
  } = {
    groups: [],
    commonTypes: '',
    componentSchema: '',
    doNotModify: '',
    utils: '',
    tagTypes: ''
  };

  // 收集所有 tags
  private allTags: Set<string> = new Set();


  constructor(options: UnifiedGenerationOptions) {
    this._options = options;
  }



  /**
   * 一次性生成（整合所有階段）
   */
  async generateAll(): Promise<UnifiedGenerationResult> {
    await this.prepare();

    // 生成各API文件
    await this.generateApi();
    // await this.generateQuery();

    // 生成共用
    this.generateCommonTypesContent()
    this.generateSchemaContent()
    this.generateUtilsContent()
    this.generateDoNotModifyContent()
    this.generateTagTypesContent()

    return await this.release();
  }



  /**
   * 準備階段：解析 schema 並初始化所有服務
   */
  async prepare(): Promise<void> {
    // console.log('UnifiedCodeGenerator: 準備階段開始...');
    
    // 步驟 1: 解析實際的 schema 檔案路徑
    this.actualSchemaFile = this._options.schemaFile;
    if (this._options.remoteFile) {
      this.actualSchemaFile = await this.openApiService.downloadSchema(
        this._options.remoteFile,
        this._options.schemaFile
      );
    }

    // 步驟 2: 獲取 OpenAPI 文檔（只初始化一次）
    this.openApiDoc = await this.openApiService.getDocument(
      this.actualSchemaFile,
      this._options.httpResolverOptions
    );

    // 步驟 3: 初始化解析器服務並處理 schema
    this.parserService = new OpenApiParserService(this.openApiDoc, this._options);
    this.parserService.initialize();

    // 步驟 4: 提取並儲存 schema interfaces
    const apiGen = this.parserService.getApiGenerator();
    this.schemaInterfaces = apiGen.aliases.reduce<Record<string, ts.InterfaceDeclaration | ts.TypeAliasDeclaration>>((curr, alias) => {
      if (ts.isInterfaceDeclaration(alias) || ts.isTypeAliasDeclaration(alias)) {
        const name = alias.name.text;
        return {
          ...curr,
          [name]: alias,
        };
      }
      return curr;
    }, {});

    // console.log('UnifiedCodeGenerator: 準備階段完成');
  }



  /**
   * 生成階段：產生所有內容但不寫檔
   */
  async generateApi(): Promise<void> {
    if (!this.openApiDoc || !this.parserService) {
      throw new Error('請先調用 prepare() 方法');
    }

    // console.log('UnifiedCodeGenerator: 內容生成階段開始...');

    // 獲取所有 API 接口Path並分組
    const paths = this.openApiService.getPaths(this.openApiDoc);
    const groupInfos = this.groupService.groupPaths(paths, this._options.outputFiles);

    // 為每個群組生成內容
    for (const groupInfo of Object.values(groupInfos)) {
      try {
        const groupContent = await this.generateApiGroupContent(
          this._options,
          groupInfo
        );

        // 檢查群組是否有任何有效的 endpoint
        if (groupContent.operationNames.length > 0) {
          this.generatedContent.groups.push({
            groupKey: groupInfo.groupKey,
            outputPath: groupInfo.outputPath,
            content: groupContent
          });

          // 收集此群組的所有 tags
          if (groupContent.tags && Array.isArray(groupContent.tags)) {
            groupContent.tags.forEach((tag: string) => this.allTags.add(tag));
          }
        }
        // 如果沒有任何 endpoint，則跳過此群組，不創建資料夾
      } catch (error) {
        throw new Error(`群組 ${groupInfo.groupKey} 生成失敗: ${error}`);
      }
    }

    // console.log('UnifiedCodeGenerator: 內容生成階段完成');
  }



  /**
   * 生成 common types
   */
  private async generateCommonTypesContent(): Promise<void> {
    this.generatedContent.commonTypes = generateCommonTypesFile();
  }

  /**
   * 生成Schema
   */
  private async generateSchemaContent(): Promise<void> {
    this.generatedContent.componentSchema = generateComponentSchemaFile(this.schemaInterfaces);
  }

  /**
   * 生成 DO_NOT_MODIFY.md
   */
  private async generateDoNotModifyContent(): Promise<void> {
    this.generatedContent.doNotModify = generateDoNotModifyFile();
  }


  /**
   * 生成 Utils Function
   */
  private async generateUtilsContent(): Promise<void> {
    this.generatedContent.utils = generateUtilsFile();
  }

  /**
   * 生成 Tag Types
   */
  private async generateTagTypesContent(): Promise<void> {
    const tagsArray = Array.from(this.allTags);
    this.generatedContent.tagTypes = generateTagTypesFile(tagsArray);
  }




  /**
   * 發佈階段：統一寫入所有檔案
   */
  async release(): Promise<UnifiedGenerationResult> {
    const results: FileWriteResult[] = [];
    const errors: Error[] = [];
    const generatedGroups: string[] = [];

    // console.log('UnifiedCodeGenerator: 發佈階段開始...');

    try {
      // 寫入群組檔案
      for (const group of this.generatedContent.groups) {
        try {
          if (group.content?.files) {
            const groupOutputDir = path.dirname(group.outputPath);
            // RTK Query 模式 (唯一支援模式)
            const groupResults = await this.fileWriterService.writeGroupFiles(
              groupOutputDir,
              {
                types: group.content.files.types,
                queryService: group.content.files.queryService,
                enhanceEndpoints: group.content.files.enhanceEndpoints,
                index: group.content.files.index
              }
            );

            results.push(...groupResults);
            generatedGroups.push(group.groupKey);
          }
        } catch (error) {
          errors.push(new Error(`寫入群組 ${group.groupKey} 失敗: ${error}`));
        }
      }

      // 寫入共用檔案
      const outputDir = this.generatedContent.groups[0] ? 
        path.dirname(path.dirname(this.generatedContent.groups[0].outputPath)) : 
        './generated';

      // 寫入共用檔案 (包含 DO_NOT_MODIFY.md)
      if (this.generatedContent.commonTypes || this.generatedContent.doNotModify || this.generatedContent.utils) {
        const sharedResults = await this.fileWriterService.writeSharedFiles(
          outputDir,
          {
            commonTypes: this.generatedContent.commonTypes || undefined,
            doNotModify: this.generatedContent.doNotModify || undefined,
            utils: this.generatedContent.utils || undefined
          }
        );
        results.push(...sharedResults);
      }

      // 寫入 tagTypes.ts
      if (this.generatedContent.tagTypes) {
        const tagTypesResult = await this.fileWriterService.writeFile(
          path.join(outputDir, 'tagTypes.ts'),
          this.generatedContent.tagTypes
        );
        results.push(tagTypesResult);
      }

      // 寫入 component schema
      if (this.generatedContent.componentSchema) {
        const schemaResults = await this.fileWriterService.writeSchemaFile(
          outputDir,
          this.generatedContent.componentSchema
        );
        results.push(...schemaResults);
      }

      // 生成主 index.ts 檔案
      const mainIndexContent = this.generateMainIndex(generatedGroups);
      const mainIndexResult = await this.fileWriterService.writeFile(
        path.join(outputDir, 'index.ts'),
        mainIndexContent
      );
      results.push(mainIndexResult);

    } catch (error) {
      errors.push(error as Error);
    }

    // console.log('UnifiedCodeGenerator: 發佈階段完成');

    return {
      success: errors.length === 0,
      writtenFiles: results,
      errors,
      generatedGroups
    };
  }


  /**
   * 為單一群組生成內容
   */
  private async generateApiGroupContent(
    options: UnifiedGenerationOptions,
    groupInfo: { groupKey: string; paths: string[]; outputPath: string }
  ): Promise<any> {
    const { outputFiles, ...commonConfig } = options;

    // 建立群組特定的生成選項
    const groupOptions: GenerationOptions = {
      ...commonConfig,
      schemaFile: this.actualSchemaFile,
      outputFile: groupInfo.outputPath,
      sharedTypesFile: `${outputFiles.outputDir}/common-types.ts`,
      filterEndpoints: this.groupService.createGroupFilter(groupInfo.groupKey, outputFiles),
      queryMatch: outputFiles.queryMatch,
      groupKey: groupInfo.groupKey,
    };

    // 使用新的 ApiCodeGenerator 生成程式碼，重用已處理的 v3Doc
    if (!this.openApiDoc || !this.parserService) {
      throw new Error('OpenAPI 文檔未初始化，請先調用 prepare()');
    }
    
    const apiGenerator = new ApiCodeGenerator(this.parserService, groupOptions);
    const result = await apiGenerator.generate();


    return result;
  }

  /**
   * 生成主 index.ts 檔案
   */
  private generateMainIndex(generatedGroups: string[]): string {
    const exports = generatedGroups.map(groupKey => `export * from "./${groupKey}";`).join('\n');

    return `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

${exports}
`;
  }

}