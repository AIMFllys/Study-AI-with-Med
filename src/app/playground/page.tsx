export default function PlaygroundPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-gradient mb-6">
        🐍 Python 在线实验场
      </h1>
      <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
        基于 Pyodide (WebAssembly) 的浏览器端 Python 运行环境。无需后端服务器，代码直接在您的浏览器中执行。
      </p>
      <div className="glass-card p-8 text-center text-[var(--text-secondary)]">
        <p className="text-6xl mb-4">🚧</p>
        <p className="text-lg">独立实验场功能正在准备中...</p>
        <p className="text-sm mt-2">目前您可以在各研究报告页面中直接运行 Python 代码块。</p>
      </div>
    </div>
  );
}
