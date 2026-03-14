'use client';

export default function AboutPage() {
  return (
    <div
      className="max-w-3xl mx-auto py-16 px-8"
      style={{ animation: 'page-turn 0.5s cubic-bezier(0.23,1,0.32,1) both' }}
    >
      {/* 页眉标注 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-8" style={{ background: 'var(--accent)', opacity: 0.5 }} />
        <span
          className="font-sans text-[10px] tracking-[0.25em] uppercase"
          style={{ color: 'var(--accent)', opacity: 0.7 }}
        >
          About This Journal
        </span>
      </div>

      <h1
        className="font-serif font-bold mb-2 leading-tight"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)' }}
      >
        关于这个项目
      </h1>
      <p className="font-serif italic mb-12" style={{ color: 'var(--text-tertiary)', fontSize: '1.05rem' }}>
        A journey into AI and Medicine
      </p>

      <div className="space-y-1">

        {/* 研究者 */}
        <section
          className="py-8"
          style={{ borderBottom: '1px solid var(--rule-color)', animation: 'fade-up 0.5s ease 0.1s both' }}
        >
          <h2
            className="font-serif font-bold text-xl mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            研究者
          </h2>
          <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>羽升 (YuSheng)</strong>
            {' '}— 一位正在探索人工智能赋能医学方向的学习者。本项目是系统性记录这一探索过程的开放式研究日志，内容全部开源于{' '}
            <a
              href="https://github.com/AIMFllys/Study-AI-with-Med"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors"
              style={{ color: 'var(--accent)', textDecoration: 'underline', textDecorationColor: 'rgba(14,165,233,0.3)' }}
            >
              GitHub
            </a>。
          </p>
        </section>

        {/* 项目目标 */}
        <section
          className="py-8"
          style={{ borderBottom: '1px solid var(--rule-color)', animation: 'fade-up 0.5s ease 0.2s both' }}
        >
          <h2
            className="font-serif font-bold text-xl mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            项目目标
          </h2>
          <ol className="space-y-4">
            {[
              '通俗拆解 AI 赋能医学的底层算法原理，让非 CS 背景的医学生也能读懂',
              '梳理全球顶尖 AI 医学成就及其开源生态，构建系统性知识图谱',
              '通过动手运行开源项目（如 Boltz 蛋白质预测）建立直觉与理解',
              '选定和深入分析最有前景的研究方向，形成可引用的参考资料',
            ].map((goal, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="font-serif italic font-bold shrink-0 mt-0.5 w-6 text-center"
                  style={{ color: 'var(--accent)', opacity: 0.7 }}
                >
                  {i + 1}.
                </span>
                <span className="font-body text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {goal}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* 技术栈 */}
        <section
          className="py-8"
          style={{ animation: 'fade-up 0.5s ease 0.3s both' }}
        >
          <h2
            className="font-serif font-bold text-xl mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            技术栈
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Next.js 16+', 'React 19', 'TypeScript',
              'Tailwind v4', 'MDX', 'KaTeX',
              'Mermaid.js', 'Pyodide (WASM)', 'Shiki',
            ].map((tech) => (
              <div
                key={tech}
                className="px-4 py-3 rounded-sm font-sans text-sm text-center transition-all duration-200 cursor-default"
                style={{
                  border: '1px solid var(--card-border)',
                  color: 'var(--text-secondary)',
                  background: 'var(--card-bg)',
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
                {tech}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
