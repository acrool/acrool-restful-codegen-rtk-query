#!/usr/bin/env node

import program from 'commander';
import { createRequire } from 'node:module';
import { cleanOutputDirectory, setupTypeScriptSupport, validateConfigFile, validateTypeScriptSupport } from './utils';
import { dirname, resolve } from 'node:path';
import { generateEndpoints } from '../index';

const require = createRequire(__filename);





/**
 * 執行代碼生成流程
 * 載入設定檔並驗證是否包含 outputFiles 屬性，清理輸出目錄，然後執行端點生成
 * @param {string} configFile - 設定檔案路徑
 */
export async function runGeneration(configFile: string): Promise<void> {
  const absoluteConfigPath = resolve(process.cwd(), configFile);
  process.chdir(dirname(absoluteConfigPath));

  const unparsedConfig = require(absoluteConfigPath);
  const config = unparsedConfig.default ?? unparsedConfig;

  if (!('outputFiles' in config)) {
    console.error('Configuration must include "outputFiles" property. Single file output is no longer supported.');
    process.exit(1);
  }

  // 清理輸出目錄
  if (config.outputFiles && config.outputFiles.outputDir) {
    cleanOutputDirectory(config.outputFiles.outputDir);
  }

  try {
    console.log('Generating multiple outputs...');
    await generateEndpoints(config);
    console.log('Done');
  } catch (err) {
    console.error('Generation failed:', err);
    process.exit(1);
  }
}


/**
 * CLI 主要執行函數
 * 設置 TypeScript 支援、解析命令列參數、驗證設定檔並執行代碼生成
 */
async function main(): Promise<void> {
  const meta = require('../../package.json');
  const hasTypeScriptSupport = setupTypeScriptSupport();

  program
    .version(meta.version)
    .usage('<path/to/config.js>')
    .parse(process.argv);

  const configFile = program.args[0];

  if (program.args.length === 0) {
    program.help();
    return;
  }

  validateConfigFile(configFile);
  validateTypeScriptSupport(configFile, hasTypeScriptSupport);

  await runGeneration(configFile);
}

main().catch((err) => {
  console.error('CLI execution failed:', err);
  process.exit(1);
});