## pmgwork-site

Astro + React ベースのポートフォリオサイトです。GSAP/ScrollTrigger によるスクロールアニメーション、Swup によるページ遷移、Lenis によるスムーススクロールを用いています。

### Tech Stack
- Astro 5, React 19
- GSAP (ScrollTrigger, SplitText), CustomEase
- Swup (+ Head/BodyClass plugins)
- Lenis
- GraphCMS (Hygraph) via `graphql-request`

### 開発
- `npm i`
- `npm run dev` で `localhost:4321`
- `npm run build` → `dist/`
- `npm run preview`

### 環境変数
`PUBLIC_GRAPHCMS_ENDPOINT` を `.env` に設定してください。例は `.env.example` を参照。

```
PUBLIC_GRAPHCMS_ENDPOINT="https://<your-hygraph-endpoint>"
```

### ルーティングとアニメーション初期化
`src/layouts/Layout.astro` の `<script>` 内で、ページごとのアニメーションをマッピングで判定・実行します。

```ts
const routes = [
  { match: p => p === '/works' || p === '/works/', run: animateWorks },
  { match: p => p === '/about' || p === '/about/', run: animateAbout },
  { match: p => /^\/works\/.+/.test(p), run: animateWork },
];
```

### 背景色の切替（責務分離）
Swup のフックで `body.is-work-detail` クラスを付け替え、CSS 側（`src/styles/_layout.scss`）で `#background` の背景色を切替えます。インラインの `style` 変更は行いません。

### セキュリティ（set:html）
`src/pages/works/[slug].astro` では CMS 出力の HTML を挿入するため、`src/lib/utils/sanitize.ts` で簡易サニタイズを適用しています。厳密な要件がある場合は DOMPurify や sanitize-html の採用を推奨します。
