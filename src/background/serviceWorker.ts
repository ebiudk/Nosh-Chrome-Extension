/**
 * Service Worker
 * Chrome 拡張機能のバックグラウンド処理を担当
 * 役割：状態管理、メッセージ処理、イベントリスナー
 */

import { ExtensionSettings, DEFAULT_SETTINGS } from "../types/settings";

/**
 * 設定を取得
 * 単一責務: ストレージから現在の拡張機能設定を取得
 */
async function getSettings(): Promise<ExtensionSettings> {
  const result = await chrome.storage.local.get("settings");
  return { ...DEFAULT_SETTINGS, ...(result.settings || {}) };
}

/**
 * 設定を保存
 * 単一責務: 拡張機能設定をストレージに保存
 */
async function saveSettings(settings: ExtensionSettings): Promise<void> {
  await chrome.storage.local.set({ settings });
}

/**
 * メッセージリスナー
 * Content Script や Popup から送信されたメッセージを処理
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    try {
      if (message.type === "GET_SETTINGS") {
        const settings = await getSettings();
        sendResponse({ success: true, data: settings });
      } else if (message.type === "SET_SETTINGS") {
        await saveSettings(message.settings);
        sendResponse({ success: true });
      } else if (message.type === "GET_STATS") {
        // フィルタリング統計情報を取得（将来実装）
        const stats = {
          totalMenuItems: 0,
          filteredItems: 0,
        };
        sendResponse({ success: true, data: stats });
      } else {
        sendResponse({ success: false, error: "Unknown message type" });
      }
    } catch (error) {
      console.error("[Service Worker] メッセージ処理エラー:", error);
      sendResponse({ success: false, error: String(error) });
    }
  })();

  // 非同期レスポンスを使用するため true を返す
  return true;
});

/**
 * インストール時の処理
 */
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    // デフォルト設定を保存
    await saveSettings(DEFAULT_SETTINGS);
    console.log("[Service Worker] 拡張機能がインストールされました");

    // オプションページを開く（オプション）
    // chrome.runtime.openOptionsPage();
  } else if (details.reason === "update") {
    console.log("[Service Worker] 拡張機能が更新されました");
  }
});

/**
 * アイコンクリック時の処理
 * Popup を開く（manifest.json の action で設定）
 */
chrome.action.onClicked.addListener((tab) => {
  // popup が設定されているため、自動的に開く
  console.log("[Service Worker] アクションアイコンがクリックされました");
});
