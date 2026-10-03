#!/usr/bin/env node
/**
 * 把 assets/ 裡的圖片上傳到 Cloudflare R2（透過 wrangler，零依賴）
 *
 * 用法（在專案根目錄）：
 *   npm run upload:branding              # 只上傳新增或內容有變的檔案
 *   npm run upload:branding -- --all     # 全部重傳
 *   npm run upload:branding -- --dry-run # 只列出會上傳哪些，不真的傳
 *
 * 前置：
 *   1. Cloudflare 後台啟用 R2，建立 bucket（名稱填在 content.md 網站設定的 r2_bucket）
 *   2. 登入一次：npx wrangler login（CI 可改用環境變數 CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID）
 *
 * 物件 key = 相對於本資料夾的路徑（assets/書籍/xxx.webp），所以公開網址就是 asset_base + "/" + key。
 * 上傳時帶 Cache-Control: immutable，build 會在網址後面加 ?v=內容雜湊 作為快取識別，改圖後重 build 即生效。
 * 已上傳的檔案與雜湊記在 .r2-manifest.json（請一起 commit），下次只傳有變動的。
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

const DIR = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(DIR, "assets");
const MANIFEST = join(DIR, ".r2-manifest.json");
const CACHE_CONTROL = "public, max-age=31536000, immutable";
const MIME = {
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".gif": "image/gif", ".svg": "image/svg+xml", ".avif": "image/avif", ".ico": "image/x-icon",
};
const all = process.argv.includes("--all");
const dryRun = process.argv.includes("--dry-run");

const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };

// 從 content.md 的「網站設定」讀 r2_bucket（只需要這一個值，不動用 build.mjs 的完整解析器）
const content = readFileSync(join(DIR, "content.md"), "utf8");
const bucket = content.match(/^r2_bucket\s*=\s*"([^"]*)"/m)?.[1];
if (!bucket) fail('content.md 網站設定缺少 r2_bucket = "bucket 名稱"');

function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const sha = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

let uploaded = 0, skipped = 0, bytes = 0;
for (const file of walk(ASSETS)) {
  const key = relative(DIR, file).split("\\").join("/"); // assets/書籍/xxx.webp
  const mime = MIME[extname(file).toLowerCase()];
  if (!mime) { console.log(`  略過（不是圖片）：${key}`); continue; }
  const hash = sha(file);
  if (!all && manifest[key] === hash) { skipped++; continue; }

  const size = readFileSync(file).length;
  console.log(`  ${dryRun ? "[dry-run] " : ""}↑ ${key}  ${(size / 1024).toFixed(0)}K`);
  if (dryRun) { uploaded++; bytes += size; continue; }

  try {
    execFileSync(
      npx,
      ["wrangler", "r2", "object", "put", `${bucket}/${key}`,
        "--file", file, "--content-type", mime, "--cache-control", CACHE_CONTROL, "--remote", "--force"],
      { stdio: ["ignore", "pipe", "pipe"], cwd: DIR, encoding: "utf8" }
    );
  } catch (e) {
    console.error(e.stderr || e.stdout || e.message);
    fail(`上傳失敗：${key}（還沒 npx wrangler login？bucket「${bucket}」存在嗎？）`);
  }
  manifest[key] = hash;
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n"); // 每傳一張就記，中斷也不用重來
  uploaded++; bytes += size;
}

console.log(
  `✓ ${dryRun ? "預計上傳" : "已上傳"} ${uploaded} 張（${(bytes / 1024).toFixed(0)}K），跳過 ${skipped} 張未變動 → bucket「${bucket}」`
);
if (uploaded && !dryRun) console.log("  下一步：確認 content.md 的 asset_base 已填公開網址，然後 npm run build:branding");
