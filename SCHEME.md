[SCHEME]
项目名称：7u93n3-clone（探索与成长博客）
原始站点：https://7u93n3.cn/
目标：模仿原始站点的视觉风格与内容结构，进行视觉优化后部署到 GitHub Pages

技术栈：
  - HTML5（语义化标签）
  - Tailwind CSS（CDN 引入，零构建步骤）
  - Vanilla JavaScript（ES6+，无框架依赖）
  - Google Fonts（Noto Sans SC + Noto Serif SC）
  - GitHub Pages + GitHub Actions（自动部署）

目录结构：
  7u93n3-clone/
  ├── index.html              # 主页面（含所有内容）
  ├── css/
  │   └── style.css           # 自定义样式（动画、深色模式、排版）
  ├── js/
  │   ├── articles.js         # 文章数据（6 篇结构化文章）
  │   └── main.js             # 交互逻辑（筛选、主题、菜单、模态窗口）
  ├── .nojekyll               # 禁用 Jekyll
  ├── .github/
  │   └── workflows/
  │       └── deploy.yml      # GitHub Actions 自动部署
  ├── DEPLOY.md               # 部署说明
  └── README.md               # 项目说明

文件清单（7 个核心文件）：
  1. index.html      — 18.5 KB，完整单页应用
  2. css/style.css   — 3.5 KB，自定义样式
  3. js/articles.js  — 10.8 KB，6 篇中文文章数据
  4. js/main.js      — 14.1 KB，全部交互功能
  5. .nojekyll       — 空文件，禁止 Jekyll 处理
  6. .github/workflows/deploy.yml — CI/CD 自动部署
  7. DEPLOY.md       — 部署说明

视觉优化点（相比原始站点的提升）：
  1. 深色模式支持 — localStorage 持久化，跟随系统偏好
  2. 印度紫(indigo) 到 青色(cyan) 渐变配色 — 更现代的视觉层次
  3. 阅读进度条 — 顶部渐变色进度指示
  4. 文章模态窗口 — 不跳转页面，流畅的阅读体验
  5. 分类筛选动画 — scaleIn 弹性动画，逐卡片延迟
  6. 响应式设计 — sm/md/lg 三档断点，移动端菜单优化
  7. 回到顶部按钮 — 滚动 >500px 后渐显
  8. 英雄区装饰 — 模糊圆形 + 网格背景 + 渐变色背景
  9. 卡片悬停效果 — translateY + shadow 提升 + 图片缩放
  10. Google Fonts 中文字体 — Noto Sans SC + Noto Serif SC
  11. ESC 关闭模态窗口 — 键盘无障碍支持
  12. 分享功能 — Web Share API + clipboard fallback
  13. URL hash 路由 — 支持直接分享文章链接
  14. 打印样式优化 — 隐藏导航等装饰元素
  15. scrollbar 美化 — 与主题色一致的滚动条
  16. ::selection 自定义 — 选中文本颜色匹配主题
  17. 焦点可见 — focus-visible 无障碍支持
  18. 头部 backdrop-blur — 毛玻璃效果

构建方式：
  - 零构建：纯静态 HTML + CSS + JS
  - Tailwind CSS 通过 CDN 加载（带自定义配置）
  - 本地预览：python3 -m http.server 8080
  - 生产部署：git push → GitHub Actions → gh-pages

GitHub Pages 配置：
  - Source: GitHub Actions
  - 工作流：.github/workflows/deploy.yml
  - 触发条件：push to main + workflow_dispatch
  - 产物：静态 HTML 根目录

模仿度评估：
  - 布局结构：100%（header/hero/grid/footer）
  - 配色方案：90%（indigo-cyan 替代原始蓝紫）
  - 内容结构：100%（博客文章 + 分类 + 作者介绍）
  - 交互方式：110%（增加了深色模式、模态窗口等）
[/SCHEME]
