import Link from 'next/link';
import { Typewriter } from './HomeInteractions';

export function HomeHero({ directionCount }: { directionCount: number }) {
  return (
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
              YuSheng&apos;s Research Journal · 2026
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
              <Typewriter text="底层原理  ·  前沿成就  ·  动手实验" speed={45} startDelay={1200} />
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
              className="home-cta-primary no-underline inline-flex items-center gap-3 px-7 py-3.5 font-sans text-sm tracking-wider transition-all duration-300 rounded-sm"
            >
              <span>开始阅读</span>
              <span>→</span>
            </Link>
            <a
              href="https://github.com/AIMFllys/Study-AI-with-Med"
              target="_blank"
              rel="noopener noreferrer"
              className="home-cta-secondary no-underline inline-flex items-center gap-2 px-7 py-3.5 font-sans text-sm tracking-wider transition-all duration-300 rounded-sm border"
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
            <p className="font-sans text-[10px] text-[var(--text-tertiary)]">{directionCount} 个研究方向</p>
          </div>
        </div>
      </div>

      {/* 底部过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
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
