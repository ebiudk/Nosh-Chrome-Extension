/**
 * Filter Engine
 * フィルタルールの実行と評価を行う
 */

import type { RuleCondition, RuleOperator, FilterRule } from "../types/rule";
import type { MenuItemExtended } from "../types/menu";

/**
 * ルール条件を評価
 * 単一責務: 単一の条件とメニューアイテムを比較して真偽値を返す
 * 
 * @param item - 評価するメニューアイテム
 * @param condition - 評価する条件
 * @returns boolean 条件が満たされているかどうか
 */
export function evaluateCondition(item: MenuItemExtended, condition: RuleCondition): boolean {
  const value = (item as Record<string, any>)[condition.field];

  switch (condition.operator) {
    case "includes":
      if (typeof value === "string" && typeof condition.value === "string") {
        return value.toLowerCase().includes(condition.value.toLowerCase());
      }
      return false;

    case "excludes":
      if (typeof value === "string" && typeof condition.value === "string") {
        return !value.toLowerCase().includes(condition.value.toLowerCase());
      }
      return false;

    case "equals":
      return value === condition.value;

    case "greater_than":
      if (typeof value === "number" && typeof condition.value === "number") {
        return value > condition.value;
      }
      return false;

    case "less_than":
      if (typeof value === "number" && typeof condition.value === "number") {
        return value < condition.value;
      }
      return false;

    default:
      return false;
  }
}

/**
 * ルールを評価
 * 単一責務: 複数の条件をすべて評価し、ルール全体が満たされているかチェック
 * 
 * @param item - 評価するメニューアイテム
 * @param rule - 評価するルール
 * @returns boolean ルールが満たされているかどうか
 */
export function evaluateRule(item: MenuItemExtended, rule: FilterRule): boolean {
  if (!rule.enabled) {
    return false;
  }

  // AND 条件：すべての条件を満たす必要がある
  return rule.conditions.every((condition) => evaluateCondition(item, condition));
}

/**
 * ルールセットを評価
 * 単一責務: 複数のルールを評価して、最優先度の一致するアクションを返す
 * 
 * @param item - 評価するメニューアイテム
 * @param rules - 評価するルール配列
 * @returns アクション（hide/highlight/annotate）またはnull
 */
export function evaluateRules(item: MenuItemExtended, rules: FilterRule[]): string | null {
  // 優先度の高い順（降順）にソート
  const sortedRules = [...rules].sort((a, b) => b.priority - a.priority);

  for (const rule of sortedRules) {
    if (evaluateRule(item, rule)) {
      return rule.action;
    }
  }

  return null;
}

/**
 * フィルター実行
 * 単一責務: メニューアイテムのリストにルールセットを適用
 * 
 * @param items - フィルタリング対象のメニューアイテム
 * @param rules - 適用するルール配列
 * @returns フィルタリング結果（アイテムごとのアクション）
 */
export function applyFilters(
  items: MenuItemExtended[],
  rules: FilterRule[]
): Map<string | number, { action: string | null; item: MenuItemExtended }> {
  const results = new Map<string | number, { action: string | null; item: MenuItemExtended }>();

  items.forEach((item) => {
    const action = evaluateRules(item, rules);
    results.set(item.id, { action, item });
  });

  return results;
}

/**
 * 隠すべきアイテムをフィルタリング
 * 単一責務: "hide" アクションに該当するアイテムを抽出
 * 
 * @param filterResults - フィルタリング結果
 * @returns 隠すべきアイテムの ID リスト
 */
export function getHiddenItems(
  filterResults: Map<string | number, { action: string | null; item: MenuItemExtended }>
): (string | number)[] {
  const hidden: (string | number)[] = [];

  filterResults.forEach((result, itemId) => {
    if (result.action === "hide") {
      hidden.push(itemId);
    }
  });

  return hidden;
}

/**
 * ハイライトすべきアイテムをフィルタリング
 * 単一責務: "highlight" アクションに該当するアイテムを抽出
 * 
 * @param filterResults - フィルタリング結果
 * @returns ハイライトすべきアイテムの ID リスト
 */
export function getHighlightedItems(
  filterResults: Map<string | number, { action: string | null; item: MenuItemExtended }>
): (string | number)[] {
  const highlighted: (string | number)[] = [];

  filterResults.forEach((result, itemId) => {
    if (result.action === "highlight") {
      highlighted.push(itemId);
    }
  });

  return highlighted;
}

/**
 * 注釈を追加すべきアイテムをフィルタリング
 * 単一責務: "annotate" アクションに該当するアイテムを抽出
 * 
 * @param filterResults - フィルタリング結果
 * @returns 注釈を追加すべきアイテムの ID リスト
 */
export function getAnnotatedItems(
  filterResults: Map<string | number, { action: string | null; item: MenuItemExtended }>
): (string | number)[] {
  const annotated: (string | number)[] = [];

  filterResults.forEach((result, itemId) => {
    if (result.action === "annotate") {
      annotated.push(itemId);
    }
  });

  return annotated;
}
