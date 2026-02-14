/**
 * Options Script
 * options.html の設定処理
 */

import { getSettings, saveSettings as saveSettingsToStorage } from "../utils/settingsClient";
import { DEFAULT_SETTINGS } from "../types/settings";

/**
 * 設定を UI に反映
 */
async function loadSettings(): Promise<void> {
  const settings = await getSettings();

  const excludePremiumCheckbox = document.getElementById("excludePremium") as HTMLInputElement;
  const excludeVolumeCheckbox = document.getElementById("excludeVolume") as HTMLInputElement;
  const enableLLMCheckbox = document.getElementById("enableLLM") as HTMLInputElement;
  const llmProviderSelect = document.getElementById("llmProvider") as HTMLSelectElement;
  const apiKeyInput = document.getElementById("apiKey") as HTMLInputElement;

  if (excludePremiumCheckbox) {
    excludePremiumCheckbox.checked = settings.excludePremium;
  }

  if (excludeVolumeCheckbox) {
    excludeVolumeCheckbox.checked = settings.excludeVolume;
  }

  if (enableLLMCheckbox) {
    enableLLMCheckbox.checked = settings.enableLLM;
    updateLLMVisibility(settings.enableLLM);
  }

  if (llmProviderSelect) {
    llmProviderSelect.value = settings.llmProvider || "";
  }

  if (apiKeyInput && settings.apiKey) {
    apiKeyInput.value = settings.apiKey;
  }
}

/**
 * LLM 設定の表示/非表示を切り替え
 */
function updateLLMVisibility(enabled: boolean): void {
  const llmSettings = document.getElementById("llmSettings") as HTMLElement | null;
  const llmApiKey = document.getElementById("llmApiKey") as HTMLElement | null;

  if (llmSettings) {
    llmSettings.style.display = enabled ? "block" : "none";
  }

  if (llmApiKey) {
    llmApiKey.style.display = enabled ? "block" : "none";
  }
}

/**
 * 設定を保存
 */
async function saveSettings(): Promise<void> {
  const excludePremiumCheckbox = document.getElementById("excludePremium") as HTMLInputElement;
  const excludeVolumeCheckbox = document.getElementById("excludeVolume") as HTMLInputElement;
  const enableLLMCheckbox = document.getElementById("enableLLM") as HTMLInputElement;
  const llmProviderSelect = document.getElementById("llmProvider") as HTMLSelectElement;
  const apiKeyInput = document.getElementById("apiKey") as HTMLInputElement;

  const currentSettings = await getSettings();

  const settings = {
    ...currentSettings,
    excludePremium: excludePremiumCheckbox?.checked ?? true,
    excludeVolume: excludeVolumeCheckbox?.checked ?? true,
    enableLLM: enableLLMCheckbox?.checked ?? false,
    llmProvider: enableLLMCheckbox?.checked ? (llmProviderSelect?.value as any || null) : null,
    apiKey: enableLLMCheckbox?.checked && apiKeyInput?.value ? apiKeyInput.value : null,
  };

  try {
    await saveSettingsToStorage(settings);
    showMessage("設定が保存されました", "success");
  } catch (error) {
    showMessage("設定の保存に失敗しました", "error");
  }
}

/**
 * メッセージを表示
 */
function showMessage(text: string, type: "success" | "error"): void {
  const messageEl = document.getElementById("message") as HTMLElement | null;

  if (messageEl) {
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;

    setTimeout(() => {
      messageEl.className = "message";
    }, 3000);
  }
}

/**
 * Options 初期化
 */
document.addEventListener("DOMContentLoaded", () => {
  // 設定を読み込む
  loadSettings();

  // 保存ボタン
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", saveSettings);
  }

  // デフォルトに戻すボタン
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      if (confirm("すべての設定をデフォルトに戻しますか？")) {
        try {
          await saveSettingsToStorage(DEFAULT_SETTINGS);
          await loadSettings();
          showMessage("デフォルト設定に戻しました", "success");
        } catch (error) {
          showMessage("リセットに失敗しました", "error");
        }
      }
    });
  }

  // キャッシュクリアボタン
  const clearDataBtn = document.getElementById("clearDataBtn");
  if (clearDataBtn) {
    clearDataBtn.addEventListener("click", async () => {
      if (confirm("すべてのキャッシュをクリアしますか？")) {
        try {
          await chrome.storage.local.clear();
          showMessage("キャッシュをクリアしました", "success");
          await loadSettings();
        } catch (error) {
          showMessage("キャッシュのクリアに失敗しました", "error");
        }
      }
    });
  }

  // LLM チェックボックス
  const enableLLMCheckbox = document.getElementById("enableLLM") as HTMLInputElement | null;
  if (enableLLMCheckbox) {
    enableLLMCheckbox.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      updateLLMVisibility(target.checked);
    });
  }
});
