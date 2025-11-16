import camelCase from 'lodash.camelcase';

/**
 * 群組配置介面
 */
export interface GroupConfig {
  outputDir: string;
  groupKeyMatch: (path: string) => string | null;
  filterEndpoint?: (operationName: string, path: string, groupKey: string) => boolean;
  queryMatch?: (operationName: string) => boolean;
}

/**
 * 群組信息介面
 */
export interface GroupInfo {
  groupKey: string;
  paths: string[];
  outputPath: string;
}

/**
 * 群組服務 - 負責處理 API 路徑分組
 */
export class GroupService {
  /**
   * 根據配置對路徑進行分組
   * @param paths - API 路徑陣列
   * @param config - 群組配置
   */
  groupPaths(paths: string[], config: GroupConfig): Record<string, GroupInfo> {
    const { groupKeyMatch, outputDir } = config;
    
    const groupedPaths = paths.reduce((acc, path) => {
      const rawGroupKey = groupKeyMatch(path);
      const groupKey = rawGroupKey ? camelCase(rawGroupKey) : '_common';
      
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(path);
      return acc;
    }, {} as Record<string, string[]>);

    // 轉換為 GroupInfo 格式
    const result: Record<string, GroupInfo> = {};
    for (const [groupKey, paths] of Object.entries(groupedPaths)) {
      result[groupKey] = {
        groupKey,
        paths,
        outputPath: `${outputDir}/${groupKey}/query.service.ts`
      };
    }

    return result;
  }

  /**
   * 為特定群組建立篩選函數
   * @param groupKey - 群組鍵
   * @param config - 群組配置
   */
  createGroupFilter(
    groupKey: string,
    config: GroupConfig
  ): (operationName: string, operationDefinition: any) => boolean {
    return (operationName: string, operationDefinition: any) => {
      const path = operationDefinition.path;

      // 檢查路徑是否匹配當前分組
      const pathGroupKey = camelCase(config.groupKeyMatch(path) || '');
      if (pathGroupKey !== groupKey && (pathGroupKey || '_common') !== groupKey) {
        return false;
      }

      // 使用 filterEndpoint 進行額外篩選
      if (config.filterEndpoint) {
        return config.filterEndpoint(operationName, path, groupKey);
      }

      return true;
    };
  }
}