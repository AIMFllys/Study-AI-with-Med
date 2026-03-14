# 🧬 Study AI with Med

> **羽升（YuSheng）的 AI 赋能医学探索日志**

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## 📖 About

本项目是我在学习和研究**人工智能赋能医学**方向过程中的系统性记录。从蛋白质折叠的生成式突破到多模态临床决策智能体，深度剖析当前国内外最成功及最具前景的 AI 医学核心成就。

- 🔬 **深度拆解** — 每一项突破背后的底层算法原理（扩散模型、GNN、多模态 Transformer 等）
- 🧪 **动手实验** — 跑通精选的开源项目，记录过程与发现
- 📚 **严格引用** — 所有内容标注学术来源，可追溯可验证
- 🌐 **开源共享** — 所有代码与内容开放于 GitHub

## 🚀 Features

- **MDX 富文本引擎** — LaTeX 数学公式 (KaTeX)、Mermaid 流程图、语法高亮代码块 (Shiki)
- **浏览器端 Python 运行** — 基于 Pyodide (WebAssembly)，无需后端服务器
- **日夜模式切换** — next-themes + Tailwind v4 CSS 变量体系
- **右侧目录导航** — IntersectionObserver 滚动高亮
- **动态路由** — `content/` 下新增 `.mdx` 文件即自动生成页面
- **AI 可读接口** — `/api/content` JSON API 暴露全部内容

## 📂 研究主题

| # | 主题 | 关键技术 | 代表成就 |
|---|------|----------|----------|
| 1 | 蛋白质结构解析与生命分子生成 | 条件扩散模型、因果语言建模 | AlphaFold 3、xTrimoPGLM |
| 2 | AI 药物发现全生命周期 (AIDD) | 图神经网络、GAN、强化学习 | 英矽智能 Pharma.AI |
| 3 | 多模态医疗大模型 (Med-LLMs) | 多模态 Transformer、知识图谱对齐 | Med-Gemini、混元医疗 |
| 4 | 精准医学影像与数字病理 | 3D CNN/ViT、计算流体力学 | PANDA、数坤 CT-FFR |
| 5 | 临床智能体 (Agentic AI) | 多智能体协作、工具调用 | SurgBox、PsyDraw、IMAS |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16+ (App Router, Turbopack) |
| Language | TypeScript 5, React 19 |
| Content | MDX, next-mdx-remote, gray-matter |
| Math | remark-math + rehype-katex (KaTeX) |
| Code | rehype-pretty-code (Shiki) |
| Diagrams | Mermaid.js |
| Python | Pyodide (WASM) |
| Styling | Tailwind CSS v4, next-themes |
| Icons | Lucide React |

## 🏃 Getting Started

```bash
# Clone
git clone https://github.com/AIMFllys/Study-AI-with-Med.git
cd Study-AI-with-Med

# Install
npm install

# Dev (port 5986)
npm run dev

# Build
npm run build
```

Open [http://localhost:5986](http://localhost:5986) to view the platform.

## 📝 Adding New Content

1. Create a `.mdx` file in `content/` directory
2. Add frontmatter (title, description, category, references)
3. Write content using standard Markdown + custom components
4. The page is automatically available at `/research/[your-filename]`

**Available MDX Components:**
- `<Callout type="info|warning|danger">` — Highlight boxes
- `<MermaidChart>` — Flowcharts & diagrams
- `<PythonRunner>` — Browser-based Python execution
- `<GitHubCard repo="owner/name" />` — GitHub project cards
- `<Citation id="refId" />` — Academic citations
- `<ReferenceList />` — Auto-generated reference list

## 📚 References

All citations within the platform are sourced from peer-reviewed publications, official documentation, and authoritative industry reports. Each article includes a complete reference list with DOI/URL links.

## 📄 License

MIT © 2026 YuSheng (羽升)
