# 🧬 Study AI with Med

> **这是羽升的 AI 赋能医学学习日志 —— 一个初学者的真实探索记录**

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 📖 这是什么？

我是一名正在学习 **AI 赋能医学** 方向的在校学生（完全初学者）。

这个仓库是我**边学边记**的过程产物。我的目标很简单：

1. 先读一读相关报告和论文，弄清楚"这个东西是做什么用的"
2. 找几个开源项目，在自己电脑上跑通，看看实际效果是什么样的
3. 把学到的内容整理成笔记，写在这个网站上留存

我不敢说自己"深度理解"了什么，很多内容我自己也还在摸索。如果你也在入门这个方向，欢迎一起交流 :)

---

| 方向 | 简单说就是… | 代表工作 | 进度 |
|------|------------|----------|---------|
| 蛋白质结构预测 | 计算机怎么"猜"出蛋白质的形状 | AlphaFold 3、xTrimoPGLM | 📝 入门学习中 |
| AI 药物设计 (AIDD) | 用 AI 设计新药分子 | 英矽智能 Pharma.AI | 📝 笔记草拟中 |
| 医疗大模型 | 会看 CT 会读病历的 AI | Med-Gemini、混元医疗 | 📝 资料收集中 |
| 临床 AI 智能体 | AI 像医生一样自己做决策 | ReAct 框架 | 📝 尝试运行中 |
| 本地部署指南 | **小白也能跑的医学 AI 工具详细教程** | Ollama, Local Models | 🚀 计划中 |
| 自动化脚本 | **撰写 .ps1 脚本实现一键本地运行** | PowerShell Automation | 🚀 计划中 |

---

## 🧪 动手部分说明

笔记里包含一些可以**直接在浏览器里运行的 Python 小代码**（基于 Pyodide/WASM，无需安装任何环境），主要是我用来验证自己理解的一些简单演示，不是生产级别的代码，仅供参考。

---

## 🌐 网站功能

网站用 Next.js 搭建，支持学术笔记常用的各种排版：

- **数学公式**（KaTeX）—— 看论文时常常遇到，我直接把公式搬进来了
- **流程图**（Mermaid）—— 用来帮自己理清算法流程
- **代码高亮**（Shiki）—— 阅读开源项目代码时的笔记
- **浏览器 Python**（Pyodide）—— 点击就能运行的小实验
- **日夜模式**、**右侧目录导航**

---

## 🏃 本地运行

如果你想在本地跑这个项目：

```bash
git clone https://github.com/AIMFllys/Study-AI-with-Med.git
cd Study-AI-with-Med

npm install

# 启动，端口默认 5986
npm run dev
```

打开 [http://localhost:5986](http://localhost:5986) 即可。

---

## ✏️ 添加新笔记

在 `content/` 目录下新建 `.mdx` 文件，写好 frontmatter，页面就会自动出现在网站里：

```yaml
---
title: "笔记标题"
description: "简介"
date: "2026-03-14"
category: "分类"
order: 5
---
```

支持的特殊组件：`<Callout>`、`<MermaidChart>`、`<PythonRunner>`、`<GitHubCard>`、`<Citation>`

---

## 📚 关于引用

尽量做到每一条内容都有明确来源。引用格式参考学术规范，来源包括公开论文（Nature / arXiv）、官方文档和行业报告。如有错误欢迎指正。

---

## 🙋 关于我

**华中科技大学基础医学院学生**，对 AI 方向有一定兴趣。

目前完全是一个**刚刚入门的小白**，我不敢说自己“深度理解”了什么，这里记录的每一行文字都是我边看论文、边跑代码时的笨拙尝试。如果内容中有任何理解不到位或专业性错误，恳请各位学术大佬和技术大牛海涵并多多指点，我一定虚心请教并及时更正。

这个仓库就是我的公开学习笔记本，希望能和志同道合的朋友一起在这个奇妙的交叉领域学一点东西。

---

*MIT © 2026 羽升 (YuSheng) · from **1037solo** 团队*
