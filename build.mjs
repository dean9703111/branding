#!/usr/bin/env node
/**
 * 個人形象網頁產生器：content.md（由上而下的區塊式 Markdown + TOML）→ index.html
 *
 * 用法（在專案根目錄）：
 *   npm run build:branding          # 產生 branding/index.html
 *   npm run build:branding -- --open  # 產生後直接用瀏覽器打開
 *
 * 零依賴，只用 Node.js 內建模組。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, "index.html");

// H1 區塊標題 → 內部代號（content.md 的 # 標題須包含這些關鍵字）
const H1_KEYS = [
  ["網站設定", "site"],
  ["Hero", "hero"],
  ["關於", "about"],
  ["出版著作", "books"],
  ["授課足跡", "teaching"],
  ["媒體與專欄", "media"],
  ["Footer", "footer"],
];
// 授課足跡底下的 H2 分類 → 模板 token
const CATEGORY_TOKENS = {
  企業內訓: "{{CHIPS_CORPORATE}}",
  校園講座: "{{CHIPS_CAMPUS}}",
  "線上／平台課程": "{{CHIPS_ONLINE}}",
};

const ICONS = {
  youtube: '<svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>',
  medium: '<svg viewBox="0 0 24 24"><path d="M13.5 12A6.8 6.8 0 1 1 0 12a6.8 6.8 0 0 1 13.5 0zm7.4 0c0 3.5-1.5 6.4-3.4 6.4s-3.4-2.9-3.4-6.4 1.5-6.4 3.4-6.4 3.4 2.9 3.4 6.4zm3.1 0c0 3.2-.5 5.7-1.2 5.7S21.6 15.2 21.6 12s.5-5.7 1.2-5.7S24 8.8 24 12z"/></svg>',
};
const SOCIAL_NAMES = { youtube: "YouTube", facebook: "Facebook", github: "GitHub", medium: "Medium" };
const ROMAN = ["i.", "ii.", "iii.", "iv.", "v.", "vi.", "vii.", "viii.", "ix.", "x."];

// ---------- 小工具 ----------

const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const gold = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<span style="color:var(--gold)">$1</span>');
const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

// ---------- TOML 子集解析（字串、字串陣列、[表格]、[[清單]]、# 註解） ----------

function parseString(raw, ctx) {
  const m = raw.match(/^"((?:[^"\\]|\\.)*)"\s*(?:#.*)?$/);
  if (!m) fail(`TOML 字串格式錯誤（${ctx}）：${raw}`);
  return m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}

function parseToml(src, ctx) {
  const root = {};
  let cur = root;
  const lines = src.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith("#")) continue;
    let m;
    if ((m = line.match(/^\[\[([\w-]+)\]\]$/))) {
      (root[m[1]] ??= []).push((cur = {}));
    } else if ((m = line.match(/^\[([\w-]+)\]$/))) {
      cur = root[m[1]] ??= {};
    } else if ((m = line.match(/^([\w-]+)\s*=\s*(.*)$/))) {
      const key = m[1];
      let val = m[2].trim();
      if (val.startsWith("[")) {
        while (!/\]\s*(?:#.*)?$/.test(val)) {
          if (++i >= lines.length) fail(`陣列沒有結尾 ]（${ctx}：${key}）`);
          val += "\n" + lines[i];
        }
        cur[key] = [...val.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) =>
          x[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        );
      } else {
        cur[key] = parseString(val, `${ctx}：${key}`);
      }
    } else {
      fail(`看不懂的 TOML 行（${ctx}）：${line}`);
    }
  }
  return root;
}

// ---------- content.md 解析：H1 區塊 → { toml, lists: {h2 或 "" → 行} } ----------

function parseContent(raw) {
  const sections = {};
  let h1 = null, h2 = "", inFence = false, fence = [];
  for (const line of raw.split("\n")) {
    if (line.trim() === "```toml") { inFence = true; fence = []; continue; }
    if (inFence) {
      if (line.trim() === "```") {
        inFence = false;
        if (!h1) fail("```toml 區塊出現在任何 # 標題之前");
        sections[h1].toml += fence.join("\n") + "\n";
      } else fence.push(line);
      continue;
    }
    if (line.startsWith("# ")) {
      const text = line.slice(2).trim();
      const hit = H1_KEYS.find(([kw]) => text.includes(kw));
      if (!hit) fail(`無法辨識的區塊標題「# ${text}」（須包含：${H1_KEYS.map(([k]) => k).join("、")}）`);
      h1 = hit[1];
      h2 = "";
      sections[h1] = { toml: "", lists: {} };
    } else if (line.startsWith("## ")) {
      h2 = line.slice(3).trim();
    } else if (h1 && line.trim()) {
      (sections[h1].lists[h2] ??= []).push(line);
    }
  }
  for (const [kw, key] of H1_KEYS) if (!sections[key]) fail(`content.md 缺少「# ${kw}」區塊`);
  for (const key of Object.keys(sections)) sections[key].data = parseToml(sections[key].toml, key);
  return sections;
}

// 「- 單位 (badge)」＋縮排課程 → [{unit, badge, courses}]
function parseUnits(lines) {
  const units = [];
  for (const line of lines) {
    const indented = line.startsWith("    ") || line.startsWith("\t");
    const text = line.trim();
    if (!text.startsWith("- ")) continue;
    const item = text.slice(2).trim();
    if (!indented) {
      const m = item.match(/^(.+?)\s*\(([^()]+)\)\s*$/);
      units.push(m ? { unit: m[1].trim(), badge: m[2].trim(), courses: [] } : { unit: item, badge: "", courses: [] });
    } else {
      if (!units.length) fail(`課程行出現在單位行之前：${item}`);
      const link = item.match(/^\[(.+?)\]\((.+?)\)$/);
      units.at(-1).courses.push(link ? { t: link[1], u: link[2] } : item);
    }
  }
  return units;
}

// ---------- 產生 HTML ----------

function build() {
  const sec = parseContent(readFileSync(join(DIR, "content.md"), "utf8"));
  const tpl = readFileSync(join(DIR, "template.html"), "utf8");

  const site = sec.site.data;
  const hero = sec.hero.data;
  const social = hero.social ?? fail("Hero 區塊缺少 [social]");
  const about = sec.about.data;
  const books = sec.books.data;
  const teaching = sec.teaching.data;
  const media = sec.media.data;
  const footer = sec.footer.data;

  const rep = {
    "{{TITLE}}": esc(site.title),
    "{{DESCRIPTION}}": esc(site.description),
    "{{EYEBROW}}": esc(hero.eyebrow),
    "{{NAME}}": esc(hero.name),
    "{{NAME_EN}}": esc(hero.name_en),
    "{{LEAD}}": esc(hero.lead),
    "{{PHOTO}}": hero.photo,
    "{{ABOUT_TITLE}}": esc(about.heading),
    "{{ABOUT_SUB}}": gold(about.sub),
    "{{BOOKS_TITLE}}": esc(books.heading),
    "{{BOOKS_SUB}}": gold(books.sub),
    "{{PROOF_LABEL}}": esc(books.proof_label),
    "{{TEACHING_TITLE}}": esc(teaching.heading),
    "{{TEACHING_SUB}}": gold(teaching.sub),
    "{{MEDIA_TITLE}}": esc(media.heading),
    "{{MEDIA_SUB}}": gold(media.sub),
    "{{QUOTE}}": esc(media.quote.text).replaceAll("\n", "<br>"),
    "{{QUOTE_SRC}}": esc(media.quote.source),
    "{{FOOT_TAGLINE}}": gold(footer.tagline),
    "{{FOOT_CTA}}": esc(footer.cta),
    "{{FACEBOOK}}": social.facebook,
    "{{COPYRIGHT}}": esc(footer.copyright),
  };

  rep["{{TITLES}}"] = hero.titles.map((t) => `        <span>${esc(t)}</span>`).join("\n");

  rep["{{SOCIAL_HERO}}"] = Object.entries(social)
    .map(([k, url]) => `        <a href="${url}" target="_blank" rel="noopener" aria-label="${SOCIAL_NAMES[k]}">${ICONS[k]}</a>`)
    .join("\n");

  rep["{{HERO_STATS}}"] = hero.stats
    .map((s) => {
      const plus = s.plus ? `<small>${esc(s.plus)}</small>` : "";
      return `      <div class="stat"><div class="num">${esc(s.num)}${plus}</div><div class="lbl">${esc(s.label)}</div></div>`;
    })
    .join("\n");

  rep["{{ROLES}}"] = (sec.about.lists[""] ?? [])
    .map((line, i) => {
      const [name, ...rest] = line.trim().slice(2).split("：");
      return [
        '      <div class="role">',
        `        <div class="idx">${ROMAN[i]}</div>`,
        `        <h3>${esc(name)}</h3>`,
        `        <p>${esc(rest.join("："))}</p>`,
        "      </div>",
      ].join("\n");
    })
    .join("\n");

  rep["{{BOOKS}}"] = books.books
    .map((b) =>
      [
        '      <figure class="book">',
        `        <a href="${b.url}" target="_blank" rel="noopener">`,
        `          <div class="cover"><img src="${b.cover}" alt="${esc(b.title)}" loading="lazy"></div>`,
        `          <figcaption><span class="tag">${esc(b.tag)}</span><br>${esc(b.title)}</figcaption>`,
        "        </a>",
        "      </figure>",
      ].join("\n")
    )
    .join("\n");

  const shotCard = (p, indent) =>
    [
      `${indent}<figure class="shot">`,
      `${indent}  <div class="bar"><i></i><i></i><i></i></div>`,
      `${indent}  <img src="${p.img}" alt="${esc(p.caption)}" loading="lazy">`,
      `${indent}  <figcaption>${esc(p.caption)}</figcaption>`,
      `${indent}</figure>`,
    ].join("\n");

  rep["{{PROOF}}"] = books.proof.map((p) => shotCard(p, "        ")).join("\n");

  rep["{{TEACH_STATS}}"] = teaching.stats
    .map((s) => {
      const plus = s.plus ? `<span class="plus">${esc(s.plus)}</span>` : "";
      return `      <div class="tstat"><div class="num">${esc(s.num)}${plus}</div><div class="lbl">${esc(s.label)}</div><div class="sub">${esc(s.sub)}</div></div>`;
    })
    .join("\n");

  const coursesData = {};
  for (const [h2, token] of Object.entries(CATEGORY_TOKENS)) {
    const lines = sec.teaching.lists[h2] ?? fail(`授課足跡缺少「## ${h2}」分類`);
    rep[token] = parseUnits(lines)
      .map((u) => {
        coursesData[u.unit] = u.courses;
        const badge = u.badge ? `<b>${esc(u.badge)}</b>` : "";
        return `        <button class="chip" data-unit="${esc(u.unit)}" aria-expanded="false">${esc(u.unit)}${badge}</button>`;
      })
      .join("\n");
  }
  rep["{{COURSES_JSON}}"] = JSON.stringify(coursesData, null, 2);

  const gClasses = ["g-a", "g-b", ...Array(20).fill(["g-c", "g-d"]).flat()];
  rep["{{GALLERY}}"] = teaching.gallery
    .map(
      (g, i) =>
        `      <figure class="gitem ${gClasses[i]}"><img src="${g.img}" alt="${esc(g.caption)}" loading="lazy"><figcaption>${esc(g.caption)}</figcaption></figure>`
    )
    .join("\n");

  rep["{{MEDIA_SHOTS}}"] = media.shots.map((p) => shotCard(p, "      ")).join("\n");

  rep["{{MEDIA_PHOTOS}}"] = media.photos
    .map((p) =>
      [
        '      <figure class="gitem">',
        `        <img src="${p.img}" alt="${esc(p.caption)}" loading="lazy">`,
        `        <figcaption>${esc(p.caption)}</figcaption>`,
        "      </figure>",
      ].join("\n")
    )
    .join("\n");

  rep["{{SOCIAL_FOOT}}"] = Object.entries(social)
    .map(([k, url]) => `          <a href="${url}" target="_blank" rel="noopener">${ICONS[k]}${SOCIAL_NAMES[k]}</a>`)
    .join("\n");

  rep["{{FOOT_SERVICES}}"] = footer.services.map((s) => `          <p>${esc(s)}</p>`).join("\n");

  let out = tpl;
  for (const [token, value] of Object.entries(rep)) out = out.replaceAll(token, value);

  const leftover = [...new Set(out.match(/\{\{[A-Z_]+\}\}/g) ?? [])];
  if (leftover.length) fail(`模板還有未替換的 token：${leftover.join(", ")}`);

  writeFileSync(OUT, out);
  console.log(`✓ 已產生 ${OUT}（${out.length.toLocaleString()} 字元）`);
}

build();
if (process.argv.includes("--open")) execFileSync("open", [OUT]);
