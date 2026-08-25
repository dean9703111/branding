# Branding：個人形象網頁

Markdown 驅動的個人形象網頁子專案。改 `content.md` → 跑一個指令 → `index.html` 自動重建。零依賴，只用 Node.js 內建模組。

## 使用方式（在專案根目錄）

```bash
npm run build:branding            # 重新產生 branding/index.html（＋ sitemap.xml）
npm run build:branding -- --open  # 產生後直接用瀏覽器打開
npm run optimize:branding         # 新加的 PNG／JPG 轉成 WebP（需 brew install webp）
npm run optimize:branding -- --replace  # 轉完刪掉原檔
```

## 專案結構

```
branding/
├── content.md      ← 你唯一要編輯的檔案（由上而下對應網頁區塊順序）
├── template.html   ← 網頁設計模板（CSS/JS 與 {{TOKEN}} 佔位符），改設計才需要動
├── build.mjs       ← 產生器（Node.js，零依賴）
├── og.html         ← 社群預覽圖（assets/og.png）的來源卡片，截圖指令在檔頭註解
├── optimize-images.mjs ← 圖片轉 WebP 並縮到版面所需尺寸（cwebp）
├── assets/         ← 圖片資產（一律 WebP；只有社群預覽圖 og.png 維持 PNG）
├── index.html      ← 產生物，不要直接編輯
└── sitemap.xml     ← 產生物，build 時一併更新
```

## content.md 的結構（由上而下 = 網頁由上而下）

每個 `# 區塊` 依網頁順序排列，區塊內用 ```toml 圍欄放參數、用 Markdown 清單放內容：

| 區塊 | 內容 |
|---|---|
| `# 網站設定` | 分頁標題、SEO 描述、`url`（canonical／OG 網址）、`og_image`（社群預覽圖路徑）、`favicon`（圖示網址）、`knows_about`（專長關鍵字，寫進結構化資料） |
| `# Hero` | 名字、頭銜、介紹、形象照、`[[stats]]` 統計帶、`[social]` 社群連結 |
| `# 關於` | 標題副標＋`- 身分：描述` 清單 |
| `# 出版著作` | `[[books]]` 書籍（封面/標籤/書名/連結）＋`[[proof]]` 排行榜截圖 |
| `# 授課足跡` | `[[stats]]` 三格統計、`[[gallery]]` 現場相簿＋三個 `##` 分類的單位清單 |
| `# 媒體與專欄` | `[[shots]]` 截圖卡、`[[photos]]` 照片卡、`[quote]` 收尾金句 |
| `# Footer` | 標語、服務項目、版權 |

### 授課單位的寫法（三個 `##` 分類標題不可改名）

```markdown
## 企業內訓
- 單位名稱 (×11)              ← 括號內文字原樣變成場次標籤；沒括號就不顯示
    - 課程名稱                 ← 縮排 4 格；點擊單位時展開的清單
    - [課程名稱](https://…)    ← 有連結的課程用 Markdown 連結語法
```

### 其他規則

- 統計數字：`num` 大數字、`plus` 小上標（如 `+7`）、`label` 說明、`sub` 下方小字
- 任何文字裡的 `**粗體**` 會渲染成金色強調字
- `[quote]` 的 `text` 中 `\n` 會換行
- 圖片放進 `assets/` 對應子資料夾後跑 `npm run optimize:branding -- --replace` 轉成 WebP，路徑寫 `assets/….webp`（書封上限 640px 寬、形象照 1000px、其他 1400px，改上限在 `optimize-images.mjs`）
- build 會讀 WebP 檔頭把 `width`/`height` 寫進 `<img>`（避免版面跳動），並產生 JSON-LD（ProfilePage／Person／Book）與 `sitemap.xml`

## 常見操作

- **新增一場授課**：在對應分類加單位或課程行，並同步更新授課足跡的 `[[stats]]` 數字
- **加一本書**：在 `# 出版著作` 加一段 `[[books]]`，封面圖放進 `assets/書籍/`
- **調整設計**（顏色、字體、間距）：編輯 `template.html` 的 CSS 變數（`:root` 區塊）

## 注意事項

- `index.html` 是產生物，下次 build 會被覆蓋，內容修改一律走 `content.md`
- 瀏覽器可能快取舊頁面，重新整理請用 Cmd+Shift+R
- build 失敗會印出具體原因（缺區塊、TOML 格式錯誤、未替換的 token），照訊息修即可
- 部署上線：把 `index.html`、`sitemap.xml` 與 `assets/` 一起上傳即可，路徑都是相對的
- SEO 後續：到 Google Search Console 驗證 `deanlin.net` 並提交 `https://deanlin.net/branding/sitemap.xml`；根網域的 `robots.txt` 屬於部落格 repo，建議加一行 `Sitemap: https://deanlin.net/branding/sitemap.xml`
