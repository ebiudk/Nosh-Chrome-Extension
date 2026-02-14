/**
 * Test Fixtures
 * fixtureHTMLの読み込みを提供
 */

const fixtures: Record<string, string> = {
  "nosh-menu-page": `<main class="pg-mypage-choice --menu-page">
        
        <div>
            <div class="u-display-l--none --s-sticky jsMenuStatusTop" style="top: 166.188px;">
                <section class="p-menu-status">
                    <a href=""></a>

                    <p>
                        2026年2月28日のお届けメニュー
                    </p>

                    <button class="u-init-button jsCartToggle">
                        <i></i>
                        <span class="--full"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">10</font></font></span>
                    </button>
                </section>
            </div>

            <section class="pg-mypage-choice-inner">
                <div>
                    <div>
                        <div class="pg-mypage-choice-menu">
                            <div class="p-menu-foods" id="jsMenuFoodsParent" style="opacity: 1;">
<div class="p-menu-food" data-id="77" data-sugar="4.5" data-salinity="0.4" data-calories="91" data-lipid="3.7" data-protein="7.6" data-fiber="6.9" data-ingredient="" data-favorite="" data-scene="1" data-category="9" data-allergies="[1,3,14,2]" data-menu-food-smi-id="208" data-premium="" data-volume="" data-eventmenu="" data-limited="" data-favorite-id="183" data-menu-food-name="バターロール(4個)" data-menu-food-weight="200" data-menu-food-extra-price="0" style="display: flex;">
    <div>
        <a class="p-menu-food-image --icon-large" data-menu-modal-link-id="208" data-click-insight="click_global_menu_modal" data-param-insight="208">
            <img class="c-image " src="https://img.nosh.jp/images/chefly/product/img_bread_2_s.webp" alt="バターロール(4個)" loading="lazy">
        </a>
    </div>
    <div class="p-menu-food-info">
        <h2 class="p-menu-food-info__name">
            バターロール(4個)
        </h2>
        <div class="p-menu-food-info__content">
            <span class="p-menu-food-info__quantity jsMenuFoodQuantity">カロリー 91kcal</span>
        </div>
    </div>
</div>

<div class="p-menu-food" data-id="1" data-sugar="10.4" data-salinity="2.2" data-calories="336" data-lipid="22.5" data-protein="21.6" data-fiber="3.8" data-ingredient="2" data-favorite="" data-scene="2" data-category="3" data-allergies="[1,3,9,10,11,12,14,18,25,8]" data-menu-food-smi-id="841" data-premium="1" data-volume="" data-eventmenu="" data-limited="" data-favorite-id="843" data-menu-food-name="ポルチーニ香る！銀鮭の具沢山クリーム仕立て" data-menu-food-weight="231" data-menu-food-extra-price="250" style="display: flex;">
    <div>
        <a class="p-menu-food-image --icon-large" data-menu-modal-link-id="841" data-click-insight="click_global_menu_modal" data-param-insight="841">
            <img class="c-image --premium-low" src="https://img.nosh.jp/images/chefly/product/lunch_20260128_1938_s.webp" alt="ポルチーニ香る！銀鮭の具沢山クリーム仕立て" loading="lazy">
        </a>
    </div>
    <div class="p-menu-food-info">
        <div class="p-menu-food-info__content">
            <button class="p-menu-food-info__category --premium-low jsModalAnnounceMenuBadgeButton">
                <span>プレミアム</span>
            </button>
        </div>
        <h2 class="p-menu-food-info__name">
            ポルチーニ香る！銀鮭の具沢山クリーム仕立て
        </h2>
        <div class="p-menu-food-info__content">
            <span class="p-menu-food-info__quantity jsMenuFoodQuantity">カロリー 336kcal</span>
        </div>
    </div>
</div>

<div class="p-menu-food" data-id="2" data-sugar="28.7" data-salinity="2.5" data-calories="459" data-lipid="25.3" data-protein="24.2" data-fiber="6.9" data-ingredient="5" data-favorite="" data-scene="2" data-category="3" data-allergies="[1,2,3,6,9,10,14,18,25,28]" data-menu-food-smi-id="1033" data-premium="" data-volume="1" data-eventmenu="" data-limited="" data-favorite-id="1057" data-menu-food-name="豪快チキンのビリヤニライス" data-menu-food-weight="300" data-menu-food-extra-price="130" style="display: flex;">
    <div>
        <a class="p-menu-food-image --icon-large" data-menu-modal-link-id="1033" data-click-insight="click_global_menu_modal" data-param-insight="1033">
            <img class="c-image --volume" src="https://img.nosh.jp/images/chefly/product/lunch_20260210_2750_s.webp" alt="豪快チキンのビリヤニライス" loading="lazy">
        </a>
    </div>
    <div class="p-menu-food-info">
        <div class="p-menu-food-info__content">
            <button class="p-menu-food-info__category --volume jsModalAnnounceMenuBadgeButton">
                <span>ボリューム</span>
            </button>
        </div>
        <h2 class="p-menu-food-info__name">
            豪快チキンのビリヤニライス
        </h2>
        <div class="p-menu-food-info__content">
            <span class="p-menu-food-info__quantity jsMenuFoodQuantity">カロリー 459kcal</span>
        </div>
    </div>
</div>

<div class="p-menu-food" data-id="23" data-sugar="20.5" data-salinity="2.4" data-calories="382" data-lipid="24.6" data-protein="17.2" data-fiber="4.5" data-ingredient="1" data-favorite="" data-scene="2" data-category="3" data-allergies="[1,2,3,9,10,11,14,18,25,28]" data-menu-food-smi-id="827" data-ranking="1" data-premium="" data-volume="" data-eventmenu="" data-limited="" data-favorite-id="835" data-menu-food-name="オニオングリルハンバーグ" data-menu-food-weight="256" data-menu-food-extra-price="0" style="display: flex;">
    <div>
        <a class="p-menu-food-image --icon-large" data-menu-modal-link-id="827" data-click-insight="click_global_menu_modal" data-param-insight="827">
            <img class="c-image " src="https://img.nosh.jp/images/chefly/product/lunch_20240910_3_s.webp" alt="オニオングリルハンバーグ" loading="lazy">
        </a>
    </div>
    <div class="p-menu-food-info">
        <h2 class="p-menu-food-info__name">
            オニオングリルハンバーグ
        </h2>
        <div class="p-menu-food-info__content">
            <span class="p-menu-food-info__quantity jsMenuFoodQuantity">カロリー 382kcal</span>
        </div>
    </div>
</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>`,
};

/**
 * fixtureを読み込む
 * 単一責務: HTMLfixtureの提供に特化
 */
export function loadFixture(name: string): HTMLElement {
  const html = fixtures[name];
  if (!html) {
    throw new Error(`Fixture "${name}" not found`);
  }

  const container = document.createElement("div");
  container.innerHTML = html;
  return container;
}
