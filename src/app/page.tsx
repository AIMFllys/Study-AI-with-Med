'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const chapters = [
  {
    number: 'I',
    title: 'AI+蛋白质预测',
    subtitle: '结构预测与生命分子生成',
    desc: 'AlphaFold 3 条件扩散模型，Boltz-1 开源复现，xTrimoPGLM 千亿参数蛋白质语言模型',
    slug: 'ai-analysis/ai-protein',
    hasContent: true,
    tags: ['扩散模型', 'MSA', 'pLDDT'],
    href: '/research/ai-analysis/ai-protein/intro',
  },
  {
    number: 'II',
    title: 'AI+药物发现',
    subtitle: '全生命周期智能加速',
    desc: '图神经网络分子建模，GAN 化学空间探索，英矽智能 Pharma.AI 端到端实践',
    slug: 'ai-analysis/ai-drug',
    hasContent: true,
    tags: ['GNN', 'AIDD', 'GAN'],
    href: '/research/ai-analysis/ai-drug/intro',
  },
  {
    number: 'III',
    title: 'AI+医疗大模型',
    subtitle: '多模态临床语言智能',
    desc: 'Med-Gemini 原生多模态联合编码，混元医疗 RAG 知识图谱对齐，幻觉抑制机制',
    slug: 'ai-analysis/ai-llm',
    hasContent: true,
    tags: ['多模态', 'RAG', 'LLM'],
    href: '/research/ai-analysis/ai-llm/intro',
  },
  {
    number: 'IV',
    title: 'AI+精准医学影像',
    subtitle: '超微结构感知与机会性筛查',
    desc: '达摩院 PANDA 平扫CT早癌筛查，数坤 CT-FFR 无创功能学评估，3D CNN 与流体力学融合',
    slug: 'ai-analysis/ai-imaging',
    hasContent: true,
    tags: ['3D CNN', 'CT-FFR', 'ViT'],
    href: '/research/ai-analysis/ai-imaging/intro',
  },
  {
    number: 'V',
    title: 'AI+临床智能体',
    subtitle: '自主工作流与决策闭环',
    desc: 'ReAct 推理框架，Tool-Use 工具调用，多智能体协作的临床全栈自治生态',
    slug: 'ai-analysis/ai-agent',
    hasContent: true,
    tags: ['Agent', 'ReAct', 'Multi-Agent'],
    href: '/research/ai-analysis/ai-agent/intro',
  },
];

function useIntersection(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return isVisible;
}

function ChapterCard({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<HTMLElement>);

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${index * 0.12}s`,
      }}
    >
      {chapter.hasContent ? (
        <Link href={chapter.href || `/research/${chapter.slug}`} className="block no-underline">
          <CardInner chapter={chapter} />
        </Link>
      ) : (
        <div className="cursor-default">
          <CardInner chapter={chapter} dimmed />
        </div>
      )}
    </div>
  );
}

function CardInner({ chapter, dimmed }: { chapter: typeof chapters[0]; dimmed?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border transition-all duration-500
        ${dimmed
          ? 'border-[var(--card-border)] opacity-55 bg-[var(--card-bg)]'
          : 'border-[var(--card-border)] hover:border-[var(--accent)] bg-[var(--card-bg)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15),0_0_0_1px_rgba(14,165,233,0.15)]'
        }
      `}
    >
      {/* 顶部金色细线（书签效果） */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent
        transition-opacity duration-500 ${dimmed ? 'opacity-20' : 'opacity-0 group-hover:opacity-100'}`}
      />

      {/* 书脊左侧线 */}
      <div className={`absolute left-0 top-6 bottom-6 w-[2px]
        bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent
        transition-opacity duration-500 ${dimmed ? 'opacity-10' : 'opacity-0 group-hover:opacity-60'}`}
      />

      <div className="p-8">
        {/* 章节号 */}
        <div className="flex items-baseline justify-between mb-6">
          <span
            className="font-serif italic text-4xl font-bold leading-none"
            style={{ color: dimmed ? 'var(--text-tertiary)' : 'var(--accent)', opacity: 0.7 }}
          >
            {chapter.number}
          </span>
          {!chapter.hasContent && (
            <span className="text-[10px] font-sans tracking-[0.18em] uppercase px-2 py-1 rounded-sm border border-[var(--card-border)] text-[var(--text-tertiary)]">
              即将上线
            </span>
          )}
        </div>

        {/* 标题 */}
        <h3 className={`font-serif font-bold text-xl leading-tight mb-1
          transition-colors duration-300
          ${dimmed ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'}`}
        >
          {chapter.title}
        </h3>
        <p className="font-sans text-xs tracking-widest uppercase text-[var(--text-tertiary)] mb-4">
          {chapter.subtitle}
        </p>

        {/* 分隔线 */}
        <div className="h-px bg-gradient-to-r from-[var(--accent)] to-transparent opacity-20 mb-5" />

        {/* 描述 */}
        <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)] mb-6">
          {chapter.desc}
        </p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {chapter.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-sans tracking-wider px-2.5 py-1 rounded-sm"
              style={{
                background: dimmed ? 'transparent' : 'rgba(14,165,233,0.07)',
                border: `1px solid ${dimmed ? 'var(--card-border)' : 'rgba(14,165,233,0.2)'}`,
                color: dimmed ? 'var(--text-tertiary)' : 'var(--accent)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 阅读指引 */}
        {!dimmed && (
          <div className="flex items-center gap-2 mt-6 text-xs font-sans text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <span>进入章节</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        )}
      </div>
    </div>
  );
}

// 打字机效果 Hook
function useTypewriter(text: string, speed = 40, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return displayed;
}

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsVisible = useIntersection(statsRef as React.RefObject<HTMLElement>);
  const subtitle = useTypewriter('底层原理  ·  前沿成就  ·  动手实验', 45, 1200);

  return (
    <div className="min-h-screen">

      {/* ── Hero Section：书籍封面风格 ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">

        {/* 背景：墨水晕染光晕 */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-0 right-0 w-[55%] h-full opacity-[0.03] dark:opacity-[0.06]"
            style={{
              background: 'radial-gradient(ellipse at 80% 40%, #0ea5e9 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[40%] h-[60%] opacity-[0.04] dark:opacity-[0.05]"
            style={{
              background: 'radial-gradient(ellipse at 20% 80%, #7c6fa0 0%, transparent 65%)',
            }}
          />
          {/* 极细的横向印刷基线 */}
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px"
              style={{
                top: `${(i + 1) * 5.5}%`,
                background: 'var(--rule-color)',
                opacity: 0.3,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-16 py-16 sm:py-24 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          {/* 左：主要文字 */}
          <div>
            {/* 书名页顶部标注 */}
            <div
              className="flex items-center gap-3 mb-10"
              style={{
                animation: 'fade-up 0.6s ease 0.1s both',
              }}
            >
              <div className="h-px w-10 bg-[var(--accent)] opacity-60" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] opacity-80">
                YuSheng's Research Journal · 2026
              </span>
            </div>

            {/* 主标题：出版物大字排版 */}
            <h1
              className="font-serif leading-[0.95] tracking-tight mb-8"
              style={{ animation: 'fade-up 0.7s ease 0.3s both' }}
            >
              <span
                className="block text-[clamp(3.5rem,9vw,8rem)] font-black"
                style={{ color: 'var(--text-primary)' }}
              >
                Study
              </span>
              <span
                className="block text-[clamp(3.5rem,9vw,8rem)] font-black text-gradient-shimmer ml-[0.08em]"
              >
                AI
              </span>
              <span
                className="block text-[clamp(1.8rem,4vw,3.5rem)] font-light italic"
                style={{ color: 'var(--text-secondary)', marginLeft: '0.12em', marginTop: '0.1em' }}
              >
                with Medicine
              </span>
            </h1>

            {/* 副标题：打字机效果 */}
            <div
              className="mb-12"
              style={{ animation: 'fade-up 0.6s ease 0.7s both' }}
            >
              <div className="h-px w-16 bg-[var(--accent)] opacity-40 mb-4" />
              <p className="font-sans text-sm tracking-[0.1em] text-[var(--text-secondary)] min-h-[1.5rem]">
                {subtitle}
                <span className="inline-block w-px h-4 bg-[var(--accent)] ml-0.5 animate-pulse align-middle" />
              </p>
            </div>

            {/* 引言 */}
            <blockquote
              className="border-l-2 border-[var(--accent)] pl-5 mb-12 max-w-xl"
              style={{ animation: 'fade-up 0.6s ease 0.9s both', borderColor: 'var(--accent)', opacity: 0.8 }}
            >
              <p className="font-body italic text-[var(--text-secondary)] leading-relaxed text-base">
                从蛋白质折叠的生成式突破，到多模态临床决策智能体——
                系统性深度剖析人工智能如何重塑生命科学的底层逻辑。
              </p>
            </blockquote>

            {/* CTA 按钮组 */}
            <div
              className="flex flex-wrap gap-4"
              style={{ animation: 'fade-up 0.6s ease 1.1s both' }}
            >
              <Link
                href="/research"
                className="no-underline inline-flex items-center gap-3 px-7 py-3.5 font-sans text-sm tracking-wider transition-all duration-300 rounded-sm"
                style={{
                  background: 'var(--accent)',
                  color: '#0d0d0e',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent-light)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(14,165,233,0.25)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <span>开始阅读</span>
                <span>→</span>
              </Link>
              <a
                href="https://github.com/AIMFllys/Study-AI-with-Med"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline inline-flex items-center gap-2 px-7 py-3.5 font-sans text-sm tracking-wider transition-all duration-300 rounded-sm border"
                style={{
                  borderColor: 'var(--card-border)',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                GitHub
              </a>
            </div>

            {/* 🔥 论文推荐 CTA — 发光横幅 */}
            <div
              className="mt-8"
              style={{ animation: 'fade-up 0.6s ease 1.4s both' }}
            >
              <Link
                href="/research/ai-report/qingnang-medical-ai"
                className="no-underline group/paper block relative overflow-hidden rounded-lg p-[1px]"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #22d3ee, #0ea5e9, #7dd3fc)',
                  backgroundSize: '300% 300%',
                  animation: 'glow-border-shift 4s ease-in-out infinite',
                }}
              >
                {/* Glow shadow layer */}
                <div
                  className="absolute inset-0 rounded-lg opacity-40 blur-xl -z-10"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
                    animation: 'glow-pulse 2.5s ease-in-out infinite',
                  }}
                />
                <div
                  className="relative rounded-[7px] px-5 py-4 flex items-center gap-4 transition-all duration-300"
                  style={{
                    background: 'var(--bg-primary)',
                  }}
                >
                  {/* Icon */}
                  <span className="text-2xl shrink-0 group-hover/paper:scale-110 transition-transform duration-300">📄</span>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--accent)', opacity: 0.8 }}>
                      笔者分析 · Author&apos;s Analysis
                    </p>
                    <p className="font-serif text-sm font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                      AI赋能医疗更有前途的实例是——
                      <span style={{ color: 'var(--accent)' }}> 点击查看论文 →</span>
                    </p>
                  </div>
                  {/* Arrow */}
                  <span
                    className="hidden sm:block text-lg transition-all duration-300 group-hover/paper:translate-x-1"
                    style={{ color: 'var(--accent)' }}
                  >
                    →
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* 右：装饰性书本图形 */}
          <div
            className="hidden lg:flex flex-col items-center gap-6 select-none"
            style={{ animation: 'fade-up 0.8s ease 0.5s both' }}
          >
            {/* 书籍堆叠图形 */}
            <BookStack />
            {/* 章节导览 */}
            <div className="text-center">
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--text-tertiary)] mb-1">目录</p>
              <p className="font-sans text-[10px] text-[var(--text-tertiary)]">5 个研究方向</p>
            </div>
          </div>
        </div>

        {/* 底部过渡 */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </section>

      {/* ── 统计栏 */}
      <div
        ref={statsRef}
        className="border-y border-[var(--rule-color)] py-6"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-4 gap-4 sm:gap-6">
          {[
            { num: '5', label: '研究方向' },
            { num: '5', label: '已完成章节' },
            { num: '20+', label: '开源项目追踪' },
            { num: '∞', label: '可运行代码实验' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'none' : 'translateY(12px)',
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div className="font-serif text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                {stat.num}
              </div>
              <div className="font-sans text-[11px] tracking-wider uppercase text-[var(--text-tertiary)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 目录页：章节卡片 ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-24">

        {/* 章节頁头 */}
        <div className="text-center mb-16">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-4 opacity-70">
            Table of Contents
          </p>
          <h2 className="font-serif text-4xl font-bold text-[var(--text-primary)] mb-4">
            研究目录
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[var(--accent)] opacity-40" />
            <span className="font-serif italic text-[var(--text-tertiary)] text-sm">
              Exploring the Frontier of AI in Medicine
            </span>
            <div className="h-px w-12 bg-[var(--accent)] opacity-40" />
          </div>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map((chapter, i) => (
            <ChapterCard key={chapter.slug} chapter={chapter} index={i} />
          ))}
        </div>
      </section>

      {/* ── 五大方向深度概览 ── */}
      <OverviewSection />

      {/* ── 未来前景四大体系 ── */}
      <FutureProspectsSection />

      {/* ── 开源生态亮点 ── */}
      <OpenSourceSection />

      {/* ── 关于这个项目：书籍封底风格 ── */}
      <section
        className="border-t border-[var(--rule-color)] py-20"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-6 opacity-70">
            About This Journal
          </p>
          <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)] mb-6">
            关于这个研究日志
          </h2>
          <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
            这是<strong className="text-[var(--text-primary)]">羽升（YuSheng）</strong>
            在探索 AI 赋能医学方向过程中的学习记录。基于全球与中国核心 AI 赋能医学成就及底层原理的深度分析，旨在通过系统性拆解每一项突破性技术背后的算法原理，构建可交互、可验证的知识体系。中国 AI 医疗产业规模已突破 7000 亿元，超过 95% 的临床医师认同 AI 的辅助价值。内容全部开源，欢迎共建。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Next.js 16', 'React 19', 'MDX', 'LaTeX', 'Mermaid', 'Pyodide WASM', 'Shiki', 'KaTeX'].map((tech) => (
              <span
                key={tech}
                className="font-sans text-xs px-4 py-2 rounded-sm border border-[var(--card-border)] text-[var(--text-tertiary)] tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── 五大方向深度概览 Section ── */
const overviewData = [
  {
    icon: '🧬',
    title: '蛋白质结构解析与分子生成',
    highlight: 'AlphaFold 3 + xTrimoPGLM',
    stat: '千亿级参数',
    detail: 'AlphaFold 3 引入条件扩散模型从"原子噪声云"中雕刻精确分子结构，百图生科 xTrimoPGLM 成为全球首个千亿级蛋白质语言模型，全面超越 ESM-2。',
    slug: 'ai-analysis/ai-protein/intro',
    disabled: false,
  },
  {
    icon: '💊',
    title: 'AI 重构新药全生命周期',
    highlight: '英矽智能 Pharma.AI',
    stat: '8个月提名候选药',
    detail: '英矽智能与施维雅达成 8.88 亿美元合作，仅 8 个月提名临床前候选药物；率先展示量子计算辅助药物生成算法 QFASG。',
    slug: 'ai-analysis/ai-drug/intro',
    disabled: false,
  },
  {
    icon: '🧠',
    title: '多模态医疗大模型',
    highlight: 'Med-Gemini + 混元医疗',
    stat: '31语言对30个第一',
    detail: 'Med-Gemini 原生多模态架构实现跨模态因果推理；腾讯 Hunyuan-MT 在 WMT2025 全面碾压 GPT-4 等顶尖模型。',
    slug: 'ai-analysis/ai-llm/intro',
    disabled: false,
  },
  {
    icon: '📡',
    title: '精准医学影像与数字病理',
    highlight: 'PANDA + 数坤 CT-FFR',
    stat: '24例遗漏肿瘤被发现',
    detail: '达摩院 PANDA 从平扫 CT 中精准发现人类遗漏的胰腺癌，获 FDA 突破性器械认定；数坤科技 3 分钟输出无创心功能报告。',
    slug: 'ai-analysis/ai-imaging/intro',
    disabled: false,
  },
  {
    icon: '🤖',
    title: '临床智能体自治协作',
    highlight: '多智能体 + ReAct',
    stat: '手术Copilot级应用',
    detail: '从 SurgBox 手术室副驾到 PsyDraw 儿童心理多模态评估，Agentic AI 成为连接基础模型与临床场景的终极桥梁。',
    slug: 'ai-analysis/ai-agent/intro',
    disabled: false,
  },
];

function OverviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<HTMLElement>);

  return (
    <section
      ref={ref}
      className="border-t border-[var(--rule-color)] py-16 sm:py-24"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-4 opacity-70">
            Research Landscape
          </p>
          <h2 className="font-serif text-4xl font-bold text-[var(--text-primary)] mb-4">
            五大方向深度概览
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[var(--accent)] opacity-40" />
            <span className="font-serif italic text-[var(--text-tertiary)] text-sm">
              Core Achievements & Breakthroughs
            </span>
            <div className="h-px w-12 bg-[var(--accent)] opacity-40" />
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-5">
          {overviewData.map((item, i) => {
            const cardContent = (
              <div
                className={`relative overflow-hidden rounded-sm border bg-[var(--card-bg)] transition-all duration-500 ${
                  item.disabled
                    ? 'border-[var(--card-border)] opacity-65'
                    : 'border-[var(--card-border)] hover:border-[var(--accent)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1),0_0_0_1px_rgba(14,165,233,0.1)]'
                }`}
                style={{
                  opacity: visible ? (item.disabled ? 0.65 : 1) : 0,
                  transform: visible ? 'none' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${i * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
                }}
              >
                {!item.disabled && (
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">
                  {/* Icon & stat */}
                  <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:min-w-[100px] sm:text-center shrink-0">
                    <span className="text-3xl">{item.icon}</span>
                    <span
                      className="font-sans text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm border border-[var(--accent)]/20 text-[var(--accent)] whitespace-nowrap"
                      style={{ background: 'rgba(14,165,233,0.06)' }}
                    >
                      {item.stat}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`font-serif font-bold text-lg transition-colors duration-300 ${
                        item.disabled ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'
                      }`}>
                        {item.title}
                      </h3>
                      {item.disabled && (
                        <span className="text-[9px] font-sans tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm border border-[var(--card-border)] text-[var(--text-tertiary)]">
                          即将上线
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs tracking-wider text-[var(--accent)] opacity-70 mb-3">
                      {item.highlight}
                    </p>
                    <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.detail}
                    </p>
                  </div>
                  {/* Arrow */}
                  {!item.disabled && (
                    <div className="hidden sm:flex items-center self-center text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                      <span className="text-lg">→</span>
                    </div>
                  )}
                </div>
              </div>
            );

            return item.disabled ? (
              <div key={item.slug} className="cursor-default">
                {cardContent}
              </div>
            ) : (
              <Link
                key={item.slug}
                href={`/research/${item.slug}`}
                className="no-underline block group"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 未来前景四大体系 Section ── */
const futureDirections = [
  {
    num: '01',
    title: '微观生命物质逆向生成',
    tech: '扩散模型 + 流匹配',
    desc: '从"盲盒试错"到"指哪打哪"——AI 直接在致病蛋白表面锁定分子缝隙，瞬间生成定制药物或 mRNA 纳米颗粒，药物筛选从数月骤降至分钟级。',
  },
  {
    num: '02',
    title: '高维复杂网络药理学',
    tech: 'GNN + 量子计算',
    desc: '突破"单靶点-单药物"困境，在数千万节点的生物网络中精准锁定核心枢纽节点，从头设计多靶点化合物，从"破坏元件"到"修复整个网络系统"。',
  },
  {
    num: '03',
    title: '机会性截胡筛查',
    tech: '3D ViT + 超微感知',
    desc: '普通低剂量 CT 即可在一瞬间排查骨折、肺结节、冠脉钙化、骨质疏松甚至神经退行性病变前兆——真正实现"治未病"理念。',
  },
  {
    num: '04',
    title: '临床全栈自治协作',
    tech: 'LLM + Multi-Agent',
    desc: '虚拟医院由高度细化的数字专家共同承担：影像 Agent、基因 Agent、文献 Agent 联合上报证据链，主治 Agent 综合输出个性化 MDT 治疗方案。',
  },
];

function FutureProspectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<HTMLElement>);

  return (
    <section
      ref={ref}
      className="border-t border-[var(--rule-color)] py-16 sm:py-24"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-16">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-4 opacity-70">
            Future Prospects
          </p>
          <h2 className="font-serif text-4xl font-bold text-[var(--text-primary)] mb-4">
            未来最具前景的四大体系
          </h2>
          <p className="font-body text-sm text-[var(--text-secondary)] max-w-2xl mx-auto">
            从算法底层核心原理出发，未来 5-10 年内最有可能彻底颠覆传统医学范式的核心方向
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureDirections.map((dir, i) => (
            <div
              key={dir.num}
              className="group relative overflow-hidden rounded-sm border border-[var(--card-border)] bg-[var(--card-bg)] p-8 transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${i * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
              }}
            >
              {/* Number overlay */}
              <span
                className="absolute top-4 right-6 font-serif text-6xl font-black leading-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                style={{ color: 'var(--accent)' }}
              >
                {dir.num}
              </span>

              <div className="relative">
                <span
                  className="inline-block font-sans text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm mb-4"
                  style={{
                    background: 'rgba(14,165,233,0.08)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(14,165,233,0.15)',
                  }}
                >
                  {dir.tech}
                </span>
                <h3 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {dir.title}
                </h3>
                <div className="h-px bg-gradient-to-r from-[var(--accent)] to-transparent opacity-15 mb-4" />
                <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                  {dir.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 开源生态亮点 Section ── */
const openSourceProjects = [
  { name: 'Boltz-1/Boltz-2', desc: '逼近 AlphaFold 3 的完全开源生物分子基础模型，MIT 协议', url: 'https://github.com/jwohlwend/boltz' },
  { name: 'xTrimoPGLM', desc: '千亿级蛋白质语言模型，7 个不同参数量版本', url: 'https://github.com/biomap-research/xTrimoPGLM' },
  { name: 'GENTRL', desc: '生成式张量强化学习药物分子从头设计框架', url: 'https://github.com/insilicomedicine/GENTRL' },
  { name: 'MedGemma', desc: 'Google 开源医疗多模态模型 4B/27B + MedSigLIP 编码器', url: 'https://github.com/google/medgemma' },
  { name: 'OpenMEDLab', desc: '全球首个医学多模态基础模型开源平台', url: 'https://github.com/openmedlab' },
  { name: 'MedLLMsPracticalGuide', desc: '业界最详尽的医疗大模型实战与资源仓库', url: 'https://github.com/AI-in-Health/MedLLMsPracticalGuide' },
  { name: 'CemrgApp', desc: '心血管研究交互式医学成像平台', url: 'https://github.com/OpenHeartDevelopers/CemrgApp' },
  { name: 'DORA', desc: 'AI 驱动的多智能体文献梳理与研究报告工具', url: 'https://github.com/insilicomedicine/DORA' },
];

function OpenSourceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<HTMLElement>);

  return (
    <section
      ref={ref}
      className="border-t border-[var(--rule-color)] py-16 sm:py-24"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-16">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-4 opacity-70">
            Open Source Ecosystem
          </p>
          <h2 className="font-serif text-4xl font-bold text-[var(--text-primary)] mb-4">
            开源生态亮点
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[var(--accent)] opacity-40" />
            <span className="font-serif italic text-[var(--text-tertiary)] text-sm">
              Democratizing AI for Medicine
            </span>
            <div className="h-px w-12 bg-[var(--accent)] opacity-40" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {openSourceProjects.map((proj, i) => (
            <a
              key={proj.name}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline group block"
            >
              <div
                className="relative h-full overflow-hidden rounded-sm border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, border-color 0.3s, box-shadow 0.3s`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <h4 className="font-sans text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 truncate">
                    {proj.name}
                  </h4>
                </div>
                <p className="font-body text-xs leading-relaxed text-[var(--text-secondary)]">
                  {proj.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 书本堆叠装饰组件 */
function BookStack() {
  const books = [
    { width: 120, height: 160, color: '#1a1612', label: 'I', angle: -4, x: -8, zIndex: 1 },
    { width: 115, height: 155, color: '#222016', label: 'II', angle: 1, x: 4, zIndex: 2 },
    { width: 118, height: 158, color: '#161412', label: 'III', angle: -1.5, x: 0, zIndex: 3 },
  ];

  return (
    <div className="relative h-52 w-40">
      {books.map((book, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
          style={{
            transform: `rotate(${book.angle}deg) translateX(${book.x}px)`,
            zIndex: book.zIndex,
          }}
        >
          <div
            className="rounded-sm relative overflow-hidden"
            style={{
              width: book.width,
              height: book.height,
              background: book.color,
              border: '1px solid rgba(14,165,233,0.25)',
              boxShadow: '4px 4px 20px rgba(0,0,0,0.5), inset -2px 0 0 rgba(255,255,255,0.03)',
            }}
          >
            {/* 书脊金色线条 */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#0ea5e9]/70 to-transparent" />
            {/* 章节号 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="font-serif italic text-[#0ea5e9]/60 text-2xl font-bold">{book.label}</span>
              <div className="w-8 h-px bg-[#0ea5e9]/30" />
              <span className="font-sans text-[8px] tracking-widest uppercase text-white/10">AI Med</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
