import Link from 'next/link';
import type { HomeOverviewItem } from '@/lib/home';
import { Reveal } from './HomeInteractions';

export function OverviewSection({ items }: { items: HomeOverviewItem[] }) {
  return (
    <section
      className="border-t border-[var(--rule-color)] py-16 sm:py-24"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-4 opacity-70">
            Research Landscape
          </p>
          <h2 className="font-serif text-4xl font-bold text-[var(--text-primary)] mb-4">
            五大方向深度概览
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[var(--accent)] opacity-40" />
            <span className="font-serif italic text-[var(--text-tertiary)] text-sm">
              Core Achievements & Breakthroughs
            </span>
            <div className="h-px w-12 bg-[var(--accent)] opacity-40" />
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-5">
          {items.map((item, i) => {
            const cardContent = (
              <div
                className={`relative overflow-hidden rounded-sm border bg-[var(--card-bg)] transition-all duration-500 ${
                  item.disabled
                    ? 'border-[var(--card-border)] opacity-65'
                    : 'border-[var(--card-border)] hover:border-[var(--accent)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1),0_0_0_1px_rgba(14,165,233,0.1)]'
                }`}
                style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
              >
                {!item.disabled && (
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">
                  {/* Icon & stat */}
                  <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:min-w-[100px] sm:text-center shrink-0">
                    <span className="text-3xl">{item.icon}</span>
                    <span
                      className="font-sans text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm border border-[var(--accent)]/20 text-[var(--accent)] whitespace-nowrap"
                      style={{ background: 'rgba(14,165,233,0.06)' }}
                    >
                      {item.stat}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`font-serif font-bold text-lg transition-colors duration-300 ${
                        item.disabled ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'
                      }`}>
                        {item.title}
                      </h3>
                      {item.disabled && (
                        <span className="text-[9px] font-sans tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm border border-[var(--card-border)] text-[var(--text-tertiary)]">
                          即将上线
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs tracking-wider text-[var(--accent)] opacity-70 mb-3">
                      {item.highlight}
                    </p>
                    <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.detail}
                    </p>
                  </div>
                  {/* Arrow */}
                  {!item.disabled && (
                    <div className="hidden sm:flex items-center self-center text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                      <span className="text-lg">→</span>
                    </div>
                  )}
                </div>
              </div>
            );

            return (
              <Reveal key={item.slug} delay={i * 0.1} duration={0.6} y={24} className={item.disabled ? 'cursor-default' : ''}>
                {item.disabled ? (
                  cardContent
                ) : (
                  <Link href={`/research/${item.slug}`} className="no-underline block group">
                    {cardContent}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
