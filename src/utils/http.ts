import type {
  EndpointMatcher, EndpointOverrides,
  OperationDefinition,
  ParameterDefinition,
  ParameterMatcher,
  TextMatcher,
} from '../types';
import {
  getOperationName as _getOperationName,
} from 'oazapfts/generate';


/**
 * 判斷 HTTP 狀態碼是否為成功的數據響應
 */
export function defaultIsDataResponse(code: string, includeDefault: boolean) {
  if (includeDefault && code === 'default') {
    return true;
  }
  const parsedCode = Number(code);
  return !Number.isNaN(parsedCode) && parsedCode >= 200 && parsedCode < 300;
}

/**
 * 根據 HTTP 方法和路徑生成操作名稱
 */
export function getOperationName({ verb, path }: Pick<OperationDefinition, 'verb' | 'path'>) {
  return _getOperationName(verb, path, undefined);
}




/**
 * 從路徑項目中提取標籤（tags）
 */
export function getTags({ verb, pathItem }: Pick<OperationDefinition, 'verb' | 'pathItem'>): string[] {
  return verb ? pathItem[verb]?.tags || [] : [];
}

/**
 * 創建文本匹配器函數，用於過濾操作名稱
 */
function patternMatches(pattern?: TextMatcher) {
  const filters = Array.isArray(pattern) ? pattern : [pattern];
  return function matcher(operationName: string) {
    if (!pattern) return true;
    return filters.some((filter) =>
      typeof filter === 'string' ? filter === operationName : filter?.test(operationName)
    );
  };
}

/**
 * 創建操作匹配器函數，用於過濾操作定義
 */
export function operationMatches(pattern?: EndpointMatcher) {
  const checkMatch = typeof pattern === 'function' ? pattern : patternMatches(pattern);
  return function matcher(operationDefinition: OperationDefinition) {
    if (!pattern) return true;
    const operationName = getOperationName(operationDefinition);
    return checkMatch(operationName, operationDefinition);
  };
}

/**
 * 創建參數匹配器函數，用於過濾參數定義
 */
export function argumentMatches(pattern?: ParameterMatcher) {
  const checkMatch = typeof pattern === 'function' ? pattern : patternMatches(pattern);
  return function matcher(argumentDefinition: ParameterDefinition) {
    if (!pattern || argumentDefinition.in === 'path') return true;
    const argumentName = argumentDefinition.name;
    return checkMatch(argumentName, argumentDefinition);
  };
}

/**
 * 獲取操作的覆蓋配置
 */
export function getOverrides(
  operation: OperationDefinition,
  endpointOverrides?: EndpointOverrides[]
): EndpointOverrides | undefined {
  return endpointOverrides?.find((override) => operationMatches(override.pattern)(operation));
}