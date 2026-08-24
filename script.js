(function () {
  var root = document.documentElement;
  root.classList.add("js-enabled");

  var themeKey = "yuan-portfolio-theme";
  var fontKey = "yuan-portfolio-font";
  var languageKey = "yuan-portfolio-language";
  var storage = null;

  try {
    storage = window.localStorage || null;
  } catch (error) {
    storage = null;
  }

  var savedTheme = storage ? storage.getItem(themeKey) : null;
  var savedLanguage = storage ? storage.getItem(languageKey) : null;

  if (storage) {
    storage.removeItem(fontKey);
  }

  if (savedTheme === "dark" || savedTheme === "light") {
    root.dataset.theme = savedTheme;
  }

  var themeButton = document.querySelector("[data-theme-toggle]");
  var languageButton = document.querySelector("[data-language-toggle]");
  var isHomePage = document.body.classList.contains("home-page");
  var currentLanguage = savedLanguage === "en" ? "en" : "zh";

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      if (storage) storage.setItem(themeKey, nextTheme);
    });
  }

  if (isHomePage) {
    var homeCopy = {
      zh: {
        languageTitle: "切换英文版",
        title: "Yuan | 智能硬件海外增长与商业化",
        description: "Yuan 的 AI / 机器人 / 智能硬件出海作品集：北美市场前测、用户研究、渠道销售与早期商业化。",
        skipLink: "跳到主要内容",
        themeTitle: "切换深色模式",
        nav: ["首页", "项目", "经历"],
        sidebar: ["关于", "项目", "经历"],
        introRole: "智能硬件海外增长与商业化",
        introButtons: ["查看项目", "联系我"],
        about: [
          "我关注早期硬件产品最不确定的一段：谁会买、为什么买、通过什么渠道触达、怎样转化为真实成交。",
          "过去的工作横跨北美市场前测、用户研究、机器人渠道销售、Amazon 多站点运营和智能硬件打样量产，因此我既能看用户和转化数据，也理解硬件交付、成本结构和供应链约束。"
        ],
        sectionTitles: ["项目", "经历", "内容与工程实践", "联系"],
        skillTitle: "技能",
        toolTitle: "小工具",
        skills: [
          {
            title: "增长与验证",
            tags: [
              "Meta Business Manager",
              "Facebook",
              "Instagram",
              "Reddit",
              "WhatsApp",
              "KickoffLabs",
              "Jotform",
              "Mailchimp",
              "用户访谈",
              "问卷调研"
            ]
          },
          {
            title: "商业化与运营",
            tags: ["线索筛选", "客户分层", "ROI Selling", "报价策略", "渠道政策", "Amazon 运营", "Listing 优化", "库存周转"]
          },
          {
            title: "产品与硬件",
            tags: ["PRD", "BP", "供应链调研", "样机打样", "CMF", "工厂 SOP", "SolidWorks", "AutoCAD", "Shapr3D", "3D 打印"]
          },
          {
            title: "语言与工具",
            tags: ["英语工作语言", "德语日常交流", "Figma", "Canva", "CapCut", "Python"]
          }
        ],
        tools: [
          {
            title: "PMF 访谈",
            links: ["JabX PMF 访谈研究控制台"]
          },
          {
            title: "品牌调研",
            links: ["拓竹 Bambu Lab 深度调研报告"]
          },
          {
            title: "知识地图",
            links: ["机器人本体通信教学", "Robotics Knowledge Map", "术语地图"]
          },
          {
            title: "语言练习",
            links: ["IELTS Dictation", "IELTS Copy", "Shadowing Lab", "德语单词抄写"]
          }
        ],
        projects: [
          {
            title: "AI 格斗机器人商业化",
            caption: "AI 格斗机器人 · 商业化 · 渠道销售",
            description:
              "作为公司首位销售，我从 0 到 1 搭建 AI 格斗机器人商业化流程，覆盖展会获客、客户分层、报价、代理政策、合同、付款方式、交付边界和售后反馈。累计沉淀约 500 个有效线索，成交 25 台设备，确认回款约 150 万元，并推动单台报价和毛利率提升。",
            alt: "AI 格斗机器人展会演示现场",
            tools: ["渠道销售", "展会获客", "ROI Selling", "合同交付", "自有品牌"]
          },
          {
            title: "JabX 北美 PMF 前测",
            caption: "JabX 北美 · PMF 前测",
            description:
              "面向北美家庭健身用户，我用 Meta 广告、KickoffLabs、问卷和访谈测试“拳击有氧设备”“家庭互动健身”“Physical AI Coach”三类表达。项目累计获取 1,202 leads、459 份问卷、35 位付费意向用户，帮助团队判断 Home 设备版更适合作为近期入口，Robot 概念版适合作为长期方向保留。",
            alt: "JabX 北美 PMF 前测项目封面",
            tools: ["KickoffLabs", "Meta 广告", "问卷调研", "用户访谈", "付费意向筛选"]
          },
          {
            title: "家庭健身机器人用户研究与运营",
            caption: "家庭健身机器人 · 用户研究与运营",
            description:
              "在广告前测之外，我继续通过 50+ 场海外用户访谈、Reddit 社区调研、20+ 海外 KOC 建联、150+ WhatsApp 社群用户和在深外籍人士线下体验，补充真实用户反馈，优化产品表达、触达话术和体验流程，并沉淀家庭使用场景、拳击有氧接受度和 AI 教练价值相关洞察。",
            alt: "JabX 家庭健身机器人产品测试画面",
            tools: ["海外访谈", "Reddit 调研", "WhatsApp 社群", "线下体验", "用户共创"]
          }
        ],
        experiences: [
          {
            date: "2026.01 - 至今",
            kicker: "家庭健身机器人",
            company: "深圳市迁星智能科技有限公司",
            title: "JabX 北美市场前测与用户增长",
            description:
              "围绕产品上线前的表达、目标人群和用户证据，拆分市场前测与用户研究两条链路，持续验证北美家庭健身用户对拳击有氧、家庭互动健身和 Physical AI Coach 的接受度。",
            tags: ["三类市场表达测试", "Meta 冷启动投放", "KickoffLabs", "问卷与访谈", "WhatsApp 社群", "线下体验反馈"]
          },
          {
            date: "2025.09 - 2026.04",
            kicker: "AI 格斗机器人",
            company: "深圳市迁星智能科技有限公司",
            title: "AI 格斗机器人商业化",
            description:
              "作为公司首位销售，把早期具身智能娱乐硬件从低价贴牌假设，推进为自有品牌、直销和渠道并行的成交路径，并搭建线索、报价、合同、交付、售后和供应链反馈闭环。",
            link: "查看 AI 格斗机器人项目",
            tags: ["渠道销售 0 到 1", "展会获客", "客户分层", "ROI Selling", "合同体系", "售后与供应链反馈"]
          },
          {
            date: "2025.06 - 2025.08",
            kicker: "中科院科研项目",
            company: "山参有约健康科技（深圳）有限公司",
            title: "科研成果转化项目市场 0 到 1",
            description: "负责科研成果转化项目的市场冷启动，用通俗内容解释科研产品价值，并开拓养老机构、中医诊所等合作渠道，推动“店中店”试点。",
            link: "查看科研项目",
            tags: ["内容冷启动", "小红书与公众号", "私域社群", "渠道开拓", "店中店试点"]
          },
          {
            date: "2024.10 - 2025.03",
            kicker: "儿童教育娱乐机器人",
            company: "深圳科创学院",
            title: "魔术机器人产品经理",
            description:
              "主导儿童教育娱乐魔术机器人立项和产品定义，整合魔术师、教育机构和学校资源，搭建 13 人团队并完成香港学校测试，验证 2B2C 模式可行性。",
            link: "深圳科创学院官网",
            tags: ["产品定义", "国际化团队管理", "教育娱乐场景", "资源整合", "香港学校测试", "2B2C 验证"]
          },
          {
            date: "2024.04 - 2024.10",
            kicker: "跨境电商 3C 类产品",
            company: "深圳市李森智能有限公司",
            title: "亚马逊运营：美国 / 德国 / 沙特",
            description:
              "负责 Amazon 美国站、德国站日常运营，并从 0 到 1 搭建沙特站账号。通过 Listing 优化、广告投放、库存管理、本土化表达和评价修复，推动新品从 0 到 BSR、老品销量和毛利提升。",
            link: "查看 3C 产品",
            tags: ["Amazon 多站点运营", "Listing 优化", "广告转化", "库存预测", "评价修复", "大促 SOP"]
          },
          {
            date: "2022.08 - 2024.04",
            kicker: "运动恢复护膝",
            company: "深圳科创学院",
            title: "智能冰热敷按摩护膝联合创始人",
            description:
              "负责柔性穿戴结构从 0 到 1 研发，推进 ID、样机、CMF、车缝工艺和工厂 SOP，推动产品完成小批量打样到 500 台量产爬坡，并参与融资路演材料梳理。",
            link: "查看运动恢复护膝",
            tags: ["柔性结构研发", "供应链调研", "样机打样", "CMF", "工厂 SOP", "量产爬坡"]
          }
        ],
        contentCards: [
          {
            platform: "公众号 yuan-y00",
            title: "机器人与出海方法沉淀",
            description: "记录机器人、智能硬件出海、渠道销售和用户研究相关观察，也会把项目中跑过的方法整理成 SOP。",
            links: ["渠道销售 SOP", "KOL 运营 SOP"],
            alt: "公众号 Yuan-y00 主页截图"
          },
          {
            platform: "小红书 yuan",
            title: "德语内容与用户反馈",
            description: "持续更新德语学习内容，练习选题、表达拆解、内容发布和用户反馈迭代。",
            links: ["查看德语内容"],
            alt: "小红书 yuan 主页截图"
          },
          {
            platform: "工程项目",
            title: "三自由度机械臂",
            description: "我重做了机械臂的大部分机械结构，编写控制程序并完成软硬件调试。视频用英文记录了设计、搭建和排查问题的过程。",
            links: ["项目介绍视频"],
            alt: "三自由度机械臂项目截图"
          }
        ],
        contactTitle: "联系",
        contactGitHub: "GitHub：yuan-y00",
        footerName: "Yuan",
        footerDesc: "智能硬件海外增长与商业化。",
        footerNav: ["首页", "项目", "经历"],
        footerCopyright: "© 2026 版权所有。",
        modalLink: "查看完整项目",
        modalTools: "工具与方法",
        modalClose: "关闭项目详情"
      },
      en: {
        languageTitle: "Switch to Chinese",
        title: "Yuan | Smart Hardware GTM & Growth",
        description: "Yuan's AI / robot / smart hardware portfolio: North America PMF testing, user research, channel sales, and early GTM.",
        skipLink: "Skip to main content",
        themeTitle: "Toggle dark mode",
        nav: ["Home", "Projects", "Experience"],
        sidebar: ["About", "Projects", "Experience"],
        introRole: "Smart Hardware GTM & Growth",
        introButtons: ["View Projects", "Contact Me"],
        about: [
          "I’m into the messy part of early hardware: who actually wants it, where they hang out, what message clicks, and how that turns into real orders.",
          "My background spans North America PMF tests, user research, robot GTM, Amazon Ops, and smart hardware prototyping, so I can jump between ads, calls, sales, product tradeoffs, delivery cost, and supplier reality without losing the thread."
        ],
        sectionTitles: ["Projects", "Experience", "Posts & Builds", "Contact"],
        skillTitle: "Skills",
        toolTitle: "Tools",
        skills: [
          {
            title: "Growth & Validation",
            tags: [
              "Meta Business Manager",
              "Facebook",
              "Instagram",
              "Reddit",
              "WhatsApp",
              "KickoffLabs",
              "Jotform",
              "Mailchimp",
              "User Interviews",
              "Surveys"
            ]
          },
          {
            title: "GTM & Ops",
            tags: ["Lead Screening", "Segmentation", "ROI Selling", "Pricing", "Channel Policy", "Amazon Ops", "Listing Optimization", "Inventory Turnover"]
          },
          {
            title: "Product & Hardware",
            tags: ["PRD", "BP", "Supplier Research", "Prototyping", "CMF", "Factory SOP", "SolidWorks", "AutoCAD", "Shapr3D", "3D Printing"]
          },
          {
            title: "Language & Tools",
            tags: ["Working English", "Conversational German", "Figma", "Canva", "CapCut", "Python"]
          }
        ],
        tools: [
          {
            title: "PMF Interviews",
            links: ["JabX PMF Interview Console"]
          },
          {
            title: "Brand Research",
            links: ["Bambu Lab Deep-Dive Report"]
          },
          {
            title: "Knowledge Map",
            links: ["Robot Body Comms Guide", "Robotics Knowledge Map", "Terms Map"]
          },
          {
            title: "Language Practice",
            links: ["IELTS Dictation", "IELTS Copy", "Shadowing Lab", "German Copywork"]
          }
        ],
        projects: [
          {
            title: "AI Fighting Robot GTM",
            caption: "AI Fighting Robot · GTM · Channel Sales",
            description:
              "As the first sales hire, I built the GTM flow from zero: expo leads, lead segmentation, pricing, channel policy, contracts, payment, delivery boundaries, and after-sales feedback. I brought in roughly 500 qualified leads, closed 25 units, locked in about RMB 1.5M in confirmed revenue, and pushed both pricing and gross margin up.",
            alt: "AI Fighting Robot expo demo",
            tools: ["Channel Sales", "Expo Leads", "ROI Selling", "Contract Delivery", "Own Brand"]
          },
          {
            title: "JabX North America PMF Test",
            caption: "JabX North America · PMF Test",
            description:
              "For North American home-fitness users, I used Meta ads, KickoffLabs, surveys, and interviews to test three messages: boxing cardio gear, interactive home fitness, and a Physical AI Coach. The project pulled in 1,202 leads, 459 survey responses, and 35 paid-intent users, which helped the team keep the Home device as the near-term path and the Robot concept as the long game.",
            alt: "JabX North America PMF test cover",
            tools: ["KickoffLabs", "Meta Ads", "Surveys", "User Interviews", "Paid Intent"]
          },
          {
            title: "Home Fitness Robot Research & Ops",
            caption: "Home Fitness Robot · Research & Ops",
            description:
              "Beyond ad testing, I kept the loop going with 50+ overseas interviews, Reddit research, 20+ KOL/KOC connections, 150+ WhatsApp group members, and offline tests with expats in Shenzhen. That gave us cleaner feedback on the product story, outreach copy, use cases, boxing-cardio adoption, and the long-term AI coach angle.",
            alt: "JabX home fitness robot testing scene",
            tools: ["Overseas Interviews", "Reddit Research", "WhatsApp Group", "Offline Tests", "User Co-creation"]
          }
        ],
        experiences: [
          {
            date: "2026.01 - Present",
            kicker: "Home Fitness Robot",
            company: "Qxbot Innovation Co, Limited",
            title: "JabX North America PMF Test & Growth",
            description:
              "I split the pre-launch work into message testing and user proof, then kept pressure-testing whether North American home-fitness users actually wanted boxing cardio, interactive home fitness, and a Physical AI Coach.",
            tags: ["Message Tests", "Meta Cold Start", "KickoffLabs", "Surveys & Calls", "WhatsApp Group", "Offline Feedback"]
          },
          {
            date: "2025.09 - 2026.04",
            kicker: "AI Fighting Robot",
            company: "Qxbot Innovation Co, Limited",
            title: "AI Fighting Robot GTM",
            description:
              "As the first sales hire, I moved early embodied-AI entertainment hardware away from the low-price private-label idea and toward a path that mixed own brand, direct sales, and channel deals. I built the loop around leads, pricing, contracts, delivery, after-sales, and supplier feedback.",
            link: "Open AI Fighting Robot",
            tags: ["0→1 Sales", "Expo Leads", "Segmentation", "ROI Selling", "Contracts", "After-sales Feedback"]
          },
          {
            date: "2025.06 - 2025.08",
            kicker: "CAS Research Project",
            company: "Ginpact Health Technology (Shenzhen) Co., Ltd.",
            title: "Research-to-Market 0→1",
            description:
              "I handled the market cold start for a research commercialization project, turned the science into everyday language, and opened channels with elder-care centers and TCM clinics. We also piloted an in-store corner setup.",
            link: "Open Research Project",
            tags: ["Content Cold Start", "RedNote & WeChat", "Private Community", "Channel Outreach", "Store-in-Store Pilot"]
          },
          {
            date: "2024.10 - 2025.03",
            kicker: "Kids Edutainment Robot",
            company: "Shenzhen InnoX Academy",
            title: "Magic Robot PM",
            description:
              "I led product definition for a kids edutainment magic robot, pulled together a 13-person team, and finished a Hong Kong school test to see if the 2B2C setup could work.",
            link: "Shenzhen InnoX Academy",
            tags: ["Product Definition", "Global Teaming", "Edutainment", "Resource Match", "HK School Test", "2B2C Validation"]
          },
          {
            date: "2024.04 - 2024.10",
            kicker: "Cross-border 3C Products",
            company: "Shenzhen Lisen Intelligent Co., Ltd.",
            title: "Amazon Ops: US / DE / KSA",
            description:
              "I ran Amazon US and DE daily ops and set up the Saudi account from scratch. Listing tweaks, ads, inventory, local copy, and review recovery helped new ASINs climb to BSR while old SKUs kept scaling.",
            link: "View 3C Product",
            tags: ["Amazon Multi-market Ops", "Listing Tuning", "Ad Conversion", "Inventory Forecasting", "Review Fixes", "Promo SOP"]
          },
          {
            date: "2022.08 - 2024.04",
            kicker: "Recovery Knee Brace",
            company: "Shenzhen InnoX Academy",
            title: "Smart Recovery Knee Brace Cofounder",
            description:
              "I owned the soft wearable structure from 0 to 1, then pushed ID, prototyping, CMF, sewing, and factory SOPs until the product moved from small-batch samples to a 500-unit ramp.",
            link: "View Knee Brace",
            tags: ["Wearable R&D", "Supplier Research", "Prototyping", "CMF", "Factory SOP", "Ramp-up"]
          }
        ],
        contentCards: [
          {
            platform: "WeChat yuan-y00",
            title: "Robot & Overseas Playbooks",
            description: "I share what I learn from robot GTM, smart hardware overseas growth, channel sales, and user research. Some of the working methods get turned into SOPs.",
            links: ["Channel Sales SOP", "Creator Ops SOP"],
            alt: "WeChat profile screenshot for yuan-y00"
          },
          {
            platform: "RedNote yuan",
            title: "German Practice & Feedback",
            description: "I keep posting German-learning content and use it to sharpen topic picks, phrasing, publishing, and feedback loops.",
            links: ["View German Content"],
            alt: "RedNote profile screenshot for yuan"
          },
          {
            platform: "Engineering Project",
            title: "3-DOF Robot Arm",
            description: "I rebuilt most of the mechanical structure, wrote the control code, and debugged the hardware/software stack. The video is in English and walks through the design, build, and troubleshooting.",
            links: ["Project Walkthrough"],
            alt: "3-DOF robot arm project screenshot"
          }
        ],
        contactTitle: "Contact",
        contactGitHub: "GitHub: yuan-y00",
        footerName: "Yuan",
        footerDesc: "Smart Hardware GTM & Growth.",
        footerNav: ["Home", "Projects", "Experience"],
        footerCopyright: "© 2026 All rights reserved.",
        modalLink: "View full project",
        modalTools: "Tools & Methods",
        modalClose: "Close project detail"
      }
    };

    function setTextList(nodes, values) {
      Array.from(nodes).forEach(function (node, index) {
        if (values[index] !== undefined) {
          node.textContent = values[index];
        }
      });
    }

    function setTitleAndDescription(copy) {
      document.title = copy.title;
      var description = document.querySelector('meta[name="description"]');
      var ogTitle = document.querySelector('meta[property="og:title"]');
      var ogDescription = document.querySelector('meta[property="og:description"]');

      if (description) description.setAttribute("content", copy.description);
      if (ogTitle) ogTitle.setAttribute("content", copy.title);
      if (ogDescription) ogDescription.setAttribute("content", copy.description);
    }

    function syncLanguageButton(copy, language) {
      if (!languageButton) return;
      var options = languageButton.querySelectorAll("[data-lang-option]");
      options.forEach(function (option) {
        option.classList.toggle("is-active", option.dataset.langOption === language);
      });
      languageButton.setAttribute("aria-label", copy.languageTitle);
      languageButton.setAttribute("title", copy.languageTitle);
      languageButton.setAttribute("aria-pressed", String(language === "en"));
    }

    function applyLanguage(language) {
      var copy = homeCopy[language] || homeCopy.zh;

      root.dataset.lang = language;
      document.documentElement.lang = language === "en" ? "en" : "zh-CN";
      setTitleAndDescription(copy);

      var skipLink = document.querySelector(".skip-link");
      if (skipLink) skipLink.textContent = copy.skipLink;

      var navbar = document.querySelector(".navbar");
      if (navbar) navbar.setAttribute("aria-label", language === "en" ? "Main navigation" : "主导航");

      var sidebar = document.querySelector("#scroll-sidebar");
      if (sidebar) sidebar.setAttribute("aria-label", language === "en" ? "Page outline" : "页面目录");

      var footerNavWrap = document.querySelector(".footer-links");
      if (footerNavWrap) footerNavWrap.setAttribute("aria-label", language === "en" ? "Footer navigation" : "页脚导航");

      if (themeButton) {
        themeButton.setAttribute("aria-label", copy.themeTitle);
        themeButton.setAttribute("title", copy.themeTitle);
      }

      setTextList(document.querySelectorAll(".nav-menu .nav-link"), copy.nav);
      setTextList(document.querySelectorAll("#scroll-sidebar .sdot-label"), copy.sidebar);

      var introRole = document.querySelector(".intro-role");
      if (introRole) introRole.textContent = copy.introRole;

      var introImage = document.querySelector(".intro-photo img");
      if (introImage) introImage.alt = language === "en" ? "Portrait of Yuan" : "Yuan 个人照片";

      setTextList(document.querySelectorAll(".intro-actions .btn"), copy.introButtons);
      setTextList(document.querySelectorAll(".about-section p"), copy.about);

      var projectTitle = document.querySelector(".cad-gallery-title");
      if (projectTitle) projectTitle.textContent = copy.sectionTitles[0];

      var sectionExperience = document.querySelector("#experience .section-title");
      if (sectionExperience) sectionExperience.textContent = copy.sectionTitles[1];

      var sectionWriting = document.querySelector("#writing .section-title");
      if (sectionWriting) sectionWriting.textContent = copy.sectionTitles[2];

      var sectionContact = document.querySelector("#contact .section-title");
      if (sectionContact) sectionContact.textContent = copy.sectionTitles[3];

      var skillTitle = document.querySelector("#skills .tools-title");
      if (skillTitle) skillTitle.textContent = copy.skillTitle;

      var toolTitle = document.querySelector("#tools .tools-title");
      if (toolTitle) toolTitle.textContent = copy.toolTitle;

      Array.from(document.querySelectorAll(".skill-group")).forEach(function (group, index) {
        var skillCopy = copy.skills[index];
        if (!skillCopy) return;
        var heading = group.querySelector("h3");
        if (heading) heading.textContent = skillCopy.title;
        setTextList(group.querySelectorAll(".skill-tags span"), skillCopy.tags);
      });

      Array.from(document.querySelectorAll(".tool-group")).forEach(function (group, index) {
        var toolCopy = copy.tools[index];
        if (!toolCopy) return;
        var heading = group.querySelector("h3");
        if (heading) heading.textContent = toolCopy.title;
        setTextList(group.querySelectorAll(".tool-links a"), toolCopy.links);
      });

      Array.from(document.querySelectorAll(".cad-photo-wrap")).forEach(function (card, index) {
        var projectCopy = copy.projects[index];
        if (!projectCopy) return;
        card.dataset.title = projectCopy.title;
        card.dataset.tools = projectCopy.tools.join("|");
        var cap = card.querySelector(".cad-photo-cap");
        if (cap) cap.textContent = projectCopy.caption;
        var modalCopy = card.querySelector(".modal-copy p");
        if (modalCopy) modalCopy.textContent = projectCopy.description;
        var img = card.querySelector("img");
        if (img) img.alt = projectCopy.alt;
      });

      Array.from(document.querySelectorAll(".experience-item")).forEach(function (item, index) {
        var expCopy = copy.experiences[index];
        if (!expCopy) return;
        var date = item.querySelector(".experience-date");
        var kicker = item.querySelectorAll(".experience-kicker span");
        var title = item.querySelector("h3");
        var summary = item.querySelector("p");
        var link = item.querySelector(".experience-link");

        if (date) date.textContent = expCopy.date;
        if (kicker[0]) kicker[0].textContent = expCopy.kicker;
        if (kicker[1]) kicker[1].textContent = expCopy.company;
        if (title) title.textContent = expCopy.title;
        if (summary) summary.textContent = expCopy.description;
        if (link && expCopy.link) link.textContent = expCopy.link;

        setTextList(item.querySelectorAll(".experience-scope li:not(.experience-link-item)"), expCopy.tags);
      });

      Array.from(document.querySelectorAll(".project-card")).forEach(function (card, index) {
        var contentCopy = copy.contentCards[index];
        if (!contentCopy) return;
        var platform = card.querySelector(".content-platform");
        var title = card.querySelector(".project-content h3");
        var description = card.querySelector(".project-content > p:not(.content-platform)");
        if (platform) platform.textContent = contentCopy.platform;
        if (title) title.textContent = contentCopy.title;
        if (description) description.textContent = contentCopy.description;
        var image = card.querySelector("img");
        if (image && contentCopy.alt) image.alt = contentCopy.alt;
        setTextList(card.querySelectorAll(".content-tags a"), contentCopy.links);
      });

      var contactButton = document.querySelector("#contact .btn-primary");
      if (contactButton) contactButton.textContent = copy.contactGitHub;

      var footerIntro = document.querySelectorAll(".footer-row > div p");
      setTextList(footerIntro, [copy.footerName, copy.footerDesc]);

      var footerNav = document.querySelectorAll(".footer-links a");
      setTextList(footerNav, copy.footerNav);

      var footerCopyright = document.querySelector(".footer-row > p");
      if (footerCopyright) footerCopyright.textContent = copy.footerCopyright;

      var modalLink = document.querySelector("#pm-link");
      var modalToolsLabel = document.querySelector(".pm-tools-label");
      var modalClose = document.querySelector(".pm-close");
      if (modalLink) modalLink.textContent = copy.modalLink;
      if (modalToolsLabel) modalToolsLabel.textContent = copy.modalTools;
      if (modalClose) modalClose.setAttribute("aria-label", copy.modalClose);

      syncLanguageButton(copy, language);
      if (activeProjectCard && modal && modal.classList.contains("open")) {
        openProjectModal(activeProjectCard);
      }
    }

    applyLanguage(currentLanguage);

    if (languageButton) {
      languageButton.addEventListener("click", function () {
        currentLanguage = currentLanguage === "en" ? "zh" : "en";
        if (storage) storage.setItem(languageKey, currentLanguage);
        applyLanguage(currentLanguage);
      });
    }
  }

  var hamburger = document.querySelector(".hamburger");
  var navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("active");
      hamburger.classList.toggle("active", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var cursorDot = document.querySelector("#cursorDot");
  var cursorRing = document.querySelector("#cursorRing");

  if (finePointer && !reduceMotion && cursorDot && cursorRing) {
    root.classList.add("has-custom-cursor");
    document.body.classList.add("has-pointer");

    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var dotX = targetX;
    var dotY = targetY;
    var ringX = targetX;
    var ringY = targetY;

    function renderCursor() {
      dotX += (targetX - dotX) * 0.72;
      dotY += (targetY - dotY) * 0.72;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      cursorDot.style.transform = "translate(" + dotX + "px, " + dotY + "px) translate(-50%, -50%)";
      cursorRing.style.transform = "translate(" + ringX + "px, " + ringY + "px) translate(-50%, -50%)";
      window.requestAnimationFrame(renderCursor);
    }

    window.addEventListener("pointermove", function (event) {
      targetX = event.clientX;
      targetY = event.clientY;
    });

    document.querySelectorAll("a, button, .cad-photo-wrap").forEach(function (item) {
      item.addEventListener("pointerenter", function () {
        document.body.classList.add("cursor-hover");
      });
      item.addEventListener("pointerleave", function () {
        document.body.classList.remove("cursor-hover");
      });
    });

    window.requestAnimationFrame(renderCursor);
  }

  var srItems = Array.from(document.querySelectorAll(".sr"));

  function revealItem(item) {
    item.classList.add("sr-visible");
  }

  function revealVisibleItems() {
    srItems.forEach(function (item) {
      if (item.classList.contains("sr-visible")) return;
      var rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.12) {
        revealItem(item);
      }
    });
  }

  if ("IntersectionObserver" in window && !reduceMotion) {
    var srObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealItem(entry.target);
            srObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "12% 0px 12% 0px", threshold: 0 }
    );

    srItems.forEach(function (item) {
      srObserver.observe(item);
    });
  } else {
    srItems.forEach(function (item) {
      revealItem(item);
    });
  }

  revealVisibleItems();
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  window.addEventListener("resize", revealVisibleItems);

  var filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  var galleryItems = Array.from(document.querySelectorAll(".cad-photo-wrap[data-category]"));

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.dataset.filter || "all";
      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      galleryItems.forEach(function (item) {
        var categories = item.dataset.category || "";
        item.classList.toggle("cad-filtered-out", filter !== "all" && !categories.includes(filter));
      });
    });
  });

  document.querySelectorAll("[data-live-loop]").forEach(function (board) {
    var handle = board.querySelector(".loop-handle");
    var dragging = false;

    function moveHandle(event) {
      var rect = board.getBoundingClientRect();
      var x = Math.max(8, Math.min(92, ((event.clientX - rect.left) / rect.width) * 100));
      var y = Math.max(12, Math.min(88, ((event.clientY - rect.top) / rect.height) * 100));
      board.style.setProperty("--handle-x", x.toFixed(1) + "%");
      board.style.setProperty("--handle-y", y.toFixed(1) + "%");
    }

    if (!handle) return;

    handle.addEventListener("pointerdown", function (event) {
      dragging = true;
      handle.setPointerCapture(event.pointerId);
      moveHandle(event);
    });

    handle.addEventListener("pointermove", function (event) {
      if (dragging) moveHandle(event);
    });

    handle.addEventListener("pointerup", function (event) {
      dragging = false;
      handle.releasePointerCapture(event.pointerId);
    });

    handle.addEventListener("pointercancel", function () {
      dragging = false;
    });
  });

  var sidebar = document.querySelector("#scroll-sidebar");
  var sidebarFill = document.querySelector("#sidebar-fill");
  var sidebarDots = Array.from(document.querySelectorAll(".sdot[data-target]"));
  var trackedSections = sidebarDots
    .map(function (dot) {
      return document.getElementById(dot.dataset.target);
    })
    .filter(Boolean);

  function updateSidebar() {
    if (!sidebar || !trackedSections.length) return;

    var scrollY = window.scrollY || window.pageYOffset;
    var docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    sidebar.classList.toggle("visible", scrollY > 240);

    if (sidebarFill) {
      sidebarFill.style.height = Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) + "%";
    }

    var current = trackedSections[0].id;
    trackedSections.forEach(function (section) {
      if (section.getBoundingClientRect().top < window.innerHeight * 0.42) {
        current = section.id;
      }
    });

    sidebarDots.forEach(function (dot) {
      dot.classList.toggle("active", dot.dataset.target === current);
    });
  }

  sidebarDots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var section = document.getElementById(dot.dataset.target);
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  window.addEventListener("scroll", updateSidebar, { passive: true });
  window.addEventListener("resize", updateSidebar);
  updateSidebar();

  var modal = document.querySelector("#photo-modal");
  var modalImage = document.querySelector("#pm-img");
  var modalTitle = document.querySelector("#pm-title");
  var modalDesc = document.querySelector("#pm-desc");
  var modalTools = document.querySelector("#pm-tools-list");
  var modalLink = document.querySelector("#pm-link");
  var lastFocused = null;
  var activeProjectCard = null;

  function closeProjectModal() {
    if (!modal || !modalImage) return;
    modal.classList.remove("open");
    modal.classList.remove("media-wide");
    modal.setAttribute("aria-hidden", "true");
    modalImage.removeAttribute("src");
    modalImage.alt = "";
    if (lastFocused) lastFocused.focus();
  }

  function openProjectModal(card) {
    if (!modal || !modalImage || !modalTitle || !modalDesc || !modalTools) return;
    activeProjectCard = card;
    lastFocused = document.activeElement;
    var copy = card.querySelector(".modal-copy");
    var title = card.dataset.title || card.innerText.trim();
    var desc = copy ? copy.innerText.trim() : "";
    var image = card.dataset.image || "";
    var tools = (card.dataset.tools || "").split("|").filter(Boolean);

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImage.src = image;
    modalImage.alt = title;
    modal.classList.toggle("media-wide", card.dataset.modalLayout === "wide");
    modalTools.innerHTML = "";
    tools.forEach(function (tool) {
      var tag = document.createElement("span");
      tag.className = "pm-tool-tag";
      tag.textContent = tool;
      modalTools.appendChild(tag);
    });

    if (modalLink) {
      if (card.dataset.link) {
        modalLink.href = card.dataset.link;
        modalLink.style.display = "";
      } else {
        modalLink.style.display = "none";
      }
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    var closeButton = modal.querySelector(".pm-close");
    if (closeButton) closeButton.focus();
  }

  galleryItems.forEach(function (card) {
    card.tabIndex = 0;
    card.addEventListener("click", function (event) {
      if (event.target.closest(".loop-handle")) return;
      openProjectModal(card);
    });
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectModal(card);
      }
    });
  });

  if (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach(function (closer) {
      closer.addEventListener("click", closeProjectModal);
    });
  }

  var lightbox = document.querySelector("[data-lightbox-root]");
  var lightboxImage = lightbox ? lightbox.querySelector("img") : null;
  var closeButton = document.querySelector("[data-lightbox-close]");
  var lastLightboxFocus = null;

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    if (lastLightboxFocus) lastLightboxFocus.focus();
  }

  document.querySelectorAll("[data-lightbox-src]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!lightbox || !lightboxImage) return;
      lastLightboxFocus = button;
      lightboxImage.src = button.dataset.lightboxSrc;
      lightboxImage.alt = button.dataset.lightboxAlt || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      if (closeButton) closeButton.focus();
    });
  });

  if (closeButton) closeButton.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeProjectModal();
      closeLightbox();
    }
  });
})();
