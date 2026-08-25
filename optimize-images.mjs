#!/usr/bin/env node
/**
 * 圖片最佳化：assets/ 裡的 PNG／JPG → WebP（縮到顯示所需的尺寸上限）
 *
 * 用法（在專案根目錄）：
 *   npm run optimize:branding              # 產生 .webp，保留原檔
 *   npm run optimize:branding -- --replace # 產生 .webp 後刪除原檔（原檔仍可從 git 歷史找回）
 *
 * 需要 cwebp（brew install webp）。og.png 是社群預覽圖，維持 PNG 不轉（部分平台不吃 WebP）。
 * 已存在且比原檔新的 .webp 會跳過，可重複執行。
 */
import { readdirSync, readFileSync, statSync, unlinkSync, openSync, readSync, closeSync } from "node:fs";
import { dirname, join, extname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const DIR = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(DIR, "assets");
const QUALITY = 82;
// 各資料夾的寬度上限（px）：以版面實際顯示寬度 × 2（Retina）為準
const MAX_WIDTH = { 書籍: 640, 形象照: 1000 };
const DEFAULT_MAX_WIDTH = 1400;
const SKIP = new Set(["og.png"]);
const replace = process.argv.includes("--replace");

try {
  execFileSync("cwebp", ["-version"], { stdio: "ignore" });
} catch {
  console.error("✗ 找不到 cwebp，請先安裝：brew install webp");
  process.exit(1);
}

// 讀 PNG／JPEG 檔頭取得寬度（只讀前 64KB，足夠找到 JPEG 的 SOF 標記）
function imageWidth(file) {
  const fd = openSync(file, "r");
  const buf = Buffer.alloc(65536);
  const n = readSync(fd, buf, 0, buf.length, 0);
  closeSync(fd);
  if (buf.readUInt32BE(0) === 0x89504e47) return buf.readUInt32BE(16); // PNG IHDR
  if (buf.readUInt16BE(0) === 0xffd8) {
    let i = 2;
    while (i + 9 < n) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return buf.readUInt16BE(i + 7);
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  throw new Error(`讀不到圖片寬度：${file}`);
}

function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if ([".png", ".jpg", ".jpeg"].includes(extname(e.name).toLowerCase()) && !SKIP.has(e.name)) yield p;
  }
}

let before = 0, after = 0, done = 0, skipped = 0;
for (const src of walk(ASSETS)) {
  const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const srcStat = statSync(src);
  try {
    if (statSync(out).mtimeMs >= srcStat.mtimeMs) { skipped++; if (replace) unlinkSync(src); continue; }
  } catch {}
  const folder = basename(dirname(src));
  const maxW = MAX_WIDTH[folder] ?? DEFAULT_MAX_WIDTH;
  const w = imageWidth(src);
  const args = ["-quiet", "-q", String(QUALITY), "-metadata", "none"];
  if (w > maxW) args.push("-resize", String(maxW), "0");
  execFileSync("cwebp", [...args, src, "-o", out]);
  const outSize = statSync(out).size;
  before += srcStat.size; after += outSize; done++;
  console.log(`  ${relative(DIR, src)} → .webp  ${(srcStat.size / 1024).toFixed(0)}K → ${(outSize / 1024).toFixed(0)}K${w > maxW ? `（縮至 ${maxW}px 寬）` : ""}`);
  if (replace) unlinkSync(src);
}
console.log(`✓ 轉換 ${done} 張（跳過 ${skipped} 張已是最新）：${(before / 1024).toFixed(0)}K → ${(after / 1024).toFixed(0)}K${replace ? "，原檔已刪除" : ""}`);
