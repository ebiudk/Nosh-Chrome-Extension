/**
 * Popup Script
 * popup.html のインタラクション処理
 */

import { getSettings, saveSettings as saveSettingsToStorage, getStats } from "../utils/settingsClient";
import { DEFAULT_SETTINGS } from "../types/settings";

/**
 * 設定を UI に反映
 */
async function loadSettings(): Promise<void> {
  const settings = await getSettings();

  const excludePremiumCheckbox = document.getElementById("excludePremium") as HTMLInputElement;
  const excludeVolumeCheckbox = document.getElementById("excludeVolume") as HTMLInputElement;

  if (excludePremiumCheckbox) {
    excludePremiumCheckbox.checked = settings.excludePremium;
  }

  if (excludeVolumeCheckbox) {
    excludeVolumeCheckbox.checked = settings.excludeVolume;
  }
}

/**
 * 設定を保存
 */
async function saveSettings(): Promise<void> {
  const excludePremiumCheckbox = document.getElementById("excludePremium") as HTMLInputElement;
  const excludeVolumeCheckbox = document.getElementById("excludeVolume") as HTMLInputElement;

  const currentSettings = await getSettings();

  const settings = {
    ...currentSettings,
    excludePremium: excludePremiumCheckbox?.checked ?? true,
    excludeVolume: excludeVolumeCheckbox?.checked ?? true,
  };

  await saveSettingsToStorage(settings);
}

/**
 * 統計情報を更新
 */
async function updateStats(): Promise<void> {
  const stats = await getStats();

  const totalItemsEl = document.getElementById("totalItems");
  const filteredItemsEl = document.getElementById("filteredItems");
  const excludedItemsEl = document.getElementById("excludedItems");

  if (totalItemsEl) totalItemsEl.textContent = String(stats.totalMenuItems);
  if (filteredItemsEl) filteredItemsEl.textContent = String(stats.filteredItems);
  if (excludedItemsEl) excludedItemsEl.textContent = String(stats.totalMenuItems - stats.filteredItems);
}

/**
 * Popup 初期化
 */
document.addEventListener("DOMContentLoaded", () => {
  // 設定を読み込む
  loadSettings();

  // 統計情報を更新
  updateStats();

  // チェックボックスのリスナー
  const excludePremiumCheckbox = document.getElementById("excludePremium") as HTMLInputElement;
  const excludeVolumeCheckbox = document.getElementById("excludeVolume") as HTMLInputElement;

  if (excludePremiumCheckbox) {
    excludePremiumCheckbox.addEventListener("change", saveSettings);
  }

  if (excludeVolumeCheckbox) {
    excludeVolumeCheckbox.addEventListener("change", saveSettings);
  }

  // リセットボタン
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      if (confirm("フィルタリングをリセットしていいですか？")) {
        await saveSettingsToStorage(DEFAULT_SETTINGS);
        await loadSettings();
      }
    });
  }

  // 詳細設定ボタン
  const optionsBtn = document.getElementById("optionsBtn");
  if (optionsBtn) {
    optionsBtn.addEventListener("click", () => {
      chrome.runtime.openOptionsPage();
      window.close();
    });
  }
});
