/**
 * Parser Tests
 * 単一責務: メニューアイテムの抽出とフィルタリングのロジック検証
 */

import {
  parseMenuItems,
  filterOutPremiumMenus,
  filterOutVolumeMenus,
  getFilteredMenuItems,
  type MenuItem,
} from "../parser";
import { loadFixture } from "./fixtures";

describe("Parser Tests", () => {
  let container: HTMLElement;

  beforeEach(() => {
    // DOMのセットアップ
    document.body.innerHTML = "";
    container = loadFixture("nosh-menu-page");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("parseMenuItems", () => {
    it("HTMLからメニューアイテムを正常に抽出できる", () => {
      const items = parseMenuItems(container);
      expect(items.length).toBe(4);
    });

    it("抽出されたアイテムが正しいプロパティを持つ", () => {
      const items = parseMenuItems(container);
      const item = items[0];

      expect(item).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        smiId: expect.any(Number),
        calories: expect.any(Number),
        weight: expect.any(String),
        isPremium: expect.any(Boolean),
        isVolume: expect.any(Boolean),
      });
    });

    it("最初のアイテムが「バターロール(4個)」である", () => {
      const items = parseMenuItems(container);
      expect(items[0]).toMatchObject({
        id: 77,
        name: "バターロール(4個)",
        smiId: 208,
        calories: 91,
        weight: "200",
        isPremium: false,
        isVolume: false,
      });
    });

    it("プレミアムメニューを正しく識別できる", () => {
      const items = parseMenuItems(container);
      const premiumItem = items.find((i) => i.id === 1);

      expect(premiumItem).toBeDefined();
      expect(premiumItem?.isPremium).toBe(true);
      expect(premiumItem?.name).toBe("ポルチーニ香る！銀鮭の具沢山クリーム仕立て");
    });

    it("ボリュームメニューを正しく識別できる", () => {
      const items = parseMenuItems(container);
      const volumeItem = items.find((i) => i.id === 2);

      expect(volumeItem).toBeDefined();
      expect(volumeItem?.isVolume).toBe(true);
      expect(volumeItem?.name).toBe("豪快チキンのビリヤニライス");
    });

    it("通常メニューを正しく識別できる", () => {
      const items = parseMenuItems(container);
      const normalItem = items.find((i) => i.id === 23);

      expect(normalItem).toBeDefined();
      expect(normalItem?.isPremium).toBe(false);
      expect(normalItem?.isVolume).toBe(false);
      expect(normalItem?.name).toBe("オニオングリルハンバーグ");
    });
  });

  describe("filterOutPremiumMenus", () => {
    it("プレミアムメニューを除外できる", () => {
      const items = parseMenuItems(container);
      const filtered = filterOutPremiumMenus(items);

      expect(filtered.length).toBe(3);
      expect(filtered.every((item) => !item.isPremium)).toBe(true);
    });

    it("通常メニューとボリュームメニューは残る", () => {
      const items = parseMenuItems(container);
      const filtered = filterOutPremiumMenus(items);

      const normalItem = filtered.find((i) => i.id === 23);
      const volumeItem = filtered.find((i) => i.id === 2);

      expect(normalItem).toBeDefined();
      expect(volumeItem).toBeDefined();
    });
  });

  describe("filterOutVolumeMenus", () => {
    it("ボリュームメニューを除外できる", () => {
      const items = parseMenuItems(container);
      const filtered = filterOutVolumeMenus(items);

      expect(filtered.length).toBe(3);
      expect(filtered.every((item) => !item.isVolume)).toBe(true);
    });

    it("通常メニューとプレミアムメニューは残る", () => {
      const items = parseMenuItems(container);
      const filtered = filterOutVolumeMenus(items);

      const normalItem = filtered.find((i) => i.id === 23);
      const premiumItem = filtered.find((i) => i.id === 1);

      expect(normalItem).toBeDefined();
      expect(premiumItem).toBeDefined();
    });
  });

  describe("getFilteredMenuItems", () => {
    it("デフォルトではプレミアムとボリュームメニューを除外できる", () => {
      const filtered = getFilteredMenuItems(container);

      expect(filtered.length).toBe(2);
      expect(filtered.every((item) => !item.isPremium && !item.isVolume)).toBe(true);
    });

    it("通常メニューのみが残る", () => {
      const filtered = getFilteredMenuItems(container);

      expect(filtered).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 77,
            name: "バターロール(4個)",
          }),
          expect.objectContaining({
            id: 23,
            name: "オニオングリルハンバーグ",
          }),
        ])
      );
    });

    it("excludePremium: false でプレミアムメニューを含められる", () => {
      const filtered = getFilteredMenuItems(container, {
        excludePremium: false,
        excludeVolume: true,
      });

      expect(filtered.length).toBe(3);
      expect(filtered.some((item) => item.id === 1)).toBe(true);
    });

    it("excludeVolume: false でボリュームメニューを含められる", () => {
      const filtered = getFilteredMenuItems(container, {
        excludePremium: true,
        excludeVolume: false,
      });

      expect(filtered.length).toBe(3);
      expect(filtered.some((item) => item.id === 2)).toBe(true);
    });

    it("両方のオプションを false で全メニューを取得できる", () => {
      const filtered = getFilteredMenuItems(container, {
        excludePremium: false,
        excludeVolume: false,
      });

      expect(filtered.length).toBe(4);
    });
  });
});
