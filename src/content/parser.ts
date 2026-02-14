/**
 * Menu Parser
 * Nosh メニュー選択画面からメニューアイテムを抽出・フィルタリング
 */

/**
 * メニューアイテムの型定義
 */
export interface MenuItem {
  id: string | number;
  name: string;
  smiId: string | number;
  calories: number;
  weight: string;
  isPremium: boolean;
  isVolume: boolean;
}

/**
 * メニューアイテムの抽出と基本フィルタリング
 * 単一責務: HTMLから生のメニューアイテムデータを抽出して型に変換する
 * 
 * @param containerElement - メニューを含むDOM要素
 * @returns MenuItem[] 抽出されたメニューアイテム
 */
export function parseMenuItems(containerElement: HTMLElement): MenuItem[] {
  const menuFoods = containerElement.querySelectorAll(".p-menu-food");
  const items: MenuItem[] = [];

  menuFoods.forEach((element) => {
    const menuFood = element as HTMLElement;
    const id = menuFood.dataset.id;
    const name = menuFood.dataset.menuFoodName;
    const smiId = menuFood.dataset.menuFoodSmiId;
    const calories = menuFood.dataset.calories;
    const weight = menuFood.dataset.menuFoodWeight;
    const isPremium = menuFood.dataset.premium !== undefined && menuFood.dataset.premium !== "";
    const isVolume = menuFood.dataset.volume !== undefined && menuFood.dataset.volume !== "";

    if (id && name && smiId && calories && weight) {
      items.push({
        id: parseInt(id, 10),
        name,
        smiId: parseInt(smiId, 10),
        calories: parseInt(calories, 10),
        weight,
        isPremium,
        isVolume,
      });
    }
  });

  return items;
}

/**
 * プレミアムメニューのフィルタリング
 * 単一責務: リストからプレミアムメニューを除外する
 * 
 * @param items - フィルタリング対象のメニューアイテム
 * @returns MenuItem[] プレミアムメニューを除外した結果
 */
export function filterOutPremiumMenus(items: MenuItem[]): MenuItem[] {
  return items.filter((item) => !item.isPremium);
}

/**
 * ボリュームメニューのフィルタリング
 * 単一責務: リストからボリュームメニューを除外する
 * 
 * @param items - フィルタリング対象のメニューアイテム
 * @returns MenuItem[] ボリュームメニューを除外した結果
 */
export function filterOutVolumeMenus(items: MenuItem[]): MenuItem[] {
  return items.filter((item) => !item.isVolume);
}

/**
 * 全フィルタリングを適用した取得
 * 単一責務: 複数のフィルタリング関数を組み合わせたパイプライン処理
 * 
 * @param containerElement - メニューを含むDOM要素
 * @param options - フィルタリングオプション
 * @returns MenuItem[] フィルタリング済みメニューアイテム
 */
export interface FilterOptions {
  excludePremium?: boolean;
  excludeVolume?: boolean;
}

export function getFilteredMenuItems(
  containerElement: HTMLElement,
  options: FilterOptions = { excludePremium: true, excludeVolume: true }
): MenuItem[] {
  let items = parseMenuItems(containerElement);

  if (options.excludePremium) {
    items = filterOutPremiumMenus(items);
  }

  if (options.excludeVolume) {
    items = filterOutVolumeMenus(items);
  }

  return items;
}
