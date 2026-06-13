# Code Wiki — 企业官网前端项目

> 本 Wiki 旨在为开发团队提供系统化的项目理解与维护指南。内容涵盖项目整体架构、主要模块职责、关键类与函数说明、依赖关系以及项目运行方式。

---

## 1. 项目概览

### 1.1 项目简介

这是一个基于 **React 19 + TypeScript + Vite 7** 构建的现代化企业官网单页应用（SPA）。

- **定位**：纯静态部署的企业官网，无后端依赖
- **主题色彩**：深色（#0A0A0A）与白色（#FFFFFF）交替的极简商务风格
- **字体方案**：中文标题用 `Noto Serif SC`，中文正文用 `Noto Sans SC`，数字/英文用 `Inter`
- **亮点特性**：
  - 滚动视差动画（基于原生 `IntersectionObserver`）
  - 自定义图片轮播组件（自动轮播 + 手动切换）
  - Decap CMS 内容管理后台（`/admin` 路由）
  - 响应式布局（PC / 平板 / 手机）
  - 平滑滚动锚点导航

### 1.2 在线预览与演示

- 演示地址示例：`https://enterprise-website-template-nine.vercel.app/`
- 源码仓库：GitHub（需替换为实际仓库地址）

### 1.3 技术栈矩阵

| 分类 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 前端框架 | React | ^19.2.0 | UI 库 |
| 类型系统 | TypeScript | ~5.9.3 | 静态类型检查 |
| 构建工具 | Vite | ^7.2.4 | 开发服务器与打包 |
| 路由 | react-router | ^7.6.1 | 路由管理（当前仅 BrowserRouter 占位） |
| CSS 方案 | Tailwind CSS | ^3.4.19 | 原子化 CSS |
| UI 组件库 | shadcn/ui | — | 组件样式代码生成 |
| 底层基础组件 | Radix UI | 多版本 | 无障碍基础组件 |
| 图标 | lucide-react | ^0.562.0 | SVG 图标 |
| 动画 | GSAP | ^3.15.0 | 时间轴动画（备用） |
| CMS | Decap CMS | ^3.0.0 | 静态站内容管理 |
| 其他 | clsx / tailwind-merge | — | CSS class 合并 |

### 1.4 目录结构

```
/workspace
├── public/                         # 静态资源（构建时原样拷贝）
│   ├── admin/                     # Decap CMS 管理后台
│   │   ├── config.yml            # CMS 字段配置（核心）
│   │   └── index.html            # CMS 入口页面
│   ├── content/                   # CMS 生成的 JSON 数据
│   │   ├── carriers.json
│   │   ├── chairman.json
│   │   ├── company.json
│   │   ├── culture.json
│   │   └── incubators.json
│   └── images/                    # 站点图片资源
│       ├── hero-bg.jpg
│       ├── chairman.png
│       ├── carrier-1~4.jpg
│       ├── culture-1~2.jpg
│       ├── incubator-1.jpg
│       ├── logo.png
│       └── logo-white.png
├── src/
│   ├── components/                # 通用组件（shadcn/ui 风格）
│   │   ├── ui/                   # 40+ 个基础 UI 组件（Button, Card, ...）
│   │   ├── hooks/                # 自定义 Hooks
│   │   │   └── use-mobile.ts
│   │   └── lib/                  # 工具库
│   │       ├── cms.ts            # CMS 数据加载核心
│   │       └── utils.ts          # cn() class 合并工具
│   ├── sections/                  # 页面区块（Section）组件
│   │   ├── Navbar.tsx            # 顶部导航栏（滚动变色）
│   │   ├── HeroSection.tsx       # 首屏（视差背景）
│   │   ├── CompanySection.tsx    # 公司简介 + 发展历程
│   │   ├── ChairmanSection.tsx   # 创始人介绍
│   │   ├── CarriersSection.tsx   # 载体简介（重点项目）
│   │   ├── IncubatorsSection.tsx # 孵化器介绍
│   │   ├── CultureSection.tsx    # 商旅文化场馆
│   │   ├── PartnersSection.tsx   # 合作伙伴 / 产业生态
│   │   └── Footer.tsx            # 页脚（联系方式）
│   ├── pages/
│   │   └── Home.tsx              # 初始脚手架遗留（未被使用）
│   ├── App.tsx                   # 根组件（串联所有 Section）
│   ├── App.css                   # 脚手架遗留样式
│   ├── index.css                 # 全局样式（Tailwind + CSS 变量）
│   └── main.tsx                  # 应用入口（挂载 React 根）
├── index.html                     # Vite 入口 HTML
├── vite.config.ts                 # Vite 构建配置
├── tailwind.config.js             # Tailwind 主题扩展
├── components.json                # shadcn/ui 配置
├── postcss.config.js              # PostCSS 配置
├── tsconfig.json                  # TypeScript 根配置
├── tsconfig.app.json              # TypeScript 应用配置
├── tsconfig.node.json             # TypeScript Node 端配置
├── eslint.config.js               # ESLint 配置
├── package.json                   # 依赖与脚本定义
├── package-lock.json              # 锁定依赖版本
├── README.md                      # 项目说明文档
└── info.md                        # 项目初始化信息
```

---

## 2. 架构设计

### 2.1 整体架构图

```
┌──────────────────────────────────────────────────────┐
│                     index.html                       │
│              (挂载点 + 字体预加载 + SEO)             │
└────────────────────────┬─────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────┐
│                     main.tsx                         │
│  BrowserRouter                                       │
│  └── App  (document.documentElement.scrollBehavior)  │
└────────────────────────┬─────────────────────────────┘
                         │
         ┌───────────────┼────────────────┐
         ▼               ▼                ▼
   ┌──────────┐   ┌──────────────┐   ┌──────────┐
   │  Navbar  │   │ HeroSection  │   │  Footer  │
   └──────────┘   └──────────────┘   └──────────┘
                          │
              ┌───────────┼────────────┐
              ▼           ▼            ▼
    ┌────────────────┐ ┌──────────┐ ┌──────────────┐
    │ CompanySection │ │ Chairman │ │ Carriers     │
    │ (about)        │ │          │ │ (carriers)   │
    └────────────────┘ └──────────┘ └──────────────┘
                          │
              ┌───────────┼────────────┐
              ▼           ▼            ▼
    ┌────────────────┐ ┌──────────┐ ┌──────────────┐
    │ Incubators     │ │ Culture  │ │ Partners     │
    │ (incubators)   │ │ (culture)│ │ (ecosystem)  │
    └────────────────┘ └──────────┘ └──────────────┘
```

### 2.2 架构分层

| 层级 | 职责 | 典型文件 |
|------|------|----------|
| **入口层** | 挂载 React 根，注入 BrowserRouter，配置全局滚动行为 | `main.tsx`, `index.html` |
| **路由层** | 当前为单页应用，`BrowserRouter` 保留为未来多页扩展做准备 | `main.tsx` |
| **布局层** | 组合各个 Section 以形成完整页面，处理全局滚动逻辑 | `App.tsx` |
| **区块层（Sections）** | 页面独立的业务区块组件，包含数据、滚动动画与样式 | `src/sections/*.tsx` |
| **通用组件层** | 可复用的 UI 基础组件（shadcn/ui 风格） | `src/components/ui/*.tsx` |
| **工具层** | CMS 数据加载、class 合并等纯函数工具 | `src/lib/cms.ts`, `src/lib/utils.ts` |
| **Hook 层** | 自定义 React Hooks（移动端检测等） | `src/components/hooks/use-mobile.ts` |
| **样式层** | Tailwind 基础样式 + CSS 变量主题 + 自定义滚动动画 | `src/index.css`, `tailwind.config.js` |
| **数据层** | CMS 以 JSON 形式托管静态数据，运行时通过 `fetch` 加载 | `public/content/*.json` |

### 2.3 数据流向

```
┌──────────────────┐
│ Decap CMS 后台   │── Git 提交 ──▶  CI/CD 构建
│ (/admin)          │                   │
└──────────────────┘                   ▼
                                       ┌─────────────┐
                                       │  public/    │
                                       │  content/   │
                                       │  *.json     │
                                       └──────┬──────┘
                                              │
                                              ▼
                          ┌──────────────────────────────────┐
                          │   src/lib/cms.ts                │
                          │   loadCMSData() / loadXxxData() │
                          └────────────┬─────────────────────┘
                                       │  (当前 Section 以
                                       │   内联数据为主)
                                       ▼
                          ┌──────────────────────────────────┐
                          │   各 Section 组件               │
                          │   (CompanySection / Chairman /  │
                          │    Carriers / Incubators ...)   │
                          └──────────────────────────────────┘
```

> **当前状态说明**：`cms.ts` 工具库已完整实现，但各 Section 组件目前以**内联数据（硬编码）**的方式工作。CMS 动态加载为预留能力，后续可通过简单的 `useEffect + loadXxxData()` 改造接入。

---

## 3. 入口文件说明

### 3.1 `index.html` — Vite 入口

[查看文件](file:///workspace/index.html)

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>某某科技集团 | 产业生态服务商</title>
    <meta name="description" content="某某科技集团有限公司 - 基于园区运营的产业生态服务商" />
    <!-- Google Fonts 预连接 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&family=Noto+Sans+SC:wght@300;400;500&family=Noto+Serif+SC:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**要点**：
- `lang="zh-CN"` 正确声明中文语言，有利于 SEO 与无障碍
- 配置了 Google Fonts CDN 加载中文衬线字体 `Noto Serif SC`、中文无衬线字体 `Noto Sans SC` 以及数字字体 `Inter`
- `<div id="root">` 为 React 挂载容器
- `<script type="module">` 表明使用 ES Modules，由 Vite 在开发态与生产态分别处理

### 3.2 `src/main.tsx` — 应用入口

[查看文件](file:///workspace/src/main.tsx)

```typescript
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
```

**要点**：
- 使用 React 18/19 推荐的 `createRoot` API（替代旧版 `ReactDOM.render`）
- `BrowserRouter` 包裹整个应用，目前虽为单页但为后续多页路由（如 `"/about"`、`"/contact"`）预留扩展能力
- `import './index.css'` 确保全局样式（Tailwind + CSS 变量 + 自定义滚动动画）在应用启动时即加载

### 3.3 `src/App.tsx` — 根组件

[查看文件](file:///workspace/src/App.tsx)

```typescript
import { useEffect } from 'react';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import CompanySection from './sections/CompanySection';
import ChairmanSection from './sections/ChairmanSection';
import CarriersSection from './sections/CarriersSection';
import IncubatorsSection from './sections/IncubatorsSection';
import CultureSection from './sections/CultureSection';
import PartnersSection from './sections/PartnersSection';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <CompanySection />
      <ChairmanSection />
      <CarriersSection />
      <IncubatorsSection />
      <CultureSection />
      <PartnersSection />
      <Footer />
    </div>
  );
}

export default App;
```

**核心职责**：
1. **页面组合**：按从上到下的顺序串联 9 个主要 Section
2. **平滑滚动**：在 `useEffect` 中将 `html` 元素的 `scrollBehavior` 设为 `'smooth'`，使锚点跳转具有平滑动画；卸载时还原
3. **相对定位容器**：`<div className="relative">` 为 Navbar 的 `fixed` 定位提供参考上下文

**注意**：`src/pages/Home.tsx` 是 Vite 初始化的脚手架代码，当前**未被**应用使用（无 import 链）。可清理或改造为正式路由。

---

## 4. Sections 模块详解

### 4.1 Navbar — 顶部导航栏

[查看文件](file:///workspace/src/sections/Navbar.tsx)

**功能说明**：
- 固定定位（`fixed top-0 left-0 right-0 z-50`），始终保持在视窗顶部
- **滚动变色**：当 `scrollY < 视窗高度的 50%` 时，使用透明深色背景；超过后切换为白底 + 毛玻璃效果
- **Logo 滤镜切换**：深色背景时用 `brightness(0) invert(1)` 让 logo 变白，浅色时用 `brightness(0)` 让 logo 变黑
- **锚点跳转**：通过 `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })` 实现，与 `App.tsx` 的 `scroll-behavior: smooth` 协同工作
- 提供 4 个导航按钮：`关于 (#about)` / `生态 (#ecosystem)` / `项目 (#carriers)` / `联系 (#contact)`

**关键函数**：
| 函数 | 说明 |
|------|------|
| `handleScroll()` | 监听 `window.scroll`，根据 `y < h * 0.5` 判断是否切换主题 |
| `go(id)` | 执行平滑滚动到指定 DOM 元素（通过 id 匹配） |

**性能提示**：事件监听器使用了 `{ passive: true }` 选项，可提升滚动性能；组件卸载时移除监听器，避免内存泄漏。

---

### 4.2 HeroSection — 首屏

[查看文件](file:///workspace/src/sections/HeroSection.tsx)

**视觉元素**：
- 全屏高度（`h-screen`）深色背景
- 背景图片（`/images/hero-bg.jpg`）实现视差滚动
- 主标题「某某科技集团」+ 副标题「基于园区运营的产业生态服务商」
- 底部三个关键词标签：产业服务 · 科技创新 · 城市更新
- 底部渐变过渡到下一 Section

**关键动画**：

| 元素 | 动画方式 | 说明 |
|------|----------|------|
| 背景图 | `transform: translateY(y * 0.3)` + 透明度 | 视差效果：背景比实际滚动慢，且随滚动逐渐消失 |
| 主标题 | `fadeInUp` keyframes（1s，延迟 0.3s） | 从下方淡入 |
| 副标题 | `fadeInUp`（1s，延迟 0.6s） | 同上 |
| 关键词标签 | `fadeInUp`（1s，延迟 0.9s） | 同上 |

**设计模式**：
- `bgRef` 通过 `useRef` 直接操作 DOM 样式，以获得比 React state 更流畅的滚动动画（避免每次滚动触发 re-render）
- `will-change: 'transform, opacity'` 提示浏览器提前为 GPU 合成准备层

---

### 4.3 CompanySection — 公司简介 + 发展历程

[查看文件](file:///workspace/src/sections/CompanySection.tsx)

**布局**：
- 锚点 id：`#about`
- 左右两列（lg 断点以上）：左侧标题 + 分隔线；右侧简介文字 + 荣誉标签
- 下方：横向四阶段发展历程时间轴（`1.0 → 2.0 → 3.0 → 4.0`）

**数据结构**（内联 `timeline` 数组）：

```typescript
{
  phase: '1.0',          // 阶段标识（大号数字展示）
  period: '2005-至今',   // 时间段
  title: '自主开发',      // 阶段标题
  detail: '...',          // 详情描述
  projects: ['...']       // 代表项目（展示为小胶囊标签）
}
```

**动画机制**（核心模式，以下多数 Section 共用）：

1. 组件挂载后 `useEffect` 中创建 `IntersectionObserver`
2. 在 section 内查询所有带 `.rvl`（reveal）类的元素
3. 初始化为 `opacity: 0; transform: translateY(28px)`
4. 进入视窗后（`threshold: 0.15`）添加 `.active` 类 → `opacity: 1; transform: translateY(0)`
5. 动画完成后 `observer.unobserve(el)`，后续不再重复触发
6. 时间轴 `.tl-item` 使用独立 observer 单独控制（`threshold: 0.2`）

---

### 4.4 ChairmanSection — 创始人介绍

[查看文件](file:///workspace/src/sections/ChairmanSection.tsx)

**布局**：
- 深色背景（`bg-[#0A0A0A]`）
- 左侧：头像（3:4 比例） + 姓名 + 职位中英文
- 右侧（占 9/12 列）：三部分文字 — 教育背景 · 现任职务 · 社会职务 + 行业标准卡片
- 为「社会职务」提供 12 条以内的自由列表展示

**动画**：使用与 CompanySection 相同的 `.rvl` + `IntersectionObserver` 模式

---

### 4.5 CarriersSection — 载体简介

[查看文件](file:///workspace/src/sections/CarriersSection.tsx)

**这是内容最丰富的 Section**，包含：

- **1 个重点载体**（Featured）：星智科创港
- **3 个普通载体**：临港未来科技城、创谷孵化基地、融创商务园

**每个载体包含的字段**：

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 中文名称 |
| `subtitle` | string | 英文副标题 |
| `company` | string | 运营主体公司 |
| `tags` | string[] | 关键词胶囊标签 |
| `desc` | string | 详细介绍文本 |
| `stats` | { v, l }[] | 数值指标数组（4 项） |
| `images` | { src, alt }[] | 轮播图片数组 |

**内部组件 — `ImageSlider`**：

```typescript
function ImageSlider({ images }: { images: { src: string; alt: string }[] })
```

- **自动轮播**：每 5 秒切换到下一张
- **手动切换**：底部进度条按钮可点击跳转
- **过渡效果**：`transition-opacity duration-[2000ms]`（2 秒透明度淡入淡出）
- **单图优化**：当 `images.length === 1` 时，不渲染控制按钮，直接显示静态图片

**交替布局**：3 个普通载体采用左文右图 / 左图右文的交替排列（通过 `lg:order-2` 控制）

---

### 4.6 IncubatorsSection — 孵化器介绍

[查看文件](file:///workspace/src/sections/IncubatorsSection.tsx)

- 锚点 id：`#incubators`
- 两列卡片布局，每卡包含：图片 · 中英文标题 · 描述文字 · 4 项数值指标
- 图片 hover 放大效果：`hover:scale-105 transition-transform duration-[1200ms]`
- 数据内联在 `incubators` 数组中，包含两个孵化器

---

### 4.7 CultureSection — 商旅文化场馆

[查看文件](file:///workspace/src/sections/CultureSection.tsx)

- 深色背景，两列场馆卡片布局
- 每卡包含轮播图 + 标签 + 中英文标题 + 描述
- 复用与 CarriersSection 相同的 `ImageSlider` 模式（内联实现，未抽离为公共组件 — **代码重复，优化建议见第 8 节**）

---

### 4.8 PartnersSection — 产业生态合作伙伴

[查看文件](file:///workspace/src/sections/PartnersSection.tsx)

- 锚点 id：`#ecosystem`
- 浅灰色背景（`bg-[#F7F7F7]`）
- 顶部：6 列 x 1 行的合作伙伴名称网格
- 底部：3 项统计指标卡片（200+ 生态合作伙伴 / 50+ 产业服务机构 / 30+ 投资机构）

---

### 4.9 Footer — 页脚

[查看文件](file:///workspace/src/sections/Footer.tsx)

- 锚点 id：`#contact`
- 四列布局：公司信息 / 业务范围 / 联系方式 / 小程序二维码占位
- 版权信息：`© 2026 某某科技集团有限公司. All rights reserved.`
- 企业格言：`追求卓越，精益求精`

---

## 5. 工具库与 Hooks

### 5.1 `src/lib/cms.ts` — CMS 数据加载

[查看文件](file:///workspace/src/lib/cms.ts)

**核心 API**：

```typescript
// 基础：带超时机制的 fetch
async function fetchWithTimeout(url: string, timeout = 3000): Promise<Response>

// 通用：加载 CMS JSON 数据
export async function loadCMSData<T>(path: string, fallback: T): Promise<T>

// 专用便捷函数
export function loadChairmanData(fallback: any)       // /content/chairman.json
export function loadCarriersData(fallback: any[])     // /content/carriers.json
export function loadIncubatorsData(fallback: any[])   // /content/incubators.json
export function loadCultureData(fallback: any[])      // /content/culture.json
export function loadCompanyData(fallback: any)        // /content/company.json

// 可用性探测
export async function isCMSAvailable(): Promise<boolean>
```

**设计要点**：
- 使用 `AbortController` 实现请求超时，避免网络差情况下页面无限等待
- **永不抛出异常**：无论网络错误、404 还是 JSON 解析失败，都会返回 `fallback` 默认值，保障页面渲染不崩溃
- `isCMSAvailable()` 可用于在 UI 中展示「CMS 不可用」提示（当前未被调用）

**接入示例**（改造 ChairmanSection）：

```typescript
// 伪代码 — 如何接入动态 CMS
const [data, setData] = useState(fallbackData);
useEffect(() => {
  loadChairmanData(fallbackData).then(setData);
}, []);
```

---

### 5.2 `src/lib/utils.ts` — 通用工具

[查看文件](file:///workspace/src/lib/utils.ts)

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**功能**：`cn()` 是 shadcn/ui 标准工具函数，负责智能合并 Tailwind class：
- `clsx` 负责处理条件 class（如 `{ 'bg-red': isError }`）
- `twMerge` 负责去重与冲突处理（例如 `p-2 p-4` 只会保留后者 `p-4`）
- 两者串联使用 = **条件表达 + 智能合并**

---

### 5.3 `src/components/hooks/use-mobile.ts` — 移动端检测

[查看文件](file:///workspace/src/components/hooks/use-mobile.ts)

```typescript
const MOBILE_BREAKPOINT = 768

export function useIsMobile(): boolean
```

**工作原理**：
1. 创建 `window.matchMedia('(max-width: 767px)')` MediaQueryList
2. 监听 `change` 事件响应窗口尺寸变化
3. 返回 `boolean`，初始值 `undefined` 经过 `!!` 转换后首次 render 为 `false`，随后在 effect 中同步真实值
4. 组件卸载时移除监听器

**使用场景**：当前 shadcn/ui 的 `Sheet` / `Dialog` 等组件内部可使用此 Hook 切换移动端样式。

---

## 6. UI 组件库（shadcn/ui）

### 6.1 总览

`src/components/ui/` 目录下包含 **40+** 个基础组件文件。这些组件由 shadcn/ui CLI 生成，遵循「复制粘贴到项目中」的模式，**允许自由修改源码**。

### 6.2 配置 — `components.json`

[查看文件](file:///workspace/components.json)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "postcss.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- **`style: "new-york"`**：使用 New York 风格（相比 default 风格更克制、留白更多）
- **`rsc: false`**：不使用 React Server Components（纯客户端 SPA）
- **`cssVariables: true`**：主题颜色通过 CSS 变量定义（如 `hsl(var(--primary))`）

### 6.3 组件清单

| 组件 | 文件 | 用途 |
|------|------|------|
| Button | `button.tsx` | 按钮，支持 variant/size 变体 |
| Card | `card.tsx` | 卡片容器（Header/Title/Description/Content/Footer） |
| Input | `input.tsx` | 文本输入框 |
| Dialog / AlertDialog | `dialog.tsx` / `alert-dialog.tsx` | 弹窗与警告对话框 |
| Dropdown Menu | `dropdown-menu.tsx` | 下拉菜单 |
| Select | `select.tsx` | 选择器 |
| Tabs | `tabs.tsx` | 标签页 |
| Accordion | `accordion.tsx` | 手风琴折叠 |
| Avatar | `avatar.tsx` | 用户头像 |
| Badge | `badge.tsx` | 徽章/标签 |
| Breadcrumb | `breadcrumb.tsx` | 面包屑 |
| Calendar | `calendar.tsx` | 日历（配合 date-fns） |
| Checkbox | `checkbox.tsx` | 复选框 |
| Switch | `switch.tsx` | 开关 |
| Radio Group | `radio-group.tsx` | 单选组 |
| Form | `form.tsx` | 表单（基于 react-hook-form + zod） |
| Label | `label.tsx` | 表单标签 |
| Textarea | `textarea.tsx` | 多行文本输入 |
| Slider | `slider.tsx` | 滑块 |
| Scroll Area | `scroll-area.tsx` | 自定义滚动条容器 |
| Separator | `separator.tsx` | 分隔线 |
| Skeleton | `skeleton.tsx` | 骨架屏占位 |
| Sonner | `sonner.tsx` | 轻量级 Toast 提示 |
| Sheet | `sheet.tsx` | 底部/侧边抽屉 |
| Drawer | `drawer.tsx` | 抽屉（移动端友好） |
| Popover | `popover.tsx` | 气泡卡片 |
| Hover Card | `hover-card.tsx` | 悬停卡片 |
| Context Menu | `context-menu.tsx` | 右键菜单 |
| Navigation Menu | `navigation-menu.tsx` | 导航菜单 |
| Tooltip | `tooltip.tsx` | 工具提示 |
| Collapsible | `collapsible.tsx` | 可折叠容器 |
| Toggle / ToggleGroup | `toggle.tsx` / `toggle-group.tsx` | 切换按钮 |
| Command | `command.tsx` | 命令面板（⌘K） |
| Input OTP | `input-otp.tsx` | 一次性密码输入 |
| Input Group | `input-group.tsx` | 输入组 |
| Item | `item.tsx` | 通用项容器 |
| Pagination | `pagination.tsx` | 分页 |
| Progress | `progress.tsx` | 进度条 |
| Resizable | `resizable.tsx` | 可拖拽调整大小的面板 |
| Table | `table.tsx` | 表格 |
| Aspect Ratio | `aspect-ratio.tsx` | 固定宽高比容器 |
| Empty | `empty.tsx` | 空状态 |
| Carousel | `carousel.tsx` | 轮播图（embla-carousel） |
| Chart | `chart.tsx` | 图表（recharts） |
| Kbd | `kbd.tsx` | 键盘按键提示 |
| Spinner | `spinner.tsx` | 加载动画 |
| Sidebar | `sidebar.tsx` | 侧边栏 |
| Field | `field.tsx` | 表单字段包装 |

### 6.4 使用模式

所有组件遵循 **组合式 API（Compound Component Pattern）**：

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述</CardDescription>
  </CardHeader>
  <CardContent>
    <Button variant="default" size="lg">按钮</Button>
  </CardContent>
</Card>
```

---

## 7. 样式系统

### 7.1 `src/index.css` — 全局样式

[查看文件](file:///workspace/src/index.css)

**三段式结构**：

1. **`@tailwind base / components / utilities`**：引入 Tailwind 核心层
2. **`@layer base`**：定义 CSS 变量主题 + 全局 `body` 样式
3. **自定义动画**：`.rolling-number` 数字滚动动画（使用 `@property --num`）

**CSS 变量主题颜色**：

```css
:root {
  --background: 0 0% 100%;      /* 纯白 */
  --foreground: 0 0% 10%;       /* 深黑 */
  --primary: 0 0% 10%;          /* 主色 — 黑 */
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96%;        /* 辅色 — 浅灰 */
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
  --accent: 0 0% 96%;
  --border: 0 0% 90%;
  --input: 0 0% 90%;
  --ring: 0 0% 10%;
  --radius: 0.5rem;
}
```

> 所有颜色以 HSL 元组（`h s% l%`）存储，Tailwind 在使用时会展开为 `hsl(var(--xxx) / <alpha-value>)`，支持透明度叠加。

**全局 body 样式**：
- 字体栈：`'Noto Sans SC', 'Inter', -apple-system, ...`
- 行高 `1.8`（中文阅读友好）
- 颜色 `#111111`，背景 `#FFFFFF`
- `overflow-x: hidden` 防止水平滚动条
- `-webkit-font-smoothing: antialiased` 启用字体抗锯齿

**滚动数字动画**：

```css
@property --num { syntax: '<integer>'; initial-value: 0; inherits: false; }

.rolling-number {
  counter-reset: num var(--num);
  transition: --num 2.5s ease-out;
}
.rolling-number::after { content: counter(num); }

/* 目标值变体 */
.target-4000 { --target: 4000; transition-duration: 3.5s; }
.in-view.target-4000 { --num: var(--target); }
```

> 使用 CSS `@property` 注册自定义属性，实现从 0 到目标值的整数过渡动画。当前定义了 4000 / 12 / 200 三个目标值变体。

### 7.2 `tailwind.config.js` — Tailwind 配置

[查看文件](file:///workspace/tailwind.config.js)

**核心配置**：

| 项 | 说明 |
|----|------|
| `darkMode: ["class"]` | 支持 `.dark` 类切换暗色主题（当前未使用，但已配置） |
| `content` | 扫描 `./index.html` 和 `./src/**/*.{js,ts,jsx,tsx}` 生成 class |
| `theme.extend.colors` | 扩展 Tailwind 调色板：`background / foreground / primary / secondary / destructive / muted / accent / popover / card / sidebar`，均指向 CSS 变量 |
| `theme.extend.borderRadius` | `xl / lg / md / sm / xs` 指向 `--radius` CSS 变量 |
| `theme.extend.boxShadow.xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` 极细阴影 |
| `keyframes` + `animation` | `accordion-down / accordion-up / caret-blink` 三个关键帧动画 |
| `plugins: [require("tailwindcss-animate")]` | 提供 `animate-in / animate-out` 等进入/离开动画 |

### 7.3 设计 Token 映射关系

```
CSS 变量 (src/index.css)
    │
    ▼
Tailwind 主题 (tailwind.config.js)
    │
    ▼
JSX className 中使用 (如 bg-primary / text-muted-foreground)
```

---

## 8. 构建配置与依赖

### 8.1 `vite.config.ts` — Vite 配置

[查看文件](file:///workspace/vite.config.ts)

```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: { port: 3000 },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

**关键配置**：
- **`base: './'`**：使用相对路径，使构建产物可部署到任何子路径下（相比默认 `'/'` 更灵活）
- **`@vitejs/plugin-react`**：React Fast Refresh + JSX 编译
- **`kimi-plugin-inspect-react`**：调试辅助插件（开发态，用于 DOM 元素检查）
- **端口 3000**：固定开发服务器端口
- **路径别名 `@` → `./src`**：支持 `import X from '@/components/...'`

### 8.2 `tsconfig.json` — TypeScript 根配置

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }   // 与 Vite 别名对齐
  }
}
```

使用 **Project References** 模式：应用代码由 `tsconfig.app.json` 负责，Vite/node 配置由 `tsconfig.node.json` 负责。

### 8.3 依赖概览

**核心依赖**（`package.json` dependencies）：

| 包 | 版本 | 用途 |
|----|------|------|
| `react` | ^19.2.0 | UI 库 |
| `react-dom` | ^19.2.0 | DOM 渲染 |
| `react-router` | ^7.6.1 | 路由 |
| `@radix-ui/react-*` | 多版本 | 40+ 个无障碍基础组件 |
| `tailwindcss` | ^3.4.19 | CSS 框架 |
| `clsx` | ^2.1.1 | 条件 class 合并 |
| `tailwind-merge` | ^3.4.0 | Tailwind class 智能合并 |
| `lucide-react` | ^0.562.0 | 图标 |
| `gsap` | ^3.15.0 | 动画库（备用） |
| `lenis` | ^1.3.23 | 平滑滚动库（备用） |
| `react-hook-form` | ^7.70.0 | 表单 |
| `@hookform/resolvers` | ^5.2.2 | 表单校验解析器 |
| `zod` | ^4.3.5 | Schema 校验 |
| `recharts` | ^2.15.4 | 图表 |
| `@react-three/fiber` | ^9.6.0 | Three.js React 封装（备用） |
| `@react-three/drei` | ^10.7.7 | Three.js 辅助组件（备用） |
| `embla-carousel-react` | ^8.6.0 | 轮播底层（备用） |
| `vaul` | ^1.1.2 | 抽屉组件 |
| `sonner` | ^2.0.7 | Toast |
| `cmdk` | ^1.1.1 | 命令面板 |
| `next-themes` | ^0.4.6 | 主题切换 |
| `date-fns` | ^4.1.0 | 日期工具 |
| `react-day-picker` | ^9.13.0 | 日期选择 |
| `input-otp` | ^1.4.2 | OTP 输入 |
| `three` | ^0.184.0 | 3D 引擎（备用） |
| `react-resizable-panels` | ^4.2.2 | 可调整大小面板 |

**开发依赖**（devDependencies）：

| 包 | 版本 | 用途 |
|----|------|------|
| `vite` | ^7.2.4 | 构建与开发服务器 |
| `typescript` | ~5.9.3 | 类型检查 |
| `@vitejs/plugin-react` | ^5.1.1 | Vite React 插件 |
| `@types/react` | ^19.2.5 | React 类型 |
| `@types/node` | ^24.10.15 | Node.js 类型 |
| `eslint` | ^9.39.1 | 代码检查 |
| `typescript-eslint` | ^8.46.4 | ESLint + TS |
| `eslint-plugin-react-hooks` | ^7.0.0 | React Hooks 规则检查 |
| `eslint-plugin-react-refresh` | ^0.4.2 | Fast Refresh 辅助 |
| `@eslint/js` | ^9.39.1 | ESLint 核心 |
| `globals` | ^16.5.0 | 全局变量预设 |
| `autoprefixer` | ^10.4.23 | PostCSS 自动加前缀 |
| `postcss` | ^8.5.6 | CSS 处理器 |
| `tailwindcss-animate` | ^1.0.7 | Tailwind 动画插件 |
| `tw-animate-css` | ^1.4.0 | 动画 CSS |
| `kimi-plugin-inspect-react` | ^1.0.3 | React 调试插件 |

---

## 9. Decap CMS 内容管理

### 9.1 管理后台入口

- **URL**：部署后访问 `https://your-domain/admin/`
- **文件**：[public/admin/index.html](file:///workspace/public/admin/index.html) — 通过 unpkg CDN 加载 `decap-cms@^3.0.0`

### 9.2 核心配置 — `public/admin/config.yml`

[查看文件](file:///workspace/public/admin/config.yml)

**配置结构**：

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO   # 需要替换为实际仓库
  branch: main

media_folder: "public/images/uploads"   # 上传图片存储路径
public_folder: "/images/uploads"        # 前端访问路径

site_url: https://www.example-group.cn  # 预览基础 URL

collections:
  - name: "chairman"        # 董事长介绍
  - name: "carriers"        # 载体简介（4 个载体对象）
  - name: "incubators"      # 孵化器（列表形式）
  - name: "culture"         # 商旅文化（列表形式）
  - name: "company"         # 公司信息 + 发展历程
```

**每个 collection 支持的字段类型**：
- `string` — 单行文本
- `image` — 图片上传
- `markdown` — 富文本编辑
- `list` — 列表 / 数组
- `object` — 嵌套对象

### 9.3 GitHub OAuth 流程

Decap CMS 需要 GitHub OAuth 认证才能写入内容：

1. 在 GitHub Settings → Developer settings 注册 OAuth App
2. 部署一个认证代理（Netlify Identity、Git Gateway 或自定义云函数）
3. 在 `config.yml` `backend` 下补充 `base_url` / `auth_endpoint` 配置
4. 编辑内容保存后，CMS 会以 commit 形式写入 `public/content/*.json` 触发 CI/CD 重新部署

### 9.4 CMS 数据文件

| JSON 文件 | 对应 Section | 可编辑字段 |
|-----------|--------------|------------|
| `chairman.json` | ChairmanSection | 姓名 / 职位 / 照片 / 教育背景 / 现任职务列表 / 社会职务列表 / 行业标准 |
| `carriers.json` | CarriersSection | 4 个载体（name / subtitle / company / tags / desc / stats） |
| `incubators.json` | IncubatorsSection | 孵化器列表（name / subtitle / desc / image / stats） |
| `culture.json` | CultureSection | 场馆列表（name / subtitle / desc / tags / images） |
| `company.json` | CompanySection | 公司全称 / intro1 / intro2 / honors / timeline 四阶段 |

示例 — [company.json](file:///workspace/public/content/company.json)：

```json
{
  "fullName": "某某科技集团有限公司",
  "intro1": "围绕\"从产业到空间\"的理念...",
  "intro2": "团队拥有二十年的园区开发...",
  "honors": ["国家级高新技术企业", "..."],
  "timeline": [
    { "phase": "1.0", "period": "2005-至今", "title": "自主开发", "detail": "...", "projects": ["..."] }
  ]
}
```

---

## 10. 项目运行方式

### 10.1 环境要求

| 项目 | 版本要求 |
|------|----------|
| Node.js | 18+（推荐 20 LTS） |
| npm | 9+（或 pnpm 8+ / yarn 1.22+） |
| 浏览器 | Chrome 90+ / Firefox 88+ / Safari 14+ / Edge 90+ |

### 10.2 安装与启动

```bash
# 1. 克隆项目
git clone https://github.com/Funckycat/enterprise-website-template.git
cd enterprise-website-template

# 2. 安装依赖
npm install
# 或
pnpm install
# 或
yarn install

# 3. 启动开发服务器（端口 3000）
npm run dev
# → 打开 http://localhost:3000

# 4. 构建生产版本
npm run build
# → 产物输出到 dist/ 目录

# 5. 本地预览构建产物
npm run preview
# → 启动预览服务器（通常在 http://localhost:4173）

# 6. 代码检查
npm run lint
```

### 10.3 npm scripts 详解

[查看文件](file:///workspace/package.json)

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Vite 开发服务器（HMR，热更新） |
| `npm run build` | 先执行 `tsc -b`（类型检查），再执行 `vite build`（生产构建） |
| `npm run lint` | ESLint 全项目扫描 |
| `npm run preview` | 本地预览 `dist/` 目录 |

### 10.4 部署指南

#### 方式一：Vercel（推荐）

```bash
# 1. Fork 项目到你的 GitHub
# 2. 登录 vercel.com → New Project → 导入仓库
# 3. Vercel 自动识别 Vite 项目，无需额外配置
# 4. 部署完成后自动分配 *.vercel.app 子域名
```

#### 方式二：Netlify

```bash
# Build command: npm run build
# Publish directory: dist
# 或通过 netlify.toml 配置
```

#### 方式三：自有服务器（Nginx）

```bash
npm run build
scp -r dist/* user@your-server:/var/www/html/
```

Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    # SPA 路由支持（当前为单页，但保留为未来多页扩展）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源强缓存（hash 文件名，Vite 自动处理）
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 11. 关键函数与 Hook 模式总览

### 11.1 滚动入场动画模式（在 6 个 Section 中复用）

```typescript
useEffect(() => {
  const section = ref.current;
  if (!section) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('active');
          obs.unobserve(e.target);   // 只触发一次
        }
      });
    },
    { threshold: 0.15 }             // 元素 15% 进入视窗即触发
  );
  section.querySelectorAll('.rvl').forEach((el) => {
    (el as HTMLElement).style.opacity = '0';
    (el as HTMLElement).style.transform = 'translateY(28px)';
    obs.observe(el);
  });
  return () => obs.disconnect();    // 卸载时清理
}, []);
```

**优势**：
- 浏览器原生 API，无第三方依赖，性能好
- `unobserve` 后不再重复观察，节省 CPU
- 卸载时 `disconnect()` 防止内存泄漏

### 11.2 图片轮播组件模式

```typescript
function ImageSlider({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setActive((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  // 单图 → 直接展示；多图 → 绝对定位叠加 + opacity 过渡
  return ...;
}
```

### 11.3 导航栏滚动变色模式

```typescript
useEffect(() => {
  const handleScroll = () => setIsDark(window.scrollY < window.innerHeight * 0.5);
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## 12. 代码质量与优化建议

### 12.1 当前可优化点

| 问题 | 位置 | 建议 |
|------|------|------|
| **`ImageSlider` 代码重复** | `CarriersSection.tsx` 与 `CultureSection.tsx` 各自实现了相同的轮播组件 | 抽离到 `src/components/ImageSlider.tsx` 统一复用 |
| **数据硬编码** | 所有 Section 的业务数据直接写在组件顶部 | 建议迁移到 `public/content/*.json` 配合 `cms.ts` 的 `loadXxxData()` 动态加载 |
| **缺少 Suspense / 加载状态** | CMS 数据加载是异步的 | 加载期间可展示 `src/components/ui/skeleton.tsx` 骨架屏 |
| **HeroSection scroll 监听无节流** | `HeroSection.tsx` 每帧都改 style | 可加上 `requestAnimationFrame` 节流或使用 `useEffect + passive` 已经足够 |
| **未使用的 `src/pages/Home.tsx`** | Vite 脚手架遗留 | 可删除或改造为路由首页 |
| **未使用的重量级依赖** | `three` / `@react-three/fiber` / `gsap` / `lenis` / `recharts` | 当前无任何组件实际使用，可从 `package.json` 移除以减小 bundle 体积 |
| **缺少 TypeScript 类型定义** | `cms.ts` 使用了 `any` / `any[]` 作为 fallback 类型 | 应定义 `ChairmanData` / `CarrierData` 等 interface 替代 any |
| **缺少错误边界（Error Boundary）** | 应用无全局错误处理 | 可在 `App.tsx` 外层包裹自定义 Error Boundary 组件 |
| **Navbar Logo 滤镜不够精确** | 使用 `brightness(0) invert(1)` 会让彩色 logo 变成纯黑/纯白 | 准备两份 logo 图片（dark / light）根据 isDark 切换 src |
| **缺少路由懒加载** | 单页应用下目前影响不大 | 若后续扩展多页，使用 `React.lazy + Suspense` 拆分 bundle |

### 12.2 Lint 与类型检查

```bash
npm run lint    # ESLint 检查
# tsc -b 在 build 时自动执行（package.json 中 `tsc -b && vite build`）
```

---

## 13. 扩展开发指南

### 13.1 添加一个新的 Section

1. 在 `src/sections/` 创建 `YourSection.tsx`
2. 遵循以下模板结构：
   ```tsx
   import { useEffect, useRef } from 'react';

   export default function YourSection() {
     const ref = useRef<HTMLElement>(null);

     useEffect(() => {
       // 复用 IntersectionObserver 入场动画逻辑
     }, []);

     return (
       <section id="your-anchor" ref={ref} className="...">
         <div className="max-w-[1200px] mx-auto ...">
           <div className="rvl">内容</div>
         </div>
         <style>{`.rvl.active { ... }`}</style>
       </section>
     );
   }
   ```
3. 在 `App.tsx` 中 import 并放置到合适位置
4. 在 `Navbar.tsx` 的按钮列表中添加锚点（可选）

### 13.2 接入 CMS 动态数据

以 ChairmanSection 改造为例：

```tsx
import { useEffect, useState } from 'react';
import { loadChairmanData } from '@/lib/cms';

const fallback = { name: '张某某', /* ... */ };

export default function ChairmanSection() {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    loadChairmanData(fallback).then(setData);
  }, []);

  // 使用 data.name / data.position / ... 等字段渲染
}
```

### 13.3 修改主题颜色

编辑 `src/index.css` 中的 `:root { --primary / --secondary / ... }`，Tailwind 的颜色 class 会自动生效。

如果需要添加自定义颜色：
1. 在 `src/index.css` 中新增 `--your-color: 200 50% 50%;`（HSL 元组）
2. 在 `tailwind.config.js` `theme.extend.colors` 中注册 `yourColor: 'hsl(var(--your-color) / <alpha-value>)'`
3. 使用 `bg-yourColor` / `text-yourColor`

### 13.4 新增 shadcn/ui 组件

```bash
# 1. 确保已安装 shadcn CLI（或使用 npx）
npx shadcn@latest add accordion
# 组件会自动复制到 src/components/ui/accordion.tsx
```

---

## 14. 模块依赖关系图

```
main.tsx
  ├─ App.tsx
  │   ├─ sections/Navbar.tsx
  │   ├─ sections/HeroSection.tsx
  │   ├─ sections/CompanySection.tsx
  │   ├─ sections/ChairmanSection.tsx
  │   ├─ sections/CarriersSection.tsx
  │   ├─ sections/IncubatorsSection.tsx
  │   ├─ sections/CultureSection.tsx
  │   ├─ sections/PartnersSection.tsx
  │   └─ sections/Footer.tsx
  │
  └─ index.css  (Tailwind base + CSS variables)
      └─ tailwind.config.js  (主题扩展)

lib/
  ├─ cms.ts  (fetchWithTimeout, loadCMSData, loadXxxData)
  └─ utils.ts  (cn: clsx + twMerge)

hooks/
  └─ use-mobile.ts  (useIsMobile)

components/ui/  (40+ 个 shadcn/ui 组件)
  ├─ button.tsx ──▶ lib/utils.ts
  ├─ card.tsx   ──▶ lib/utils.ts
  ├─ dialog.tsx ──▶ @radix-ui/react-dialog
  └─ ...

public/
  ├─ content/*.json  (CMS 数据，由 cms.ts 读取)
  ├─ images/*        (静态图片)
  └─ admin/
      ├─ config.yml  (Decap CMS 字段配置)
      └─ index.html  (CMS 入口)

外部依赖（顶层）： react, react-dom, react-router, tailwindcss, vite, typescript
```

---

## 15. 常见问题 FAQ

**Q1: 为什么启动后 Navbar 和 Hero 内容重叠？**
这是 `position: fixed` 的正常特性。HeroSection 设计为 `h-screen` 首屏，所以在首屏内 Navbar 叠加在背景上是故意的设计 — 这也是「滚动变色」的前提。

**Q2: 修改内容数据后页面未更新？**
若数据来自 `public/content/*.json`：需要重启开发服务器（Vite 的 HMR 不追踪 `public/` 变化），或手动刷新浏览器。

**Q3: 滚动入场动画没有触发？**
请检查：
1. 目标元素是否有 `.rvl` 类名
2. 容器是否设置了正确的 `ref`
3. `IntersectionObserver` 的 `threshold` 是否过高（元素无法滚动到足够可见比例）

**Q4: 如何部署到子路径（如 `https://domain/sub/`）？**
`vite.config.ts` 中已经配置 `base: './'`，无需额外修改，直接部署即可。

**Q5: Decap CMS 提示登录失败？**
`public/admin/config.yml` 中的 `repo: YOUR_USERNAME/YOUR_REPO` 需要替换为你的实际 GitHub 仓库地址，并配置 OAuth 认证代理。

---

## 16. 文件索引（快速跳转）

| 模块 | 关键文件 |
|------|----------|
| 应用入口 | [main.tsx](file:///workspace/src/main.tsx) · [index.html](file:///workspace/index.html) |
| 根组件 | [App.tsx](file:///workspace/src/App.tsx) |
| 导航栏 | [Navbar.tsx](file:///workspace/src/sections/Navbar.tsx) |
| 首屏 | [HeroSection.tsx](file:///workspace/src/sections/HeroSection.tsx) |
| 公司简介 | [CompanySection.tsx](file:///workspace/src/sections/CompanySection.tsx) |
| 创始人 | [ChairmanSection.tsx](file:///workspace/src/sections/ChairmanSection.tsx) |
| 载体 | [CarriersSection.tsx](file:///workspace/src/sections/CarriersSection.tsx) |
| 孵化器 | [IncubatorsSection.tsx](file:///workspace/src/sections/IncubatorsSection.tsx) |
| 商旅文化 | [CultureSection.tsx](file:///workspace/src/sections/CultureSection.tsx) |
| 合作伙伴 | [PartnersSection.tsx](file:///workspace/src/sections/PartnersSection.tsx) |
| 页脚 | [Footer.tsx](file:///workspace/src/sections/Footer.tsx) |
| CMS 加载 | [cms.ts](file:///workspace/src/lib/cms.ts) |
| 通用工具 | [utils.ts](file:///workspace/src/lib/utils.ts) |
| 移动端 Hook | [use-mobile.ts](file:///workspace/src/components/hooks/use-mobile.ts) |
| UI 组件 | [src/components/ui/](file:///workspace/src/components/ui/) |
| 全局样式 | [index.css](file:///workspace/src/index.css) |
| Tailwind 配置 | [tailwind.config.js](file:///workspace/tailwind.config.js) |
| Vite 配置 | [vite.config.ts](file:///workspace/vite.config.ts) |
| 依赖管理 | [package.json](file:///workspace/package.json) |
| TypeScript 配置 | [tsconfig.json](file:///workspace/tsconfig.json) |
| shadcn/ui 配置 | [components.json](file:///workspace/components.json) |
| CMS 配置 | [config.yml](file:///workspace/public/admin/config.yml) |
| 公司数据 | [company.json](file:///workspace/public/content/company.json) |

---

*本文档维护者：开发团队 · 最后更新：2026-06-13*
