import { UnifiedCodeGenerator, type UnifiedGenerationOptions, type UnifiedGenerationResult } from './services/unified-code-generator';

export type { OutputFilesConfig, ConfigFile } from './types';


/**
 * 產生 Endpoints - 直接使用統一代碼生成器
 * @param options - 端點生成選項
 */
export async function generateEndpoints(options: UnifiedGenerationOptions): Promise<string | void> {
  const generator = new UnifiedCodeGenerator(options);

  const result = await generator.generateAll();
  
  if (!result.success) {
    if (result.errors.length > 0) {
      throw result.errors[0];
    }
  }
  return;
}
