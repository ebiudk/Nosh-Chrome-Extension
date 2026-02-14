/**
 * Content Script Entry Point
 * Nosh ページの読み込み時に実行され、メニュー抽出とフィルタリングを行う
 */

import { getFilteredMenuItems, parseMenuItems } from "./parser";
import { applyFilteringToDOM } from "./renderer";

/**
 * Content Script の初期化と実行
 * 単一責務: Nosh ページのメニュー要素を取得し、フィルタリング結果を适用する
 */
async function initializeMenuFiltering(): Promise<void> {
  // メニューコンテナを取得
  const menuContainer = document.querySelector("main.pg-mypage-choice.--menu-page") as HTMLElement | null;

  if (!menuContainer) {
    console.warn("[Nosh Extension] メニューコンテナが見つかりません");
    return;
  }

  try {
    // デフォルト設定でフィルタリングを実行
    // (プレミアムとボリュームメニューを除外)
    const filteredItems = getFilteredMenuItems(menuContainer, {
      excludePremium: true,
      excludeVolume: true,
    });

    // 全メニューアイテムを取得（比較用）
    const allItems = parseMenuItems(menuContainer);

    // DOM に反映
    applyFilteringToDOM(filteredItems, allItems, {
      hideFiltered: true,
      highlightNormal: true,
      addAnnotation: true,
    });

    console.log(
      `[Nosh Extension] フィルタリング完了: ${filteredItems.length}/${allItems.length} 件のメニューを表示中`
    );
  } catch (error) {
    console.error("[Nosh Extension] フィルタリング処理でエラーが発生しました:", error);
  }
}

// ページ読み込み完了時に初期化を実行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMenuFiltering);
} else {
  initializeMenuFiltering();
}

// ページ無限スクロール時の再フィルタリング（オプション）
// Nosh のページが動的に新しいメニューを読み込む場合に備える
const observer = new MutationObserver(async () => {
  try {
    const menuContainer = document.querySelector("main.pg-mypage-choice --menu-page") as HTMLElement | null;
    if (menuContainer) {
      const filteredItems = getFilteredMenuItems(menuContainer);
      const allItems = parseMenuItems(menuContainer);
      applyFilteringToDOM(filteredItems, allItems);
    }
  } catch (error) {
    console.error("[Nosh Extension] 動的フィルタリングでエラーが発生しました:", error);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
});
