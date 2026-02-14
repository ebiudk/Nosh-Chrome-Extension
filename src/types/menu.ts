/**
 * Menu Types
 * メニューアイテムと関連する型定義
 */

/**
 * 栄養情報
 */
export interface NutritionData {
  calories: number;
  protein: number;
  lipid: number;
  carbohydrate: number;
  fiber: number;
  sodium: number;
  sugar: number;
}

/**
 * メニューアイテム（拡張版）
 */
export interface MenuItemExtended {
  id: number;
  smiId: number;
  name: string;
  description?: string;
  weight: string;
  calories: number;
  nutrition: Partial<NutritionData>;
  category?: string;
  allergens: number[];
  isPremium: boolean;
  isVolume: boolean;
  isLimited?: boolean;
  isEventMenu?: boolean;
  imageUrl?: string;
  extraPrice?: number;
}

/**
 * メニューフィルタリング結果
 */
export interface MenuFilterResult {
  filteredItems: MenuItemExtended[];
  excludedItems: MenuItemExtended[];
  totalItems: number;
  appliedFilters: string[];
}
