/* ==========================================================================
   作品集 · 内容配置（日常只改这一个文件）
   --------------------------------------------------------------------------
   · 改完保存，刷新浏览器即可看到效果，不需要任何构建工具。
   · 带「待补充」字样的地方，填上内容就会自动显示出来。
   · 用不到的条目直接删掉即可；某个板块内容清空后，页面会自动隐藏该板块。
   ========================================================================== */

window.PORTFOLIO_DATA = {

  /* ---------------- 站点基础信息 ---------------- */
  site: {
    title: "任建康 | 内容策划 · 视频制作 · 2027 届",
    brand: "任建康",                       // 左上角显示的字
    description: "任建康，西安外国语大学新闻传播学硕士（2027 届）。内容策划、视频拍摄与剪辑、投放素材制作，附成片与图文作品。",
    eyebrow: "Portfolio 2026",
    footer: "© {year} 任建康 · 个人作品集",   // {year} 会自动替换成当前年份

    // 顶部导航（id 要和下面的板块对应，顺序可调，不需要的删掉即可）
    nav: [
      { id: "about",      label: "关于我" },
      { id: "video",      label: "视频作品" },
      { id: "article",    label: "图文作品" },
      { id: "experience", label: "实习与实践" },
      { id: "contact",    label: "联系方式" }
    ],

    // 每个板块的标题与说明文字
    sections: {
      about: {
        kicker: "About",
        title: "关于我",
        desc: "跨语言与跨学科的背景，让我在内容生产时更习惯先确认信息是否准确，再考虑表达是否好看。"
      },
      video: {
        kicker: "Video",
        title: "视频作品",
        desc: "从选题策划、现场拍摄到剪辑调色与成片交付的完整流程。点击卡片可直接播放。"
      },
      article: {
        kicker: "Writing",
        title: "图文作品",
        desc: "学术论文、平台内容运营与新闻采编。点击卡片查看详情与原文入口。"
      },
      experience: {
        kicker: "Experience",
        title: "实习与实践",
        desc: "媒体、平台与商业内容三条线上的实践经历。"
      },
      contact: {
        kicker: "Contact",
        title: "联系方式",
        desc: ""
      }
    }
  },

  /* ---------------- 个人信息 ---------------- */
  profile: {
    name: "任建康",
    // 用 \n 可以换行显示
    title: "新闻传播学硕士 西安外国语大学\n翻译学士 湖南工业大学",

    // 首屏一句话定位（留空则不显示这一行）
    tagline: "",
    // 首屏数字条。留空数组 [] 时，自动按「视频 / 图文 / 实习」的条数计算
    heroMetrics: [
      { num: "11", label: "支成片" },
      { num: "10", label: "条投放素材" },
      { num: "4", label: "段实习实践" }
    ],
    // 首屏档期提示；留空字符串则不显示
    availability: "2027 届 7 月毕业，可异地择业",

    // 首屏三个快捷入口
    //   label    缩略图左上角的可点角标文字（点它跳到 section 指定的板块）
    //   section  角标跳转目标：video / article / experience
    //   title    卡片标题   note 一行补充   go 右下角动作文字   cover 封面图
    //   video / article / experience 三选一，决定「点卡片本体」做什么
    heroJumps: [
      {
        label: "视频",
        section: "video",
        title: "「三福时尚」视频广告",
        note: "广告短片 · 省级二等奖",
        go: "点开即播 ▶",
        cover: "assets/images/cover-daguangsai.jpg",
        video: "「三福时尚」视频广告"
      },
      {
        label: "图文",
        section: "article",
        title: "微博热搜舆论结构分析",
        note: "Python 采集 · 数据可视化",
        go: "查看详情 ↗",
        cover: "assets/images/cover-weibo-insight.png",
        article: "微博热搜舆论结构分析：榜单热度与真实讨论量的错位"
      },
      {
        label: "实习",
        section: "experience",
        title: "影石 360 · 千川投放素材",
        note: "旷世传声 · AI 混剪",
        go: "点开即播 ▶",
        cover: "assets/images/cover-insta-x5-82.jpg",
        video: "影石 360 · X5 混剪 82"
      }
    ],

    avatar: "",                            // 头像图片路径，例如 "assets/images/avatar.jpg"；留空则显示姓氏
    location: "陕西 · 西安",
    email: "leavy0804@foxmail.com",
    phone: "15829577031",                  // 公开页面会被爬虫抓取，介意就清空
    resume: "assets/files/任建康-简历.pdf", // 简历文件路径；留空则隐藏「下载简历」按钮

    // 关于我的正文段落（一个字符串一段）
    intro: [
      "我是任建康，西安外国语大学新闻传播学硕士在读（2024.09—2027.06），本科毕业于湖南工业大学翻译专业。硕士阶段修读国际舆情与大数据研究、品牌运营与管理、新闻传播政策伦理与法规；本科阶段修读基础笔译、基础口译与交替传译。课程组合给予了我研判舆情与数据的能力，以及在两种语言、两套语境之间切换的能力。",
      "在校媒和电视台的实习中，学习了Premiere Pro、Edius、Photoshop等视频剪辑工具 。面对数据抓取需要，也积极学习了Python、Cursor、DeepSeek Harness 等ai工具，强化自身数据抓取能力；AI 混剪、SeedDance、巨量千川这些新工具，也是在具体实习中精进学习。遇见新事物，先动手解决，然后再寻求帮助。",
      "具备一定的协调与团队合作能力。在直播间和投放项目里，剪辑、运营、投放几条线必须对齐同一批数据；在通讯社当文字部部长任职期间，需要带着同学采访、组稿最后上版。"
    ],

    // 首屏右上角卡片里的亮点条目
    highlights: [
      "2025 硕士研究生学业奖学金 二等奖",
      "第十七届全国大学生广告艺术大赛 陕西赛区省级二等奖",
      "湖南工业大学 校年度优秀记者",
      "《从部落到剧场微博与抖音用户平台化生存的媒介逻辑比较》收录于《大众电视》"
    ],

    // 技能分组
    skills: [
      { title: "拍摄", items: "全画幅相机（尼康 / 索尼）操作；商业级视频拍摄流程，熟悉构图与运镜" },
      { title: "剪辑与后期", items: "Premiere Pro、Edius、剪映、Photoshop；剪辑、调色、音效处理" },
      { title: "数据与工具", items: "Python 编程基础；Cursor、DeepSeek Harness；信息抓取与数据分析" },
      { title: "平台运营", items: "抖音罗盘、巨量千川；直播投放监控与 ROI 复盘；AI 辅助素材批量生产" },
      { title: "语言", items: "英语专业四级（TEM4）；普通话二级；可处理英文素材与外媒内容" }
    ]
  },

  /* ---------------- 视频作品 ----------------
     title     标题
     category  分类（会自动生成筛选按钮）
     role      你的角色
     year      年份
     duration  时长，显示在封面右下角
     summary   一句话简介
     ratio     画面比例："16:9"（横版，默认）或 "9:16"（竖版抖音）
     cover     封面图路径，"assets/images/xxx.jpg"；留空显示占位块
     embed     视频文件路径，如 "assets/videos/xxx.mp4" → 点击卡片本地播放
               （填 B 站等平台的嵌入地址也可以，同样弹窗播放）
     url       额外外链，可留空
     tags      标签数组，可留空
     -------------------------------------------------- */
    videoWorks: [
    {
      title: "「三福时尚」视频广告",
      category: "广告短片",
      role: "拍摄策划 / 剪辑",
      year: "2025",
      duration: "00:31",
      ratio: "16:9",
      summary: "第十七届全国大学生广告艺术大赛参赛作品。负责拍摄策划与现场执行，独立完成剪辑成片，获陕西赛区省级二等奖。",
      cover: "assets/images/cover-daguangsai.jpg",
      embed: "assets/videos/daguangsai-sanfu.mp4",
      url: "",
      tags: ["广告创意", "拍摄策划", "剪辑"]
    },
    
    {
      title: "影石 360 · X5 混剪 75",
      category: "影石 360",
      role: "素材筛选 / AI 混剪",
      year: "2026",
      duration: "00:16",
      ratio: "9:16",
      summary: "X5 产品线千川跑量素材，多纯展镜头，用于投放测款。",
      cover: "assets/images/cover-insta-x5-75.jpg",
      embed: "assets/videos/insta-x5-75.mp4",
      url: "",
      tags: ["AI 混剪", "纯展示", "深度种草"]
    },
    {
      title: "影石 360 · X5 混剪 77",
      category: "影石 360",
      role: "素材筛选 / AI 混剪",
      year: "2026",
      duration: "00:13",
      ratio: "9:16",
      summary: "X5 产品线千川跑量素材，多纯展镜头，高分辨率素材压缩适配信息流。",
      cover: "assets/images/cover-insta-x5-77.jpg",
      embed: "assets/videos/insta-x5-77.mp4",
      url: "",
      tags: ["AI 混剪", "纯展示", "深度种草"]
    },
    {
      title: "影石 360 · X5 混剪 78",
      category: "影石 360",
      role: "素材筛选 / AI 混剪",
      year: "2026",
      duration: "00:12",
      ratio: "9:16",
      summary: "X5 产品线千川跑量素材，多纯展镜头版本。",
      cover: "assets/images/cover-insta-x5-78.jpg",
      embed: "assets/videos/insta-x5-78.mp4",
      url: "",
      tags: ["AI 混剪", "纯展示", "深度种草"]
    },
    {
      title: "影石 360 · X5 混剪 79",
      category: "影石 360",
      role: "素材筛选 / AI 混剪",
      year: "2026",
      duration: "00:13",
      ratio: "9:16",
      summary: "X5 产品线千川跑量素材，4K 源素材下变换，多纯展镜头版本。",
      cover: "assets/images/cover-insta-x5-79.jpg",
      embed: "assets/videos/insta-x5-79.mp4",
      url: "",
      tags: ["AI 混剪", "纯展示", "深度种草"]
    },
    {
      title: "影石 360 · X5 混剪 82",
      category: "影石 360",
      role: "素材筛选 / AI 混剪",
      year: "2026",
      duration: "00:13",
      ratio: "9:16",
      summary: "X5 产品线千川跑量素材，多纯展镜头版本。",
      cover: "assets/images/cover-insta-x5-82.jpg",
      embed: "assets/videos/insta-x5-82.mp4",
      url: "",
      tags: ["AI 混剪", "纯展示", "深度种草"]
    },
    {
      title: "绿钻控油瓶 · AI 画面（反差猎奇）",
      category: "绿钻控油瓶",
      role: "剪辑 / AI 混剪",
      year: "2026",
      duration: "00:26",
      ratio: "9:16",
      summary: "以「前调是佛手柑的清爽」为卖点切入点，用 AI 生成的反差画面制造视觉钩子，配合千川投放测试。",
      cover: "assets/images/cover-lvzuan-ai-huamian.jpg",
      embed: "assets/videos/lvzuan-ai-huamian.mp4",
      url: "",
      tags: ["AI 生成画面", "反差猎奇", "自产"]
    },
    {
      title: "绿钻控油瓶 · 真人实拍（时效机制）",
      category: "绿钻控油瓶",
      role: "剪辑 / AI 混剪",
      year: "2026",
      duration: "00:29",
      ratio: "9:16",
      summary: "真人出镜口播版，以「刷到我你真的赚大了」的时效话术承接流量，突出活动机制。",
      cover: "assets/images/cover-lvzuan-shitai-ren-shixiao.jpg",
      embed: "assets/videos/lvzuan-shitai-ren-shixiao.mp4",
      url: "",
      tags: ["真人出镜", "时效机制", "自产"]
    },
    {
      title: "绿钻控油瓶 · 产品实拍（反差猎奇）",
      category: "绿钻控油瓶",
      role: "剪辑 / AI 混剪",
      year: "2026",
      duration: "00:16",
      ratio: "9:16",
      summary: "纯产品实拍版，用前后反差与场景冲突建立记忆点，不依赖出镜。",
      cover: "assets/images/cover-lvzuan-shitai-pin-fancha.jpg",
      embed: "assets/videos/lvzuan-shitai-pin-fancha.mp4",
      url: "",
      tags: ["产品实拍", "反差猎奇", "自产"]
    },
    {
      title: "绿钻控油瓶 · 实况图文（产品卖点）",
      category: "绿钻控油瓶",
      role: "剪辑 / AI 混剪",
      year: "2026",
      duration: "00:27",
      ratio: "9:16",
      summary: "实况图文形式，用静态画面 + 字幕信息流讲清「它不是普通的洗发水」的产品差异点。",
      cover: "assets/images/cover-lvzuan-shitai-pin-shikuang.jpg",
      embed: "assets/videos/lvzuan-shitai-pin-shikuang.mp4",
      url: "",
      tags: ["实况图文", "产品卖点", "自产"]
    },
    {
      title: "绿钻控油瓶 · 产品实拍（时效机制）",
      category: "绿钻控油瓶",
      role: "剪辑 / AI 混剪",
      year: "2026",
      duration: "00:30",
      ratio: "9:16",
      summary: "产品实拍 + 时效机制版本，围绕「这个新升级的」做卖点强化。",
      cover: "assets/images/cover-lvzuan-shitai-pin-shixiao.jpg",
      embed: "assets/videos/lvzuan-shitai-pin-shixiao.mp4",
      url: "",
      tags: ["产品实拍", "时效机制", "自产"]
    }
  ],

  /* ---------------- 图文作品 ----------------
     title      标题
     category   分类
     outlet     发表平台 / 刊物
     date       时间
     summary    摘要
     cover      封面图，可留空
     url        原文链接（如知网），可留空
     urlLabel   原文按钮的文字，可留空（默认「原文链接 ↗」）
     file       本地文件（如论文 PDF），可留空；有值时弹层多一个「查看全文」按钮
     fileLabel  本地文件按钮的文字，可留空（默认「查看本地文件 ↗」）
     -------------------------------------------------- */
    articleWorks: [
    {
      title: "微博热搜舆论结构分析：榜单热度与真实讨论量的错位",
      category: "数据项目",
      outlet: "自主采集 · Python 采集器 + 前端可视化",
      date: "2026.10",
      summary: "自建采集器抓取微博热搜前十话题的 30 条博文与 1206 条评论（覆盖率 35%），用四个切面呈现平台议程与公众讨论之间的偏差：榜单热度与实际评论量的错位、讨论的时间结构、账号类型对传播量的影响、评论者的地域分布。页面同时公开了抽样方法与覆盖率等局限。",
      cover: "assets/images/cover-weibo-insight.png",
      url: "weibo-insight/index.html",
      urlLabel: "查看完整分析页 ↗"
    },
    {
      title: "从部落到剧场微博与抖音用户平台化生存的媒介逻辑比较",
      category: "学术论文",
      outlet: "《大众电视》2026 年第 3 期",
      date: "2026.07 知网在线公开",
      summary: "以独立作者身份完成。研究认为社交媒体已从信息工具演化为数字生存的基础设施：电子媒介影像下的「次生口语文化」与社交媒体边界融合，使用户不得不在「意义共同体」建构与「感官自由」追逐之间寻求平衡；平台化生存的本质是技术逻辑对主体性的重塑，需警惕「加速社会」衍生的意义危机。",
      cover: "assets/images/cover-paper.png",
      url: "https://kns.cnki.net/kcms2/article/abstract?v=ArPsT4H1yBPBfto5wtMMxP2n948tVY8aWqV6CVqEvyei6j5e-nguV-4tYJN0Sp51poHGvqdDsMPJZi5I4-hDyXrLQCOpRTdHBAt4Yk28xd3vuoquCNSmYofUtPcZgiGOrJMIkgJgD-2-SumQ_14akyd1cznf6v9wRk1G_XGHiNgK_KejQ4YHxQ==",
      urlLabel: "知网原文 ↗",
      file: "assets/files/任建康-论文-从部落到剧场.pdf",
      fileLabel: "本地 PDF 全文 ↗"
    },
    {
      title: "环境公益维权，任重而道远",
      category: "新闻采编",
      outlet: "湖南工业大学报 · 2019 年 12 月第二版",
      date: "2019.12",
      summary: "在校党委宣传部学生通讯社期间撰写的校报刊发稿。以《环境公益诉讼的理论基础与制度构造》一书为线索，梳理我国环境公益诉讼的制度现状与实践困境。署名：李佳俊、任建康。",
      cover: "assets/images/cover-school-paper.png",
      url: ""
    },
    {
      title: "不耗水、不费电，能源清洁还能「自给自足」——北工大「零碳小屋」如何助力「双碳」？",
      category: "高校新媒体",
      outlet: "今日头条 · 高校新媒体矩阵",
      date: "2024",
      summary: "围绕党的二十大「双碳」目标，聚焦北京工业大学「零碳小屋」的技术细节与落地场景，用问题式标题切入科研转化议题。",
      cover: "assets/images/cover-toutiao-bjut-zero-carbon.png",
      url: "assets/articles/toutiao-bjut-zero-carbon.html",
      urlLabel: "阅读全文 ↗"
    },
    {
      title: "江南大学科研转化新成果：技术入选农业部主推，三家企业建立合作",
      category: "高校新媒体",
      outlet: "今日头条 · 高校新媒体矩阵",
      date: "2024",
      summary: "从产业需求出发，讲清江南大学水产加工技术入选农业部主推技术、并促成三家企业合作的路径。",
      cover: "assets/images/cover-toutiao-jiangnan-tech.png",
      url: "assets/articles/toutiao-jiangnan-tech.html",
      urlLabel: "阅读全文 ↗"
    },
    {
      title: "开发「未来能源」，推动技术国产化——湖北这位教授与高校把科技成果写在祖国油气田里",
      category: "高校新媒体",
      outlet: "今日头条 · 高校新媒体矩阵",
      date: "2024",
      summary: "以许明标教授团队为线索，讲页岩气开发技术的国产化过程，把科技成果落到油气田现场。",
      cover: "assets/images/cover-toutiao-yangtze-gas.png",
      url: "assets/articles/toutiao-yangtze-gas.html",
      urlLabel: "阅读全文 ↗"
    },
    {
      title: "自中学时代的一时兴趣到 Nature 刊发成果，中山大学这位教授「五年镀一膜」",
      category: "高校新媒体",
      outlet: "今日头条 · 高校新媒体矩阵",
      date: "2024",
      summary: "以「五年镀一膜」为切口，写中山大学郑治坤团队在 Nature 刊发成果背后的时间成本与产业意义。",
      cover: "assets/images/cover-toutiao-sysu-nature.png",
      url: "assets/articles/toutiao-sysu-nature.html",
      urlLabel: "阅读全文 ↗"
    }
  ],

  /* ---------------- 实习与实践 ---------------- */
  experiences: [
    {
      org: "旷世传声集团 · 西安微聚繁星电子商务有限公司",
      role: "直播运营 & AI 混剪实习生",
      period: "2026.04—2026.06",
      points: [
        "吉列剃须刀（直播运营）：参与抖音直播间全流程运营，熟练操作抖音罗盘、巨量千川等数据工具，实时监控流量与转化数据并优化投放策略；实习期间单日 GMV 稳定达 3 万元以上，日 ROI 维持在 2.5—3.2 区间。",
        "影石 360（AI 混剪）：负责千川跑量视频的素材筛选与 AI 辅助混剪，基于用户画像和爆款逻辑快速产出多版本创意素材；初步学习并应用 SeedDance 等 AI 工具进行动态画面生成。"
      ]
    },
    {
      org: "陕西广播电视台 · 体育休闲中心",
      role: "实习生",
      period: "2025.09—2025.11",
      points: [
        "根据栏目选题策划与内容需求，学习并熟悉专业相机器材与剪辑后期流程，独立完成新闻素材的采集与编辑。",
        "熟练运用 Edius、Photoshop、Premiere Pro 进行视频剪辑、画面调色及音效处理，确保成片质量达标。",
        "参与节目前期脚本撰写与拍摄协调，提升内容制作效率与专业度。"
      ]
    },
    {
      org: "西安斯奈特科技服务有限公司",
      role: "新媒体运营",
      period: "2024.04—2024.06",
      points: [
        "负责高校新媒体矩阵（今日头条）内容运营，聚焦高校学习动态与招生信息，日均发布 2 篇原创文章，平均阅读量稳定 1w。",
        "运用头条后台数据分析工具优化标题、配图及发布时间，使文章平均阅读与用户互动率提高 28%，助力考生关注度持续增长。"
      ]
    },
    {
      org: "湖南工业大学 校党委宣传部 · 学生通讯社",
      role: "文字部部长",
      period: "2019—2020",
      points: [
        "负责学校党委机关信息收发，采编校园师生学术动态，组织审核成稿后刊登于校刊。",
        "任翻译 1801 班宣传委员、团支书，负责班级与学院组织部、宣传部的工作交接与落实。"
      ]
    }
  ],

  /* ---------------- 联系方式 ----------------
     name   显示名称
     handle 号码 / 账号 / 地址
     url    可点击的链接（如 mailto:、tel:）；留空则只显示号码，不可点击
     -------------------------------------------------- */
  socials: [
    { name: "手机", handle: "15829577031", url: "" },
    { name: "邮箱", handle: "leavy0804@foxmail.com", url: "mailto:leavy0804@foxmail.com" },
    { name: "微信", handle: "Lemon0143", url: "" }
  ]
};
