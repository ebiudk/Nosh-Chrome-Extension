# Nosh Chrome Extension - メニューフィルター

Nosh のメニュー選択画面からプレミアムメニューやボリュームメニューを除外する Chrome 拡張機能。

## 🎯 特徴

- **ローカル処理優先**: すべてのフィルタリングがブラウザ内で完結（プライバシー重視）
- **シンプル & 軽量**: 不要なメニューを非表示にすることで、ページの見通しが良くなる
- **拡張性**: ルールベースのフィルタシステムで、将来的には複雑なフィルタルールに対応可能
- **LLM対応（オプション）**: メニューの自動分類や自然言語ルール変換に対応予定

## 📦 ファイル構成

```
ChromeMenuChoiceFilter/
├── manifest.json                    # Chrome 拡張機能のマニフェスト (MV3)
├── package.json                     # プロジェクト設定・依存関係
├── tsconfig.json                    # TypeScript 設定
├── jest.config.js                   # Jest テスト設定
├── src/
│   ├── content/
│   │   ├── parser.ts               # メニュー HTML パーサ（単一責務: 抽出のみ）
│   │   ├── renderer.ts             # DOM レンダリング（単一責務: 表示更新のみ）
│   │   ├── index.ts                # Content Script エントリーポイント
│   │   └── __tests__/
│   │       ├── parser.test.ts      # パーサのテストスイート
│   │       └── fixtures.ts         # テスト用の HTML フィクスチャ
│   ├── background/
│   │   └── serviceWorker.ts        # Service Worker（状態管理・メッセージ処理）
│   ├── core/
│   │   ├── filterEngine.ts         # フィルターエンジン（ルール評価実行）
│   │   └── rules.ts                # ルール定義・管理（実装予定）
│   ├── ui/
│   │   ├── popup.html              # ポップアップ UI
│   │   ├── popup.ts                # ポップアップのスクリプト
│   │   ├── options.html            # 詳細設定ページ
│   │   └── options.ts              # 詳細設定のスクリプト
│   ├── types/
│   │   ├── menu.ts                 # メニュー関連の型定義
│   │   └── rule.ts                 # ルール関連の型定義
│   └── assets/                      # 画像・アイコン（実装予定）
└── README.md                        # このファイル
```

## 🚀 セットアップと開発

### インストール

```bash
npm install
```

### テスト実行

```bash
npm test              # 全テスト実行
npm run test:watch   # ウォッチモード
npm run test:coverage # カバレッジレポート
```

### ビルド

```bash
npm run build   # TypeScript コンパイル
npm run dev     # ウォッチモード
```

## 🏗️ アーキテクチャ

### 設計原則

1. **単一責務の原則（SRP）**
   - 各モジュールは1つの責務のみ
   - 例: `parser.ts` は抽出のみ、`renderer.ts` は表示更新のみ

2. **ローカル優先**
   - プライバシーのため、フィルタリングはすべてブラウザ内で実行
   - 外部API(LLM)はオプション機能として厳密に分離

3. **非破壊DOM操作**
   - `data-*` 属性や CSS クラスのみを使用
   - サイト側の JavaScript と競合しないよう配慮

### データフロー

```
ページ読み込み
    ↓
Content Script (index.ts)
    ├─→ parser.ts: HTML からメニュー抽出
    ├─→ Service Worker に設定を問い合わせ
    ├─→ filterEngine.ts: ローカルでフィルタリング実行
    └─→ renderer.ts: DOM を更新（非表示・ハイライト・注釈）
```

## 📝 実装状況

### ✅ 完了

- [x] メニュー HTML パーサ (`parser.ts`)
- [x] DOM レンダリング (`renderer.ts`)
- [x] Content Script エントリーポイント (`index.ts`)
- [x] Service Worker (`serviceWorker.ts`)
- [x] フィルターエンジン (`filterEngine.ts`)
- [x] 型定義 (`types/menu.ts`, `types/rule.ts`)
- [x] UI基本構造 (`popup.html`, `options.html`)
- [x] テストスイート (`parser.test.ts` 15テスト合格)

### 🚧 実装中

- [ ] Chrome Web Store へのアップロード準備
- [ ] E2E テスト (Puppeteer/Playwright)
- [ ] LLM アダプター実装
- [ ] ルール管理 UI

### 🔮 将来実装予定

- [ ] 複雑なルール設定 UI
- [ ] ユーザーのメニュー選択履歴から優先度を学習
- [ ] LLM による自動カテゴリ化
- [ ] クラウド同期機能

## 🧪 テスト

15個のテストが実装済みで、すべて成功しています:

- パーサの基本機能テスト
- プレミアム・ボリュームメニューの識別と除外テスト
- フィルターオプションの動作テスト

```bash
npm test
# PASS  src/content/__tests__/parser.test.ts
# Tests: 15 passed, 15 total
```

## 🔐 プライバシーとセキュリティ

- 個人情報はブラウザのローカルストレージのみに保存
- 外部への通信は LLM 機能が有効な場合のみ
- LLM 機能は明確なユーザー同意が必須
- API キーはローカルに保存され、安全に管理

## 📄 ライセンス

MIT

## 👨‍💻 開発者向け情報

### コード規約

- TypeScript Strict Mode を使用
- 各モジュールは単一責務の原則を厳守
- テスト駆動開発（TDD）を推奨
- 日本語コメントで説明を記載

### 質問やフィードバック

このプロジェクトについてのご質問、提案、バグ報告は Issue でお願いします。

---

**Note**: このプロジェクトは学習目的で開発されています。
