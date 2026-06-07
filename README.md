# 企业官网前端项目

一个基于 React + TypeScript + Vite 构建的现代化企业官网，采用纯静态部署方案，支持响应式布局和滚动视差动画效果。

## 在线预览

**当前预览地址**: [https://enterprise-website-template-nine.vercel.app/]

> 建议自行部署到 Vercel / Netlify 以获得稳定访问，部署方法见下方「部署指南」。

## 项目截图

*(可自行补充截图)*

## 技术栈

| 技术 | 说明 |
|------|------|
| [React 18](https://react.dev/) | UI 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Vite](https://vitejs.dev/) | 构建工具 |
| [Tailwind CSS](https://tailwindcss.com/) | 原子化 CSS 框架 |
| [Decap CMS](https://decapcms.org/) | 内容管理系统 |
| [Nginx](https://nginx.org/) | 静态资源服务器 |

## 项目亮点

- **滚动视差动画**：基于原生 `IntersectionObserver API` 实现，无需第三方动画库
- **图片轮播组件**：自定义 React 组件，支持自动轮播和手动切换
- **CMS 内容管理**：通过 Decap CMS 实现后台编辑，内容变更自动触发 CI/CD 部署
- **性能优化**：首屏加载控制在 300KB 以内（gzip），Lighthouse 性能评分 90+
- **纯静态部署**：无后端依赖，安全性高，部署成本低
- **响应式布局**：完美适配 PC、平板、手机等多种设备

## 快速开始

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 进入项目目录
cd YOUR_REPO

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
.
├── public/                  # 静态资源
│   ├── images/             # 图片资源
│   ├── content/            # CMS 内容数据（JSON）
│   └── admin/              # Decap CMS 后台入口
├── src/
│   ├── sections/           # 页面区块组件
│   │   ├── HeroSection.tsx     # 首屏
│   │   ├── CompanySection.tsx  # 公司简介
│   │   ├── ChairmanSection.tsx # 创始人介绍
│   │   ├── CarriersSection.tsx # 载体简介
│   │   ├── IncubatorsSection.tsx # 孵化器
│   │   ├── CultureSection.tsx   # 商旅文化
│   │   ├── PartnersSection.tsx  # 合作伙伴
│   │   ├── Navbar.tsx          # 导航栏
│   │   └── Footer.tsx          # 页脚
│   ├── lib/
│   │   └── cms.ts          # CMS 数据加载工具
│   ├── App.tsx             # 根组件
│   ├── main.tsx            # 入口文件
│   └── index.css           # 全局样式
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 内容管理（CMS）

项目接入了 Decap CMS，通过以下方式访问管理后台：

1. 部署网站后访问 `https://your-domain.com/admin`
2. 使用 GitHub 账号登录
3. 在后台编辑内容，保存后自动触发构建部署

### CMS 配置说明

- 配置文件：`public/admin/config.yml`
- 内容数据：`public/content/*.json`
- 媒体上传：`public/images/uploads/`

**使用前需修改**：将 `config.yml` 中的 `YOUR_USERNAME/YOUR_REPO` 替换为你的 GitHub 用户名和仓库名。

## 部署指南

### 方式一：Vercel（推荐）

1. Fork 本项目到你的 GitHub
2. 登录 [Vercel](https://vercel.com)
3. 导入 GitHub 仓库，一键部署

### 方式二：Netlify

1. Fork 本项目
2. 登录 [Netlify](https://netlify.com)
3. 连接 GitHub 仓库，自动构建部署

### 方式三：自有服务器（Nginx）

```bash
# 构建生产版本
npm run build

# 将 dist/ 目录内容上传到服务器
scp -r dist/* user@your-server:/var/www/html/
```

Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    # 前端路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

## 自定义配置

### 修改公司信息

编辑 `public/content/` 目录下的 JSON 文件即可更新网站内容：

- `chairman.json` — 创始人信息
- `carriers.json` — 载体简介
- `incubators.json` — 孵化器信息
- `culture.json` — 商旅文化
- `company.json` — 公司基本信息

### 修改主题色

编辑 `src/index.css` 和 `tailwind.config.js` 中的颜色配置。

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可证

[MIT](LICENSE)

---

> 本项目为个人作品集展示用途，所有公司信息、联系方式等均为虚构示例数据。
