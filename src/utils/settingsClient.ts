/**
 * Settings Client
 * 設定取得・保存のクライアント側ユーティリティ
 * 単一責務: Chrome メッセージングの隠蔽と型安全性提供
 */

import { type ExtensionSettings, DEFAULT_SETTINGS } from "../types/settings";

export interface StatsData {
  totalMenuItems: number;
  filteredItems: number;
}

interface SettingsResponse {
  success: boolean;
  data?: ExtensionSettings;
  error?: string;
}

interface StatsResponse {
  success: boolean;
  data?: StatsData;
  error?: string;
}

/**
 * 現在の設定を取得
 * 
 * @returns Promise<ExtensionSettings> 設定オブジェクト
 */
export async function getSettings(): Promise<ExtensionSettings> {
  try {
    const response = (await chrome.runtime.sendMessage({
      type: "GET_SETTINGS",
    })) as SettingsResponse;

    if (response.success && response.data) {
      return { ...DEFAULT_SETTINGS, ...response.data };
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("[SettingsClient] 設定の取得に失敗しました:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * 設定を保存
 * 
 * @param settings - 保存する設定オブジェクト
 */
export async function saveSettings(settings: ExtensionSettings): Promise<void> {
  try {
    await chrome.runtime.sendMessage({
      type: "SET_SETTINGS",
      settings,
    });
  } catch (error) {
    console.error("[SettingsClient] 設定の保存に失敗しました:", error);
    throw error;
  }
}

/**
 * 統計情報を取得
 * 
 * @returns Promise<StatsData> 統計情報
 */
export async function getStats(): Promise<StatsData> {
  try {
    const response = (await chrome.runtime.sendMessage({
      type: "GET_STATS",
    })) as StatsResponse;

    if (response.success && response.data) {
      return response.data;
    }
    return { totalMenuItems: 0, filteredItems: 0 };
  } catch (error) {
    console.error("[SettingsClient] 統計の取得に失敗しました:", error);
    return { totalMenuItems: 0, filteredItems: 0 };
  }
}
