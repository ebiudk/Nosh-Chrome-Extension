const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: [
    'src/background/serviceWorker.ts',
    'src/content/index.ts',
    'src/ui/popup.ts',
    'src/ui/options.ts'
  ],
  bundle: true,
  outdir: 'dist/src', // 元の構造を維持するために dist/src に出力
  platform: 'browser',
  target: 'es2020',
  format: 'esm', // Service Worker は ESM として読み込むのがモダンだが、MV3では設定次第。一旦iifeかesmを検討。
                 // MV3 background.service_worker は type: "module" を指定すれば ESM 可。
                 // しかし、多くの場合は iife の方がトラブルが少ない。
                 // 今回は 'exports is not defined' なので、bundleしてブラウザが理解できる形式にするのが鍵。
                 // format: 'iife' が無難。
  format: 'iife',
  sourcemap: true,
  minify: false,
  plugins: [],
  loader: { '.ts': 'ts' },
};

// ディレクトリ構造を維持するためのマッピング修正
// esbuildのoutdirは階層をフラットにしがちなので、entryNamesを使うか、個別にビルドする。
// ここでは簡単のため、主要なエントリポイントを指定してディレクトリ構造をある程度維持させる。

// 修正: entryPointsをオブジェクト形式にして出力パスを制御
const entryPoints = {
  'background/serviceWorker': 'src/background/serviceWorker.ts',
  'content/index': 'src/content/index.ts',
  'ui/popup': 'src/ui/popup.ts',
  'ui/options': 'src/ui/options.ts'
};

const options = {
  ...buildOptions,
  entryPoints,
  outdir: 'dist', // dist 直下に background/serviceWorker.js 等が生成されるようにする
};

async function build() {
  if (isWatch) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await esbuild.build(options);
    console.log('Build complete');
  }
}

// 静的ファイルのコピー (HTML, assets, manifest)
function copyStaticFiles() {
  const targets = [
    { src: 'src/ui/popup.html', dest: 'dist/ui/popup.html' },
    { src: 'src/ui/options.html', dest: 'dist/ui/options.html' },
    { src: 'manifest.json', dest: 'dist/manifest.json' },
    // assets があればコピー
  ];

  if (!fs.existsSync('dist')) fs.mkdirSync('dist');
  if (!fs.existsSync('dist/ui')) fs.mkdirSync('dist/ui');

  targets.forEach(target => {
    if (fs.existsSync(target.src)) {
      fs.copyFileSync(target.src, target.dest);
    }
  });
  
  // manifest.json のパス修正は不要（dist基準になるため）
  // ただし、src/background/serviceWorker.ts -> background/serviceWorker.js になるので
  // manifest.json 内の参照パスを確認する必要がある。
}

build().catch(() => process.exit(1));
copyStaticFiles();
