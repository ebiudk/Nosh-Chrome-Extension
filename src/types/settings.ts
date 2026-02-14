/**
 * Settings Types
 * 設定関連の型定義とデフォルト設定
 */

export interface ExtensionSettings {
  excludePremium: boolean;
  excludeVolume: boolean;
  enableLLM: boolean;
  llmProvider: "openai" | "anthropic" | null;
  apiKey: string | null;
}

export const DEFAULT_SETTINGS: ExtensionSettings = {
  excludePremium: true,
  excludeVolume: true,
  enableLLM: false,
  llmProvider: null,
  apiKey: null,
};
