export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-gradient mb-6">
        关于这个项目
      </h1>

      <div className="space-y-8">
        <section className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">👨‍🔬 研究者</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            <strong className="text-[var(--text-primary)]">羽升 (YuSheng)</strong> — 一位正在探索人工智能赋能医学方向的学习者。
            本项目是系统性记录这一探索过程的开放式研究日志。
          </p>
        </section>

        <section className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">🎯 项目目标</h2>
          <ul className="space-y-3 text-[var(--text-secondary)]">
            <li className="flex items-start gap-3">
              <span className="text-medical-cyan mt-1">●</span>
              <span>通俗拆解 AI 赋能医学的底层算法原理</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-medical-cyan mt-1">●</span>
              <span>梳理全球顶尖 AI 医学成就及其开源生态</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-medical-cyan mt-1">●</span>
              <span>通过动手运行开源项目建立直觉与理解</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-medical-cyan mt-1">●</span>
              <span>选定和深入分析最有前景的研究方向</span>
            </li>
          </ul>
        </section>

        <section className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">🛠️ 技术栈</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Next.js 16+', 'React 19', 'TypeScript',
              'Tailwind v4', 'MDX', 'KaTeX',
              'Mermaid.js', 'Pyodide (WASM)', 'Shiki',
            ].map((tech) => (
              <div key={tech} className="px-4 py-2.5 rounded-lg bg-white/5 dark:bg-white/5 bg-black/5 border border-[var(--card-border)] text-sm text-[var(--text-secondary)] text-center">
                {tech}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
