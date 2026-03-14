export default function PlaygroundPage() {
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
          Interactive · Experiments
        </span>
      </div>

      <h1
        className="font-serif font-bold mb-2 leading-tight"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)' }}
      >
        Python 实验场
      </h1>
      <p className="font-serif italic mb-10" style={{ color: 'var(--text-tertiary)', fontSize: '1.05rem' }}>
        Browser-native execution, zero setup
      </p>

      <p className="font-body text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
        基于 <strong style={{ color: 'var(--text-primary)' }}>Pyodide (WebAssembly)</strong> 的浏览器端 Python 运行环境。
        无需后端服务器，代码直接在您的浏览器中执行，支持 NumPy、生物信息学等科学计算库。
      </p>

      {/* 施工提示：书籍风格 */}
      <div
        className="rounded-sm p-10 text-center"
        style={{
          border: '1px solid var(--card-border)',
          background: 'var(--card-bg)',
        }}
      >
        {/* 装饰性墨水图标 */}
        <div
          className="mx-auto mb-6 w-16 h-16 rounded-sm flex items-center justify-center font-serif italic font-black text-3xl"
          style={{
            border: '1px solid var(--card-border)',
            color: 'var(--accent)',
            opacity: 0.5,
          }}
        >
          §
        </div>

        <p
          className="font-serif font-bold text-xl mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          章节准备中
        </p>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text-tertiary)' }}>
          Coming Soon
        </p>

        <div className="h-px mx-auto w-16 mb-5" style={{ background: 'var(--accent)', opacity: 0.2 }} />

        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          独立实验场功能正在准备中。目前，您可以在各研究报告页面的{' '}
          <span style={{ color: 'var(--accent)' }}>Python Runner</span>{' '}
          代码块中直接运行实验代码。
        </p>
      </div>
    </div>
  );
}
