import { capitalize, isQuery as testIsQuery } from '../utils';
import { getOperationName, getOverrides } from '../utils/http';
import type { OperationDefinition, GenerationOptions } from '../types';
import { supportDeepObjects } from 'oazapfts/generate';

/**
 * 端點資訊介面
 */
export interface EndpointInfo {
  operationName: string;
  argTypeName: string;
  responseTypeName: string;
  isQuery: boolean;
  verb: string;
  path: string;
  queryKeyName: string;
  queryParams: any[];
  pathParams: any[];
  isVoidArg: boolean;
  summary: string;
  contentType: string;
  hasRequestBody: boolean;
  tags: string[];
}

/**
 * 端點資訊提取器 - 專門負責從操作定義中提取端點資訊
 */
export class EndpointInfoExtractor {
  constructor(
    private options: Pick<GenerationOptions, 'operationNameSuffix' | 'argSuffix' | 'responseSuffix' | 'queryMatch' | 'endpointOverrides'>
  ) {}

  /**
   * 從操作定義列表提取端點資訊
   * @param operationDefinitions - 操作定義列表
   */
  extractEndpointInfos(operationDefinitions: OperationDefinition[]): EndpointInfo[] {
    return operationDefinitions.map((operationDefinition) => {
      return this.extractSingleEndpointInfo(operationDefinition);
    });
  }

  /**
   * 從單一操作定義提取端點資訊
   * @param operationDefinition - 操作定義
   */
  private extractSingleEndpointInfo(operationDefinition: OperationDefinition): EndpointInfo {
    const { verb, path, operation } = operationDefinition;
    const { operationNameSuffix = '', argSuffix = 'Req', responseSuffix = 'Res', queryMatch, endpointOverrides } = this.options;

    // 獲取操作名稱
    const operationName = getOperationName({ verb, path });
    const finalOperationName = operationNameSuffix ? capitalize(operationName + operationNameSuffix) : operationName;

    // 生成類型名稱
    const argTypeName = capitalize(operationName + operationNameSuffix + argSuffix);
    const responseTypeName = capitalize(operationName + operationNameSuffix + responseSuffix);

    // 判斷是否為查詢類型
    const isQuery = testIsQuery(verb, path, getOverrides(operationDefinition, endpointOverrides), queryMatch);

    // 生成查詢鍵名稱
    const queryKeyName = `${operationName.replace(/([A-Z])/g, '_$1').toUpperCase()}`;

    // 提取 OpenAPI summary
    const summary = operation.summary || `${verb.toUpperCase()} ${path}`;

    // 解析參數
    const { queryParams, pathParams, isVoidArg, hasRequestBody } = this.extractParameters(operationDefinition);

    // 提取 content type
    const contentType = this.extractContentType(operation);

    // 提取 tags
    const tags = Array.isArray(operation.tags) ? operation.tags : [];

    return {
      operationName: finalOperationName,
      argTypeName,
      responseTypeName,
      isQuery,
      verb: verb.toUpperCase(),
      path,
      queryKeyName,
      queryParams,
      pathParams,
      isVoidArg,
      summary,
      contentType,
      hasRequestBody,
      tags
    };
  }

  /**
   * 提取操作的參數資訊
   * @param operationDefinition - 操作定義
   */
  private extractParameters(operationDefinition: OperationDefinition) {
    const { operation, pathItem } = operationDefinition;

    // 解析參數
    const operationParameters = this.resolveArray(operation.parameters);
    const pathItemParameters = this.resolveArray(pathItem.parameters)
      .filter((pp) => !operationParameters.some((op) => op.name === pp.name && op.in === pp.in));

    const allParameters = supportDeepObjects([...pathItemParameters, ...operationParameters])
      .filter((param) => param.in !== 'header');

    const queryParams = allParameters.filter(param => param.in === 'query');
    const pathParams = allParameters.filter(param => param.in === 'path');

    // 檢查是否有 request body
    const hasRequestBody = !!operation.requestBody;

    // 檢查是否為 void 類型參數
    const isVoidArg = queryParams.length === 0 && pathParams.length === 0 && !operation.requestBody;

    return {
      queryParams,
      pathParams,
      isVoidArg,
      hasRequestBody
    };
  }

  /**
   * 解析參數陣列 (模擬 apiGen.resolveArray)
   */
  private resolveArray(parameters: any): any[] {
    if (!parameters) return [];
    return Array.isArray(parameters) ? parameters : [parameters];
  }

  /**
   * 提取操作的 content type
   * @param operation - 操作對象
   */
  private extractContentType(operation: any): string {
    // 檢查 requestBody 是否存在
    if (!operation.requestBody) {
      return 'application/json';
    }

    // 從 requestBody.content 中獲取第一個 content type
    const content = operation.requestBody.content;
    if (!content || typeof content !== 'object') {
      return 'application/json';
    }

    const contentTypes = Object.keys(content);
    if (contentTypes.length === 0) {
      return 'application/json';
    }

    // 返回第一個 content type
    return contentTypes[0];
  }
}