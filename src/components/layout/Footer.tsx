import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--rule-color)', background: 'var(--bg-secondary)' }}>
      {/* 装饰线 */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* 左：Logo + 版权 */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-[var(--accent)] text-lg font-bold opacity-80">AI Med</span>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--text-tertiary)]">Journal</span>
            </div>
            <p className="font-sans text-xs text-[var(--text-tertiary)] tracking-wide">
              © 2026 羽升 (YuSheng) · All rights reserved.
            </p>
          </div>

          {/* 中：装饰性引言 */}
          <div className="hidden md:block text-center">
            <p className="font-serif italic text-[var(--text-tertiary)] text-sm opacity-60">
              "Understanding the algorithm is the first step to transcending it."
            </p>
          </div>

          {/* 右：链接 */}
          <div className="flex items-center gap-5 font-sans text-xs text-[var(--text-tertiary)] tracking-wide">
            <a
              href="https://github.com/AIMFllys/Study-AI-with-Med"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors duration-200 hover:text-[var(--accent)]"
            >
              GitHub
            </a>
            <span className="opacity-20">·</span>
            <Link href="/research" className="no-underline transition-colors duration-200 hover:text-[var(--accent)]">
              研究报告
            </Link>
            <span className="opacity-20">·</span>
            <Link href="/about" className="no-underline transition-colors duration-200 hover:text-[var(--accent)]">
              关于
            </Link>
          </div>
        </div>

        {/* 底部技术栈 */}
        <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--rule-color)' }}>
          <p className="text-center font-sans text-[10px] tracking-widest uppercase text-[var(--text-tertiary)] opacity-40">
            Built with Next.js 16 · MDX · Pyodide WASM · KaTeX · Mermaid.js
          </p>
        </div>
      </div>
    </footer>
  );
}
