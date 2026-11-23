import Link from 'next/link';
import type { HomeChapter } from '@/lib/home';
import { Reveal } from './HomeInteractions';

export function ChapterCard({ chapter, index }: { chapter: HomeChapter; index: number }) {
  return (
    <Reveal className="group relative" delay={index * 0.12} duration={0.7} y={32}>
      {chapter.hasContent ? (
        <Link href={chapter.href} className="block no-underline">
          <CardInner chapter={chapter} />
        </Link>
      ) : (
        <div className="cursor-default">
          <CardInner chapter={chapter} dimmed />
        </div>
      )}
    </Reveal>
  );
}

function CardInner({ chapter, dimmed }: { chapter: HomeChapter; dimmed?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border transition-all duration-500
        ${dimmed
          ? 'border-[var(--card-border)] opacity-55 bg-[var(--card-bg)]'
          : 'border-[var(--card-border)] hover:border-[var(--accent)] bg-[var(--card-bg)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15),0_0_0_1px_rgba(14,165,233,0.15)]'
        }
      `}
    >
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent
        transition-opacity duration-500 ${dimmed ? 'opacity-20' : 'opacity-0 group-hover:opacity-100'}`}
      />
      <div className={`absolute left-0 top-6 bottom-6 w-[2px]
        bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent
        transition-opacity duration-500 ${dimmed ? 'opacity-10' : 'opacity-0 group-hover:opacity-60'}`}
      />

      <div className="p-8">
        <div className="flex items-baseline justify-between mb-6">
          <span
            className="font-serif italic text-4xl font-bold leading-none"
            style={{ color: dimmed ? 'var(--text-tertiary)' : 'var(--accent)', opacity: 0.7 }}
          >
            {chapter.number}
          </span>
          {!chapter.hasContent && (
            <span className="text-[10px] font-sans tracking-[0.18em] uppercase px-2 py-1 rounded-sm border border-[var(--card-border)] text-[var(--text-tertiary)]">
              即将上线
            </span>
          )}
        </div>

        <h3 className={`font-serif font-bold text-xl leading-tight mb-1
          transition-colors duration-300
          ${dimmed ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'}`}
        >
          {chapter.title}
        </h3>
        <p className="font-sans text-xs tracking-widest uppercase text-[var(--text-tertiary)] mb-4">
          {chapter.subtitle}
        </p>

        <div className="h-px bg-gradient-to-r from-[var(--accent)] to-transparent opacity-20 mb-5" />

        <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)] mb-6">
          {chapter.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {chapter.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-sans tracking-wider px-2.5 py-1 rounded-sm"
              style={{
                background: dimmed ? 'transparent' : 'rgba(14,165,233,0.07)',
                border: `1px solid ${dimmed ? 'var(--card-border)' : 'rgba(14,165,233,0.2)'}`,
                color: dimmed ? 'var(--text-tertiary)' : 'var(--accent)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {!dimmed && (
          <div className="flex items-center gap-2 mt-6 text-xs font-sans text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <span>进入章节</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        )}
      </div>
    </div>
  );
}
