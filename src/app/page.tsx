import { getHomeResearchContent } from '@/lib/home';
import { Reveal } from '@/components/home/HomeInteractions';
import { HomeHero } from '@/components/home/HomeHero';
import { ChapterCard } from '@/components/home/ChapterCard';
import { OverviewSection } from '@/components/home/OverviewSection';
import { FutureProspectsSection } from '@/components/home/FutureProspectsSection';
import { OpenSourceSection } from '@/components/home/OpenSourceSection';

export default function Home() {
  const { chapters, overviewItems, directionCount } = getHomeResearchContent();

  return (
    <div className="min-h-screen">
      <HomeHero directionCount={directionCount} />

      {/* ── 统计栏 */}
      <div
        className="border-y border-[var(--rule-color)] py-6"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-4 gap-4 sm:gap-6">
          {[
            { num: String(directionCount), label: '研究方向' },
            { num: String(directionCount), label: '已完成章节' },
            { num: '20+', label: '开源项目追踪' },
            { num: '∞', label: '可运行代码实验' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} duration={0.5} easing="ease" y={12}>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                  {stat.num}
                </div>
                <div className="font-sans text-[11px] tracking-wider uppercase text-[var(--text-tertiary)] mt-1">
                  {stat.label}
                </div>
              </div>
            </Reveal>
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
      <OverviewSection items={overviewItems} />

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
