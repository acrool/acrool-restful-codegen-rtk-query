import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { generateApi } from './generate';
import type { CommonOptions, ConfigFile, GenerationOptions, OutputFileOptions } from './types';
import { isValidUrl, prettify } from './utils';
import camelCase from 'lodash.camelcase';
export type { OutputFilesConfig, ConfigFile } from './types';

const require = createRequire(__filename);


// 從路徑中提取分類名稱
function getGroupNameFromPath(path: string, pattern: RegExp): string {
  // console.log('pattern', pattern);

  const match = path.match(pattern);
  // console.log('match', path, match);

  if (match && match[1]) {
    return camelCase(match[1]);
  }
  return 'common';
}



export async function generateEndpoints(options: GenerationOptions): Promise<string | void> {
  const schemaLocation = options.schemaFile;

  const schemaAbsPath = isValidUrl(options.schemaFile)
    ? options.schemaFile
    : path.resolve(process.cwd(), schemaLocation);

  const sourceCode = await enforceOazapftsTsVersion(async () => {
    return generateApi(schemaAbsPath, options);
  });
  const { outputFile, prettierConfigFile } = options;
  if (outputFile) {
    fs.writeFileSync(
      path.resolve(process.cwd(), outputFile),
      await prettify(outputFile, sourceCode, prettierConfigFile)
    );
  } else {
    return await prettify(null, sourceCode, prettierConfigFile);
  }
}


export function parseConfig(fullConfig: ConfigFile) {
  const outFiles: (CommonOptions & OutputFileOptions)[] = [];

  if ('outputFiles' in fullConfig) {
    const { outputFiles, ...commonConfig } = fullConfig;

    // 讀取 OpenAPI 文檔
    const openApiDoc = JSON.parse(fs.readFileSync(fullConfig.schemaFile, 'utf-8'));
    const paths = Object.keys(openApiDoc.paths);


    // 從配置中獲取分類規則
    const [outputPath, config] = Object.entries(outputFiles)[0];
    const patterns = config.groupMatch;

    const filterEndpoint = config.filterEndpoint;
    

      const pattern = patterns;
      // 根據路徑自動分類
      const groupedPaths = paths.reduce((acc, path) => {

        const groupName = getGroupNameFromPath(path, pattern);
        if (!acc[groupName]) {
          acc[groupName] = [];
        }
        acc[groupName].push(path);
        return acc;
      }, {} as Record<string, string[]>);

      // 為每個分類生成配置
      Object.entries(groupedPaths).forEach(([groupName, paths]) => {
        const finalOutputPath = outputPath.replace('$1', groupName);

        const filterEndpoints = filterEndpoint(groupName);
        outFiles.push({
          ...commonConfig,
          outputFile: finalOutputPath,
          filterEndpoints: [filterEndpoints],
        });
      });

  } else {
    outFiles.push(fullConfig);
  }
  return outFiles;
}

/**
 * Enforces `oazapfts` to use the same TypeScript version as this module itself uses.
 * That should prevent enums from running out of sync if both libraries use different TS versions.
 */
function enforceOazapftsTsVersion<T>(cb: () => T): T {
  const ozTsPath = require.resolve('typescript', { paths: [require.resolve('oazapfts')] });
  const tsPath = require.resolve('typescript');
  const originalEntry = require.cache[ozTsPath];
  try {
    require.cache[ozTsPath] = require.cache[tsPath];
    return cb();
  } finally {
    if (originalEntry) {
      require.cache[ozTsPath] = originalEntry;
    } else {
      delete require.cache[ozTsPath];
    }
  }
}
