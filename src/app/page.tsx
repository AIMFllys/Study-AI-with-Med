import Link from 'next/link';

const directions = [
  {
    title: '蛋白质结构解析与生命分子生成',
    desc: 'AlphaFold 3 条件扩散模型 & 百图生科 xTrimoPGLM 千亿参数蛋白质语言模型',
    icon: '🧬',
    color: 'from-indigo-500 to-purple-500',
    slug: 'protein-engineering',
  },
  {
    title: 'AI 药物发现全生命周期 (AIDD)',
    desc: '英矽智能 Pharma.AI 平台：图神经网络 + 生成对抗网络 + 量子计算辅助',
    icon: '💊',
    color: 'from-cyan-500 to-blue-500',
    slug: 'ai-drug-discovery',
  },
  {
    title: '多模态医疗大模型 (Med-LLMs)',
    desc: 'Google Med-Gemini & 腾讯 Hunyuan-Med：原生多模态联合编码 + 知识图谱对齐',
    icon: '🧠',
    color: 'from-emerald-500 to-teal-500',
    slug: 'medical-llms',
  },
  {
    title: '精准医学影像与数字病理',
    desc: '阿里达摩院 PANDA 模型 & 数坤科技 CT-FFR：3D 视觉 + CFD 流体力学融合',
    icon: '🔭',
    color: 'from-rose-500 to-orange-500',
    slug: 'medical-imaging',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen relative py-20 px-6 lg:px-20">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-medical-indigo/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-medical-cyan/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <header className="mb-16 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 glass-card text-medical-cyan text-sm font-medium tracking-wider uppercase">
            🧬 YuSheng&apos;s Research Log
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
            Study AI with Med
            <br />
            <span className="text-gradient">底层原理与前沿成就</span>
          </h1>
          <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            从蛋白质折叠的生成式突破到多模态临床决策智能体，系统性记录和剖析人工智能如何重塑生命科学与临床医药的底层逻辑。
          </p>
        </header>

        {/* Direction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {directions.map((item) => (
            <Link
              key={item.slug}
              href={`/research/${item.slug}`}
              className="glass-card p-8 group hover:glow-indigo transition-all duration-500 no-underline"
            >
              <div
                className={`w-14 h-14 rounded-xl mb-6 bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg`}
              >
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--text-primary)] group-hover:text-medical-cyan transition-colors">
                {item.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
                {item.desc}
              </p>
              <div className="flex items-center text-sm font-medium text-medical-indigo group-hover:translate-x-2 transition-transform">
                深入分析核心技术 →
              </div>
            </Link>
          ))}
        </div>

        {/* About Section */}
        <section className="glass-card p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-medical-indigo/5 to-transparent" />
          <div className="relative z-10 w-full lg:w-2/3">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">
              关于这个项目
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
              这是羽升（YuSheng）在探索 AI 赋能医学方向过程中的学习研究日志。所有内容开源于 GitHub，旨在通过深度拆解每一项突破性技术背后的底层算法原理，构建可交互、可验证的知识体系。
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 rounded-full bg-white/5 dark:bg-white/5 bg-black/5 border border-[var(--card-border)] text-sm text-[var(--text-secondary)]">
                Next.js 16+ / MDX
              </div>
              <div className="px-6 py-3 rounded-full bg-white/5 dark:bg-white/5 bg-black/5 border border-[var(--card-border)] text-sm text-[var(--text-secondary)]">
                LaTeX / Mermaid / Pyodide
              </div>
              <div className="px-6 py-3 rounded-full bg-white/5 dark:bg-white/5 bg-black/5 border border-[var(--card-border)] text-sm text-[var(--text-secondary)]">
                开源 & AI-Readable
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
