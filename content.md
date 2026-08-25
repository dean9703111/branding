# 網站設定

```toml
title       = "林鼎淵 Dean Lin｜生成式 AI 講師・暢銷書作家・軟體專家"
description = "外商資安公司軟體專家、生成式 AI 創新學院發起人、全台第一本 ChatGPT 應用專書作者。超過百場授課與顧問經驗。"
url         = "https://deanlin.net/branding/"
og_image    = "assets/og.png"
favicon     = "https://deanlin.net/images/favicon.png"
# 專長領域（寫進結構化資料 Person.knowsAbout，幫助搜尋引擎理解品牌主題）
knows_about = ["生成式 AI", "ChatGPT", "Claude", "Gemini", "Vibe Coding", "AI 簡報製作", "AI 圖片與影片生成", "企業 AI 導入", "AI 輔助程式開發", "工程師職涯", "n8n 自動化"]
```

# Hero

```toml
eyebrow = "讓 AI 成為每個人的即戰力"
name    = "林鼎淵"
name_en = "DEAN LIN"
# lead 用空行分段（段內 \n 也會換行）
lead  = "擅長用最白話的語言，把 AI 工具轉化為「聽得懂、秒上手、立刻見效」的行動方案。\n實測 100+ 款 AI 工具，並將實戰心得分享到 Medium 部落格與 YT 影片；帶領 8000+ 名學員做出月報產生器、排班網頁、內部知識庫等落地成果。"
photo = "assets/形象照/個人照.webp"

# 資歷徽章（icon 可選：shield 資安／spark 創新／book 著作／pen 專欄／mic 講座／award 獎項）
# text 可用 **粗體** 把關鍵字標成金色
[[titles]]
icon = "shield"
text = "外商資安公司軟體專家"

[[titles]]
icon = "spark"
text = "生成式 AI 創新學院發起人"

[[titles]]
icon = "book"
text = "**全台第一本** ChatGPT 應用專書作者"

[[titles]]
icon = "pen"
text = "科技島、商業周刊專欄作家"

# 底部統計帶（num 大數字、plus 小上標、label 說明）
[[stats]]
num = "15"
plus = "+"
label = "年開發經驗"

[[stats]]
num = "7"
plus = ""
label = "本出版著作"

[[stats]]
num = "500"
plus = "萬+"
label = "文章瀏覽量"

[[stats]]
num = "100"
plus = "+"
label = "場授課與顧問"

[social]
youtube  = "https://www.youtube.com/@dlcorner"
facebook = "https://www.facebook.com/deanlinbao"
github   = "https://github.com/dean9703111"
medium   = "https://medium.com/@dean-lin"
```

# 關於

```toml
heading = "用 AI 放大自己不同角色的能力"
sub     = "把複雜的技術，變成人人都能上手的生產力。"
```

- 外商軟體工程師：超過 15 年開發經驗，擔任過任工程師、專案經理、技術主管，具備跨部門溝通與資訊整合能力。
- 暢銷書作家：出版 7 本技術與職涯類專書，包括《ChatGPT 與 AI 繪圖效率大師》、《工程師下班有約》、《給全端工程師的職涯筆記》等。
- 企業內訓講師：授課涵蓋生成式 AI 應用、程式開發、數位轉型，協助不同產業快速導入 AI 工具提升生產力。
- 部落客／專欄作家：撰寫 400+ 篇文章、累積超過 500 萬瀏覽，長期分享最新技術、團隊合作與工程師職涯。
- YouTube 創作者：經營頻道《工程師下班有約》，內容涵蓋職涯發展、Vibe Coding 與生成式 AI 工具。

# 出版著作

```toml
heading     = "出版著作"
sub         = "七本專書，從爬蟲、職涯寫到生成式 AI —— 包含全台第一本 ChatGPT 應用專書。"
proof_label = "暢銷實績・百大排行榜"

# 書籍依序排列在書架上
[[books]]
cover = "assets/書籍/下班有約.webp"
tag   = "2025 新作"
title = "工程師下班有約：企業內訓講師帶你認清職涯真相！"
url   = "https://www.books.com.tw/products/E050284460"

[[books]]
cover = "assets/書籍/ChatGPT3.webp"
tag   = "第三版"
title = "ChatGPT 與 AI 繪圖效率大師（新增 Copilot、Gamma、Runway、Suno）"
url   = "https://www.books.com.tw/products/E050249393"

[[books]]
cover = "assets/書籍/ChatGPT2.webp"
tag   = "第二版"
title = "ChatGPT 與 AI 繪圖效率大師（添加 GPT-4、Bing Chat 全新章節）"
url   = "https://www.books.com.tw/products/E050170586"

[[books]]
cover = "assets/書籍/ChatGPT1.webp"
tag   = "全台第一本"
title = "ChatGPT 與 AI 繪圖效率大師：從日常到職場的全方位應用"
url   = "https://www.books.com.tw/products/E050161203"

[[books]]
cover = "assets/書籍/工程師職涯v2.webp"
tag   = "加強版"
title = "給全端工程師的職涯生存筆記（ChatGPT 加強版）"
url   = "https://www.books.com.tw/products/E050170581"

[[books]]
cover = "assets/書籍/工程師職涯v1.webp"
tag   = "職涯"
title = "給全端工程師的職涯生存筆記：履歷×面試×職場"
url   = "https://www.books.com.tw/products/E050140367"

[[books]]
cover = "assets/書籍/網路爬蟲.webp"
tag   = "實戰"
title = "JavaScript 爬蟲新思路！用 Node.js 打造 FB & IG 爬蟲專案"
url   = "https://www.books.com.tw/products/E050106521"

# 暢銷排行榜截圖
[[proof]]
img     = "assets/成就/ChatGPT排行榜.webp"
caption = "《ChatGPT 與 AI 繪圖效率大師》登上暢銷排行榜"

[[proof]]
img     = "assets/成就/工程師職涯排行榜.webp"
caption = "《給全端工程師的職涯生存筆記》入選百大暢銷榜"

[[proof]]
img     = "assets/成就/爬蟲排行榜.webp"
caption = "《JavaScript 爬蟲新思路》登上暢銷排行榜"
```

# 授課足跡

```toml
heading = "授課足跡"
sub     = "從上市企業到國小教室，累積 93 場授課與 9 次顧問諮詢——**點擊單位名稱**即可展開課程清單。"

# 三格統計（sub 是數字下方的小字）
[[stats]]
num = "21"
plus = ""
label = "線上／平台課程"
sub = "跨 15 個合作平台"

[[stats]]
num = "47"
plus = "+7"
label = "企業內訓"
sub = "含 7 次顧問陪跑"

[[stats]]
num = "25"
plus = "+2"
label = "校園講座"
sub = "含 2 次課後諮詢"

# 授課現場相簿（第 1 張較寬、第 2 張較窄，之後兩兩並排）
[[gallery]]
img     = "assets/企業內訓/企業.webp"
caption = "企業內訓・授課現場"

[[gallery]]
img     = "assets/企業內訓/企業2.webp"
caption = "企業內訓・實戰工作坊"

[[gallery]]
img     = "assets/校園講座/台藝大.webp"
caption = "校園講座・臺灣藝術大學"

[[gallery]]
img     = "assets/校園講座/大安高工.webp"
caption = "校園講座・大安高工"
```

## 企業內訓

- 中華電信 (×11)
    - 人機合一終極指南——手把手教你 ChatGPT 和 Midjourney
    - 與 ChatGPT 對話，不會寫程式也能寫程式
    - 早上點下班系列——用 AI 做簡報
    - 如何利用 AI 製作短影音
    - 使用 AI 生成圖片的技巧
    - 使用文字、圖片生成 AI 影片
    - 使用腳本生成 AI 短影音
    - Vibe Coding 學習地圖，了解 Gemini、Google AI Studio、Antigravity 的使用情境
    - 把想法化為現實！用 Vibe Coding 完成輕量級全端專案
    - 建立自動化測試，解決 Vibe Coding 痛點
    - 掌握 Agent Skills，讓 AI 從庸才變專家
- 社團法人中華人力資源管理協會 (×4)
    - AI 簡報神助攻！
    - 用腳本生成 AI 短影音
    - 掌握 Gemini 可以直接應用在職場的最新功能！
    - 零程式基礎，也能透過 AI 完成「網站」的實作體驗！
- 中衛中心 (×4＋顧問)
    - 生成式 AI 工作應用進階班
    - AI 工具應用於專題簡報生成
    - 從文件分析到 Vibe Coding：Cursor 全方位實戰應用
    - 自動化流程設計：n8n 實戰應用
    - AI 導入陪跑（7 次顧問）
- 滾動力 (×3)
    - 生成式 AI 在職場的全方位應用 Part 1（ChatGPT、Copilot）
    - 生成式 AI 在職場的全方位應用 Part 2（Midjourney、ideogram）
    - 生成式 AI 在職場的全方位應用 Part 3（GAMMA、AIVA、Runway）
- 吉田建築 (×2)
    - 生成式 AI 在職場的全方位應用 Part 1（ChatGPT）
    - 生成式 AI 在職場的全方位應用 Part 2（GAMMA、Midjourney、Copilot）
- 富強鑫精密工業 (×2)
    - 利用生成式 AI，改變工作型態 Part 1（ChatGPT）
    - 利用生成式 AI，改變工作型態 Part 2（Gamma、Copilot、NotebookLM、UPDF、Runway、Suno）
- 銘異科技 (×2)
    - 生成式 AI 的全方位工作應用 Part 1
    - 生成式 AI 的全方位工作應用 Part 2
- 中華郵政
    - ChatGPT 與 AI 繪圖效率大師，解放你的生產力！
- 中華黃頁
    - 自動化您的工作流，使用 ChatGPT & AI 工具解決工作問題
- 精誠資訊
    - ChatGPT 職場生產力 AI 工具實戰班
- 群益證券
    - 生成式 AI 在職場的全方位應用
- 緯穎科技
    - Claude Code 實戰工作坊：從 AI 寫程式到驅動開發流程
- 三軍總醫院
    - 醫療人的 AI 優雅轉身術：用 Claude Cowork 把排班、月報表設計成自動化工具
- 智慧財產局
    - 生成式 AI 在職場的全方位應用
- 勞保局
    - AI 應用案例與資安風險
- 環境署
    - 借助 AI 提升文書處理效率——手把手帶你掌握從入門到進階的 AI 技術！
- 僑務委員會
    - AI 智慧辦公全攻略，Gemini 辦公應用教育訓練
- 嘉義縣政府
    - AI 助你打造超吸睛簡報——用 ChatGPT + Gamma 生成高質感簡報（嘉我好漾・AI 加速器啟動！嘉義青年創業專案）
- 中華民國資訊軟體協會
    - AI 魔法打造吸睛文案
- 台灣鍛造協會
    - 企業如何面對生成式 AI 時代的變革與資安威脅
- 金屬中心圖書館
    - 生成式 AI：改變我們的日常，啟發未來新生活
- 甲山林
    - 生成式 AI 在職場的全方位應用
- 全興國際
    - 生成式 AI 的全方位工作應用（ChatGPT/NotebookLM/Gamma/Gemini/Claude）
- 青農會
    - AI 輔助簡報生成術
- Rmagic Club
    - ChatGPT 與 AI 繪圖效率大師，實戰分享會
- EDA
    - Claude 企業級自動化實戰，掌握 Connector / Project / Skill / Cowork 的使用技巧

## 校園講座

- 數位實驗中學 (×10)
    - ChatGPT 實戰應用——掌握提問技巧、自訂 ChatGPT、撰寫文案、生成提案企劃
    - ChatGPT 實戰應用——從零開始完成 Side Project（以 LINE Bot 串接 OpenAI 為例）
    - AI 輔助程式開發——用 ChatGPT、Cursor、qodo 輔助開發的實用技巧
    - AI 高效簡報術——用 ChatGPT + Gamma + Napkin 生成高質感簡報
    - 掌握 AI 生成圖片的關鍵技巧——DALL·E、Ideogram、Midjourney
    - 不露臉、不錄音！用 AI 生成短影音——Runway、Haiper、Pika、Suno、Hedra、ChatGPT
    - 用一堂課認識目前各領域最夯的生成式 AI 工具
    - 生成式 AI 應用於教學領域——ChatGPT/Perplexity/NotebookLM/Gamma/Napkin/Gemini
    - 從零開始 Vibe Coding——Gemini / Google AI Studio / Antigravity
    - 自動化流程設計：n8n 實戰應用
- 臺灣藝術大學 (×2)
    - AI 實戰速成班——手把手帶你掌握從入門到進階的 AI 技術！（113 學年度）
    - AI 實戰速成班——手把手帶你掌握從入門到進階的 AI 技術！（114 學年度）
- 致理科技大學 (×2＋諮詢)
    - 生成式 AI 的全方位應用：以專題簡報為例
    - 生成式 AI 的全方位應用：將 AI 導入教學
    - 課後 AI 技術諮詢（2 次）
- 大安高工 (×2)
    - 靠 AI！我在 1 年內達成 10 年份的里程碑
    - 不走常人路！你想不到的工程師職涯
- 國防大學
    - 掌握與 AI 溝通的技巧
- 臺北科技大學
    - 把時間留給創造——用 AI 輕鬆搞定繁瑣的需求規格、技術文件
- 臺中科技大學
    - AI 職涯術：自動生成簡報 Gamma 入門介紹
- 淡江大學
    - 工程師的下一步升級路線：從 AI 寫程式到驅動開發流程
- 大葉大學
    - AI 高效簡報術
- 敦化國中
    - ChatGPT 實戰應用——掌握提問技巧、自訂 ChatGPT、撰寫文案、生成提案企劃
- 信義國中
    - AI 高效簡報術——從 ChatGPT 到 Gamma
- 南門國中
    - ChatGPT 實戰應用——善用 AI 提升工作效率與教學品質
- 老松國小
    - ChatGPT 實戰應用——善用 AI 提升工作效率與教學品質

## 線上／平台課程

- Tibame (×3)
    - [從 AI 寫程式到驅動開發流程，工程師的下一步升級路線](https://www.youtube.com/watch?v=2OzGqCutF2w)
    - AI 開發分水嶺｜從寫 Code 轉向流程設計的關鍵路徑
    - [Claude AI 驅動全端開發工作流｜導入 Agent Skills 提升開發品質與效率](https://www.tibame.com/course/6424)
- T 客邦 (×2)
    - [用 ChatGPT 實作自然語言處理專案：串接 OpenAI API，把影音變文字](https://www.techbang.com/posts/105873-chatgpt-coding-nlp-project)
    - [導入 ChatGPT 加速程式開發攻略：進階提問技巧、程式優化與需求規格書實戰演練](https://www.techbang.com/posts/104856-chatgpt-skills)
- 商業周刊 (×2)
    - [AI 高效工作術：ChatGPT 職場全方位應用](https://smart.businessweekly.com.tw/Event/2023/chatgptaiclass/)
    - [AI 高效簡報術](https://smart.businessweekly.com.tw/Event/2023/aiwork/)
- Mastertalk (×2)
    - ChatGPT 從日常到職場的全方位應用：文案與 Midjourney 實作
    - ChatGPT 從日常到職場的全方位應用：撰寫程式實作
- 資料科學家的工作日常 (×2)
    - [AI 真的這麼厲害嗎？靠 ChatGPT 寫完一本書！](https://www.accupass.com/event/2303121622578724733490)
    - [「工作」≠「職涯」把自己當一間公司在經營](https://www.accupass.com/event/2506151342541968218420)
- 遠見雜誌
    - [從 ChatGPT 到 Midjourney：打造 AI 腦，高效致勝工作法](https://www.gvm.com.tw/article/102511)
- iThome
    - [「你成功引起我的注意了！」——給我 30 分鐘，帶你打造吸引面試官的亮眼履歷](https://itplus.ithome.com.tw/webinar-page/201)
- Cake
    - [市場不會為爛產品買單！Vibe Coding 讓你快速啟動，但「品質、維護、擴充」才決定產品能走多遠](https://global.cake.me/C1BODy)
- 生成式 AI 創新學院
    - [聊天就能聊出需求規畫書——用 ChatGPT 生成 PRD 的技巧](https://www.technice.com.tw/review/3517/)
- 天瓏書局
    - [《工程師下班有約》新書發表會](https://www.accupass.com/event/2506200152141094957788)
- 好實力
    - [中小企業 AI 實戰：12 大關鍵應用，從營運優化到市場拓展，一次搞定](https://uhau.csd.org.tw/courses/aiwork-2025)
- 馨天鑫地
    - [ChatGPT + Gamma AI 實戰速成班！](https://www.accupass.com/event/2407310935061918653103)
- 生涯設計師
    - [聽完這堂課，你也能用 AI 開啟斜槓人生](https://lifecareerdesigner.com/2025careerannualparty/)
- 軟體開發之路
    - [軟體開發之路——與大師對談](https://mystudyway.kktix.cc/events/software-developer-master)
- 睿華國際
    - [生成式 AI 應用與實務工作導入｜2026 企業人才培訓公開班](https://www.bic-service.com/tw/modules/news/article.php?storyid=425)

# 媒體與專欄

```toml
heading = "媒體與專欄"
sub     = "商周名人堂、科技島駐站專家，並受經理人雜誌、人間衛視、1111 人力銀行等單位專訪。"

# 截圖卡（瀏覽器視窗樣式）
[[shots]]
img     = "assets/專欄作家/講師履歷_image3.webp"
caption = "商周財富網・名人堂專欄《林鼎淵 AI 工作術》"

[[shots]]
img     = "assets/專欄作家/講師履歷_image2.webp"
caption = "科技島・駐站專家"

# 現場照片卡
[[photos]]
img     = "assets/節目錄影/人間衛視.webp"
caption = "節目錄影・人間衛視"

[[photos]]
img     = "assets/節目錄影/1111.webp"
caption = "專訪・1111 人力銀行"

# 收尾金句（\n 會換行）
[quote]
text   = "AI 時代，是將想法化為成果的最好時機"
source = "DEAN LIN・工程師下班有約"
```

# Footer

```toml
tagline   = "把複雜的技術，變成人人都能上手的生產力。"
services  = ["企業內訓・校園講座", "線上課程・媒體邀訪"]
cta       = "透過 Facebook 洽詢 →"
copyright = "© 2026 Dean Lin 林鼎淵・生成式 AI 講師・暢銷書作家・外商工程師"
```
