import { Reveal } from './HomeInteractions';

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

export function OpenSourceSection() {
  return (
    <section
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
            <Reveal key={proj.name} delay={i * 0.06} duration={0.5} easing="ease" y={16} className="h-full">
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline group block h-full"
              >
                <div
                  className="relative h-full overflow-hidden rounded-sm border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                  style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
