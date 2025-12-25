/**
 * 生成 RTK Query 的 cache tag types 枚举文件
 * @param tags - 去重后的 tags 数组
 * @returns 生成的 TypeScript 枚举代码
 */
export function generateTagTypesFile(tags: string[]): string {
  // 如果没有 tags，生成一个空的枚举
  if (tags.length === 0) {
    return `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

export enum ECacheTagTypes {
}
`;
  }

  // 生成枚举项
  const enumEntries = tags
    .sort() // 按字母顺序排序
    .map(tag => `    ${tag} = '${tag}',`)
    .join('\n');

  return `/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

export enum ECacheTagTypes {
${enumEntries}
}
`;
}
