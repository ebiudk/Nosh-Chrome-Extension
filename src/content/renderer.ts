/**
 * Menu Renderer
 * Nosh メニュー表示の更新・フィルタリング結果の適用
 */

import type { MenuItem } from "./parser";

/**
 * レンダリング設定
 */
export interface RenderOptions {
  hideFiltered?: boolean;
  highlightNormal?: boolean;
  addAnnotation?: boolean;
}

/**
 * メニューアイテムのDOMを非表示にする
 * 単一責務: 特定のメニューアイテムを DOM から非表示にする
 * 
 * @param menuItemId - 非表示にするメニューアイテムのID
 */
export function hideMenuItemById(menuItemId: string | number): void {
  const selector = `.p-menu-food[data-id="${menuItemId}"]`;
  const element = document.querySelector(selector) as HTMLElement | null;

  if (element) {
    element.style.display = "none";
    element.setAttribute("data-filtered", "true");
  }
}

/**
 * メニューアイテムのDOMを表示する
 * 単一責務: 特定のメニューアイテムを DOM に表示する
 * 
 * @param menuItemId - 表示するメニューアイテムのID
 */
export function showMenuItemById(menuItemId: string | number): void {
  const selector = `.p-menu-food[data-id="${menuItemId}"]`;
  const element = document.querySelector(selector) as HTMLElement | null;

  if (element) {
    element.style.display = "";
    element.removeAttribute("data-filtered");
  }
}

/**
 * フィルタリング済みのメニューアイテムに注釈を追加
 * 単一責務: 通常メニュー（フィルタ対象外）にマークを追加する
 * 
 * @param item - 注釈を追加するメニューアイテム
 */
export function addNormalMenuAnnotation(item: MenuItem): void {
  const selector = `.p-menu-food[data-id="${item.id}"]`;
  const element = document.querySelector(selector) as HTMLElement | null;

  if (element) {
    const infoSection = element.querySelector(".p-menu-food-info");
    
    if (infoSection && !infoSection.querySelector("[data-nosh-extension]")) {
      const badge = document.createElement("div");
      badge.setAttribute("data-nosh-extension", "true");
      badge.className = "p-menu-food-info__content --nosh-filtered-badge";
      badge.textContent = "✓ 通常メニュー";
      badge.style.cssText = `
        margin-top: 4px;
        padding: 4px 8px;
        background-color: #4CAF50;
        color: white;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
      `;
      
      infoSection.appendChild(badge);
    }
  }
}

/**
 * すべてのフィルターマークをリセット
 * 単一責務: 拡張機能が追加したマークを全削除
 */
export function resetAllAnnotations(): void {
  const badges = document.querySelectorAll("[data-nosh-extension='true']");
  badges.forEach((badge) => {
    badge.remove();
  });

  const filtered = document.querySelectorAll("[data-filtered='true']");
  filtered.forEach((element) => {
    const el = element as HTMLElement;
    el.style.display = "";
    el.removeAttribute("data-filtered");
  });
}

/**
 * フィルタリング結果を DOM に反映
 * 単一責務: フィルタリング済みメニュー一覧と除外メニュー一覧から DOM を更新
 * 
 * @param filteredItems - フィルタリング後のメニューアイテム
 * @param allItems - 全メニューアイテム
 * @param options - レンダリングオプション
 */
export function applyFilteringToDOM(
  filteredItems: MenuItem[],
  allItems: MenuItem[],
  options: RenderOptions = { hideFiltered: true, highlightNormal: true, addAnnotation: true }
): void {
  const filteredIds = new Set(filteredItems.map((item) => item.id));

  allItems.forEach((item) => {
    if (filteredIds.has(item.id)) {
      // フィルタ対象外 = 表示する
      showMenuItemById(item.id);

      if (options.highlightNormal || options.addAnnotation) {
        addNormalMenuAnnotation(item);
      }
    } else {
      // フィルタ対象 = 非表示にする
      if (options.hideFiltered) {
        hideMenuItemById(item.id);
      }
    }
  });
}
