import ts from 'typescript';


/**
 * 產生 Utils function 內容
 * @param interfaces
 */
export function generateUtilsFile() {

  // 分析接口內容以找出需要從 shared-types 導入的類型
  return `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
    
/**
* Clear undefined in object
*/
export function withoutUndefined(obj?: Record<string, any>) {
  if(typeof obj === 'undefined') return;
  return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
  );
}

`
}

/**
 * 大寫底線字串 轉 小駝峰
 * @param str
 */
export function toCamelCase(str: string): string {
  return str.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}