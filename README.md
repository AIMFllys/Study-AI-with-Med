<p align="center">
  <img src="public/logo.svg" alt="Study AI with Med" width="80" />
</p>

<h1 align="center">🧬 Study AI with Med</h1>

<p align="center">
  <strong>AI 赋能医学 · 一个初学者的学习日志与开源笔记站</strong>
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
</p>

---

## 📖 关于本项目

我是一名正在学习 **AI 赋能医学** 方向的华科基础医学院在校学生（完全初学者）。

这个仓库是我**边学边记**的过程产物，目标很简单：

1. 阅读相关报告和论文，弄清楚"这个东西是做什么用的"
2. 找几个开源项目，在自己电脑上跑通，看看实际效果
3. 把学到的内容整理成笔记，写在这个网站上留存

> 如果你也在入门这个方向，欢迎一起交流 :)

---

## 🗂️ 学习方向一览

| 方向 | 简单说就是… | 代表工作 | 进度 |
|------|------------|----------|------|
| 🧬 蛋白质结构预测 | 计算机怎么"猜"出蛋白质的形状 | AlphaFold 3、xTrimoPGLM | 📝 入门学习中 |
| 💊 AI 药物设计 (AIDD) | 用 AI 设计新药分子 | 英矽智能 Pharma.AI | 📝 笔记草拟中 |
| 🏥 医疗大模型 | 会看 CT 会读病历的 AI | Med-Gemini、混元医疗 | 📝 资料收集中 |
| 🤖 临床 AI 智能体 | AI 像医生一样自己做决策 | ReAct 框架 | 📝 尝试运行中 |
| 🛠️ 本地部署指南 | 小白也能跑的医学 AI 工具教程 | Ollama, Local Models | 🚀 计划中 |
| ⚡ 自动化脚本 | 一键本地运行的 .ps1 脚本 | PowerShell Automation | 🚀 计划中 |

---

## ✨ 网站功能

基于 **Next.js 16 + MDX** 构建的学术笔记站，支持：

| 功能 | 技术 | 说明 |
|------|------|------|
| 数学公式 | KaTeX | 论文公式直接渲染 |
| 流程图 | Mermaid | 可视化算法流程 |
| 代码高亮 | Shiki | 多语言语法高亮 |
| 浏览器 Python | Pyodide / WASM | 点击即跑的小实验，无需安装 |
| 深色模式 | next-themes | 日/夜主题自动切换 |
| 目录导航 | 自动生成 | 右侧 TOC 锚点跳转 |

---

## 🏃 快速开始

### 环境要求

- **Node.js** >= 18
- **npm** >= 9

### 安装 & 运行

```bash
# 克隆仓库
git clone https://github.com/AIMFllys/Study-AI-with-Med.git
cd Study-AI-with-Med

# 安装依赖
npm install

# 启动开发服务器（端口 5986）
npm run dev
```

打开 [http://localhost:5986](http://localhost:5986) 即可浏览。

### 构建生产版本

```bash
npm run build
npm run start
```

---

## 📁 项目结构

```
Study-AI-with-Med/
├── content/            # MDX 笔记内容
│   ├── ai-analysis/    #   AI+X 多维分析
│   ├── ai-report/      #   AI 行业报告
│   ├── forum/          #   交流社区
│   ├── knowledge/      #   知识库
│   └── notes/          #   学习笔记
├── public/             # 静态资源
├── src/
│   ├── app/            # Next.js App Router 页面
│   ├── components/     # React 组件
│   ├── hooks/          # 自定义 Hooks
│   ├── lib/            # 工具函数 & MDX 处理
│   └── types/          # TypeScript 类型定义
├── next.config.ts      # Next.js 配置
├── tailwind.config.*   # Tailwind CSS 配置
└── tsconfig.json       # TypeScript 配置
```

---

## ✏️ 如何添加笔记

在 `content/` 目录下新建 `.mdx` 文件，填写 frontmatter 即可自动出现在网站中：

```yaml
---
title: "笔记标题"
description: "简介"
date: "2026-03-14"
category: "分类"
order: 5
---
```

支持的 MDX 组件：

- `<Callout>` — 提示 / 警告框
- `<MermaidChart>` — Mermaid 流程图
- `<PythonRunner>` — 浏览器内 Python 运行器
- `<GitHubCard>` — GitHub 仓库卡片
- `<Citation>` — 学术引用

---

## 📚 引用说明

尽量做到每条内容都有明确来源。引用格式参考学术规范，来源包括公开论文（Nature / arXiv）、官方文档和行业报告。如有错误欢迎指正。

---

## 🤝 贡献

欢迎通过 [Issues](https://github.com/AIMFllys/Study-AI-with-Med/issues) 提出建议或指正错误。

---

## 📄 许可证

本项目使用 [MIT 许可证](./LICENSE) 开源。

---

<p align="center">
  <sub>MIT © 2026 羽升 (YuSheng) · <a href="https://github.com/1037solo">1037solo</a> 团队</sub>
</p>
