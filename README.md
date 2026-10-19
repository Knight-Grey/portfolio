# 个人作品集网页 · 使用说明

一个纯静态的个人作品集站点：**不需要安装任何软件、不需要构建、不需要联网**，双击 `index.html` 就能打开。

- 展示内容：首屏自我介绍 → 关于我 → 视频作品 → 图文作品 → 实习与实践 → 联系方式
- 所有文字和作品都在 **`assets/js/data.js`** 这一个文件里，改它就能改全站内容
- 配色、样式在 `assets/css/style.css` 顶部的变量里改
- 自动适配手机端和深色模式

---

## 一、怎么预览

**方式 1（最简单）**：双击 `index.html`，用浏览器打开。

> 本地视频（`assets/videos/` 里的 mp4）在 `file://` 下也能正常播放；如果以后换成 B 站等平台的嵌入链接，才需要走方式 2。

**方式 2（推荐，本地服务器）**：在本文件夹里打开 PowerShell，执行：

```powershell
python -m http.server 8000
```

然后浏览器访问 <http://localhost:8000>。按 `Ctrl + C` 停止。

---

## 二、怎么改内容（90% 的修改都在这里）

打开 `assets/js/data.js`，按注释改即可。保存后刷新浏览器就生效。

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、头衔、一句话简介 | `profile.name` / `profile.title` / `profile.tagline` |
| 头像 | 把照片放进 `assets/images/`，然后填 `profile.avatar: "assets/images/avatar.jpg"`（留空显示姓氏） |
| 电话、邮箱 | `profile.phone` / `profile.email`（**建议电话留空**，公开页面容易被爬虫抓取） |
| 简历 PDF | 替换 `assets/files/` 里的文件，或改 `profile.resume` 路径；留空则不显示「下载简历」按钮 |
| 关于我正文 | `profile.intro`，一个字符串一段 |
| 首屏亮点（奖学金、获奖等） | `profile.highlights` |
| 技能分组 | `profile.skills` |
| 视频作品 | `videoWorks` |
| 图文作品 | `articleWorks` |
| 实习经历 | `experiences` |
| 社交账号 | `socials` |
| 顶部导航项 | `site.nav`（顺序可调，删掉某项就不再显示） |
| 板块标题/说明文字 | `site.sections` |

**通用规则**：

- 某个板块的数据清空（`[]`）后，这个板块和对应的导航项会**自动隐藏**，不会留下一片空白。
- 每条作品里的链接填 `""`（空字符串）时，卡片上会显示「链接待补充」标记，方便你看出还差什么。
- 字段之间的逗号别删，字符串要用英文引号 `"` 包起来。

---

## 三、怎么加视频作品

现在用的是**本地视频文件**：视频放在 `assets/videos/`，点卡片在弹层里直接用浏览器播。

在 `videoWorks` 里复制一条改即可：

```js
{
  title: "作品标题",
  category: "商业短视频",      // 会自动生成分类筛选按钮
  role: "素材筛选 / AI 混剪",
  year: "2026",
  duration: "",               // 显示在封面右下角，可留空
  ratio: "9:16",              // "16:9" 横版 / "9:16" 竖版抖音；不填按 16:9
  summary: "一句话说清这条片子做了什么。",
  cover: "assets/images/cover-xxx.jpg",     // 封面图，留空显示占位块
  embed: "assets/videos/xxx.mp4",           // ★ 视频文件路径，点击即播
  url: "",                    // 额外外链，一般留空
  tags: ["AI 混剪", "口播"]
}
```

**加一条新视频的步骤**：

1. 把 mp4 扔进 `assets/videos/`（建议用英文名，如 `daguangsai.mp4`）；
2. 截图或抽一帧当封面，存成 `assets/images/cover-xxx.jpg`（16:9 用 1280×720，竖版用 720×1280）；
3. 在 `videoWorks` 里加一条，`cover` 和 `embed` 填上面两个路径。

> ⚠️ **编码必须是 H.264**。剪映 / Pr / 相机直接导出的 HEVC（H.265）视频，Chrome、Edge 常常解不了，页面里会**只显示第一帧、点了也不动**。导出时选：格式 mp4、编码 H.264、像素格式 yuv420p、1080p 以内。

> 目前站内 14 条视频共约 86MB（都已转成 H.264）。部署到 GitHub Pages 可以，但首屏不受影响——视频是**点开才加载**，不会拖慢首屏。

**批量转码命令**（本机已装 ffmpeg，路径见下；或直接把新视频丢给铃音处理）：

```powershell
# 竖版：压到 720×1280；横版把 scale=-2:1280 改成 scale=-2:1080
& "D:\Python\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe" -i 源文件.mp4 `
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset medium -maxrate 4M -bufsize 8M `
  -vf scale=-2:1280 -c:a aac -b:a 128k -movflags +faststart 输出.mp4
```

抽封面（取第 2 秒那一帧）：

```powershell
& "（同上 ffmpeg 路径）" -ss 2 -i 输出.mp4 -frames:v 1 -vf scale=-2:1280 -q:v 4 cover.jpg
```

### 用 B 站链接（可选）

如果某条片子想放 B 站原片，把 `embed` 换成播放器地址即可：

```
https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&page=1&high_quality=1&danmaku=0
```

**必须带 `https://`**，不要写成 `//player.bilibili.com/...`。这种嵌入在本地 `file://` 下打不开，要用本地服务器预览。

---

## 四、怎么改配色

打开 `assets/css/style.css`，最上面 `:root` 里的变量：

```css
--accent: #2f54eb;   /* 主色，按钮和强调色 */
--accent-2: #7c3aed; /* 渐变辅色 */
--max: 1140px;       /* 内容最大宽度 */
--radius: 16px;      /* 圆角大小 */
```

改成别的颜色（例如深红 `#b3261e`）整站风格就会跟着变。深色模式的配色在同一文件 `@media (prefers-color-scheme: dark)` 里。

---

## 五、怎么发布到网上（给 HR 一个网址）

站点是纯静态的，任选一个平台都免费。**推荐顺序：Vercel → Netlify → GitHub Pages**。

先说三条必须做的准备：

1. `Paper&video media/`（素材原件，约 180MB）**不要上传**——`.gitignore` 已排除它；
2. 成站内容约 **90MB**，其中视频 86MB。视频是点击才加载，不影响首屏速度，但**首次上传会比较久**（上传速度 1MB/s 的话要一两分钟以上）；
3. 上线前过一遍隐私：`data.js` 里的电话、住址，`assets/files/` 里的简历版本。

### 方案 A：Vercel（最简单，推荐）

1. 打开 <https://vercel.com>，用 GitHub 账号登录；
2. 首页点 `Add New → Project`，选 `Deploy` 页签下的 **拖拽上传**（或装 Vercel CLI）；
3. 把 `portfolio` 文件夹整个拖进去 → `Deploy`；
4. 1 分钟内拿到网址，形如 `https://portfolio-xxxx.vercel.app`。

> 拖拽上传对中文文件名、大文件偶有失败；失败就用方案 C 的 Git 方式。

### 方案 B：Netlify

把 `portfolio` 文件夹拖到 <https://app.netlify.com/drop> 即可，得到 `https://xxxx.netlify.app`。

### 方案 C：GitHub Pages（最稳，也是备选）

1. 装 GitHub Desktop 或 Git，新建一个仓库（**不要**勾选 README）；
2. 在 `portfolio` 目录里执行：

   ```powershell
   git init
   git add .
   git commit -m "portfolio"
   git branch -M main
   git remote add origin https://github.com/你的用户名/portfolio.git
   git push -u origin main
   ```

   `.gitignore` 会自动跳过素材原件目录。
3. 仓库 → `Settings → Pages → Source` 选 `Deploy from a branch`，分支 `main`、目录 `/ (root)`，保存；
4. 等 1—2 分钟，访问 `https://你的用户名.github.io/portfolio/`。

### 之后每次改内容

改完 `data.js` → 重新上传（拖拽）或 `git add . && git commit -m "update" && git push`，线上 1 分钟内自动更新。

### 想要更好看的网址

可以在平台里绑定自己的域名，例如 `renjiankang.com`（约 60—80 元/年）。HR 看到个人域名会稍微高级一点，但不是必需。

> 简历里写网址时，建议写**短且稳定**的那个；平台免费域名一般不会被回收，但换平台就会变。

---

## 六、目录结构

```
portfolio/
├─ index.html                  页面骨架（一般不用动）
├─ README.md                   本说明
├─ .gitignore                  排除素材原件目录
└─ assets/
   ├─ css/style.css            主站样式与配色
   ├─ css/article.css          文章阅读页样式
   ├─ js/data.js               ★ 所有内容都在这里
   ├─ js/main.js               渲染逻辑（一般不用动）
   ├─ articles/                今日头条稿件的网页正文（4 篇）
   ├─ images/                  头像与作品封面
   ├─ videos/                  本地视频文件（14 条，H.264）
   └─ files/                   简历、论文 PDF 等附件
```

> `Paper&video media/` 是素材原件目录（原始命名的视频、稿件 docx、截图），**不参与成站**，已在 `.gitignore` 里排除。

---

## 七、待你补充的清单

- [ ] 头像照片 → `assets/images/`，填 `profile.avatar`
- [ ] `tagline` 与 `intro` 换成你自己的口吻
- [ ] 想好线上域名/网址，写进简历
- [x] 联系方式（手机 / 邮箱 / 微信）已填
- [ ] 手机号已放成公开信息，介意被爬虫抓取可在 `socials` 里删掉那一条
