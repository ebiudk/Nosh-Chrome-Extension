/**
 * Rule Types
 * フィルタルールとその処理ロジックの型定義
 */

/**
 * ルール演算子
 */
export type RuleOperator = "includes" | "excludes" | "equals" | "greater_than" | "less_than";

/**
 * ルール条件
 */
export interface RuleCondition {
  field: "name" | "calories" | "category" | "allergens" | "isPremium" | "isVolume";
  operator: RuleOperator;
  value: string | number | number[] | boolean;
}

/**
 * フィルタルール
 */
export interface FilterRule {
  id: string;
  name: string;
  description?: string;
  conditions: RuleCondition[];
  action: "hide" | "highlight" | "annotate";
  enabled: boolean;
  priority: number;
  createdAt: number;
  updatedAt: number;
}

/**
 * ルールセット（プリセット）
 */
export interface RuleSet {
  id: string;
  name: string;
  description?: string;
  rules: FilterRule[];
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

/**
 * ルール評価結果
 */
export interface RuleEvalResult {
  ruleId: string;
  matched: boolean;
  action: "hide" | "highlight" | "annotate";
}

/**
 * ルール検証エラー
 */
export interface RuleValidationError {
  ruleId: string;
  message: string;
}
