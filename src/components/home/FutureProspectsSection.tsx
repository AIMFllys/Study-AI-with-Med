import { Reveal } from './HomeInteractions';

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

export function FutureProspectsSection() {
  return (
    <section
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
            <Reveal key={dir.num} delay={i * 0.1} duration={0.6} y={24} className="h-full">
              <div className="group relative overflow-hidden rounded-sm border border-[var(--card-border)] bg-[var(--card-bg)] p-8 transition-all duration-500 hover:border-[var(--accent)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] h-full">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
