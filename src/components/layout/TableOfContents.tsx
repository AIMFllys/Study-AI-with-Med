'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import type { HeadingItem } from '@/types/mdx';

interface TableOfContentsProps {
  headings: HeadingItem[];
}

const CN_NUMBERS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [readProgress, setReadProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 });

  /* ── Scroll Spy ── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  /* ── Calculate indicator position based on actual DOM ── */
  useEffect(() => {
    if (!activeId || !navRef.current) return;

    const activeEl = itemRefs.current.get(activeId);
    if (!activeEl) return;

    const navRect = navRef.current.getBoundingClientRect();
    const navScrollTop = navRef.current.scrollTop;
    const itemRect = activeEl.getBoundingClientRect();

    const top = itemRect.top - navRect.top + navScrollTop;
    const height = itemRect.height;

    setIndicatorStyle({ top, height });

    // Auto-scroll the nav to keep active item visible
    const navVisibleTop = navScrollTop;
    const navVisibleBottom = navScrollTop + navRef.current.clientHeight;
    const itemTop = top;
    const itemBottom = top + height;

    if (itemTop < navVisibleTop + 20) {
      navRef.current.scrollTo({ top: itemTop - 40, behavior: 'smooth' });
    } else if (itemBottom > navVisibleBottom - 20) {
      navRef.current.scrollTo({ top: itemBottom - navRef.current.clientHeight + 40, behavior: 'smooth' });
    }
  }, [activeId]);

  /* ── Smooth scroll to heading ── */
  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  }, []);

  /* ── Ref callback for list items ── */
  const setItemRef = useCallback((id: string, el: HTMLLIElement | null) => {
    if (el) {
      itemRefs.current.set(id, el);
    } else {
      itemRefs.current.delete(id);
    }
  }, []);

  if (headings.length === 0) return null;

  // Build h2 index for numbering (一, 二, 三...)
  let h2Counter = 0;
  const h2IndexMap = new Map<string, number>();
  // And build sub-numbering for h3 under each h2
  let currentH2Id = '';
  let h3Counter = 0;
  const h3IndexMap = new Map<string, number>();

  headings.forEach((h) => {
    if (h.level === 2) {
      h2IndexMap.set(h.id, h2Counter);
      h2Counter++;
      currentH2Id = h.id;
      h3Counter = 0;
    } else if (h.level === 3) {
      h3Counter++;
      h3IndexMap.set(h.id, h3Counter);
    }
  });

  return (
    <aside
      className="hidden xl:flex flex-col w-64 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] py-5 overflow-hidden"
      style={{
        borderLeft: '1px solid var(--rule-color)',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* ── Header ── */}
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-xs" style={{ color: 'var(--accent)', opacity: 0.5 }}>§</span>
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-tertiary)' }}>
              On This Page
            </span>
          </div>
          <span
            className="font-mono text-[10px] tabular-nums transition-colors duration-300"
            style={{ color: readProgress > 0.95 ? 'var(--accent)' : 'var(--text-tertiary)' }}
          >
            {Math.round(readProgress * 100)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--rule-color)' }}>
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
            style={{
              width: `${readProgress * 100}%`,
              background: `linear-gradient(90deg, var(--accent), var(--accent-light))`,
              boxShadow: readProgress > 0 ? '0 0 8px var(--accent)' : 'none',
            }}
          />
        </div>
      </div>

      {/* ── Navigation List ── */}
      <nav ref={navRef} className="relative flex-1 overflow-y-auto custom-scrollbar pl-4 pr-2">

        {/* Active indicator bar */}
        <div
          className="absolute left-4 w-[2px] rounded-full transition-all duration-400 ease-out z-10"
          style={{
            top: indicatorStyle.top,
            height: indicatorStyle.height,
            background: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent), 0 0 3px rgba(14,165,233,0.6)',
            opacity: activeId ? 1 : 0,
          }}
        />

        {/* Static track line */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] rounded-full" style={{ background: 'var(--rule-color)', opacity: 0.5 }} />

        <ul className="space-y-0 relative">
          {headings.map((heading, i) => {
            const isActive = activeId === heading.id;
            const isH2 = heading.level === 2;
            const isH3 = heading.level === 3;

            const h2Idx = h2IndexMap.get(heading.id);
            const h3Idx = h3IndexMap.get(heading.id);

            // Determine if this h2 owns the currently active h3
            const isParentOfActive = isH2 && headings.some((h, j) => {
              if (h.id !== activeId || h.level <= 2) return false;
              for (let k = j - 1; k >= 0; k--) {
                if (headings[k].level === 2) return headings[k].id === heading.id;
              }
              return false;
            });

            return (
              <li
                key={heading.id}
                ref={(el) => setItemRef(heading.id, el)}
                className="relative"
              >
                {/* H2 top separator */}
                {isH2 && i > 0 && (
                  <div
                    className="mx-3 h-px mb-1"
                    style={{ background: 'var(--rule-color)', opacity: 0.4 }}
                  />
                )}

                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className="no-underline w-full text-left flex items-start gap-1.5 transition-all duration-300 rounded-sm relative group"
                  style={{
                    paddingLeft: isH2 ? 12 : 16,
                    paddingRight: 4,
                    paddingTop: isH2 ? 7 : 4,
                    paddingBottom: isH2 ? 7 : 4,
                    marginTop: isH2 && i > 0 ? 4 : 0,
                    background: isActive ? 'rgba(14,165,233,0.06)' : 'transparent',
                  }}
                >
                  {/* Level indicator prefix */}
                  {isH2 && h2Idx !== undefined && (
                    <span
                      className="flex-shrink-0 font-serif text-[11px] leading-[1.45] mt-px"
                      style={{
                        color: isActive ? 'var(--accent)' : isParentOfActive ? 'var(--accent)' : 'var(--text-tertiary)',
                        opacity: isActive || isParentOfActive ? 0.9 : 0.5,
                        minWidth: '2em',
                        transition: 'color 0.3s, opacity 0.3s',
                      }}
                    >
                      {CN_NUMBERS[h2Idx]}、
                    </span>
                  )}
                  {isH3 && h3Idx !== undefined && (
                    <span
                      className="flex-shrink-0 font-mono text-[10px] leading-[1.5] mt-px"
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                        opacity: isActive ? 0.9 : 0.35,
                        minWidth: '1.8em',
                        transition: 'color 0.3s, opacity 0.3s',
                      }}
                    >
                      {h3Idx}.
                    </span>
                  )}

                  {/* Heading text */}
                  <span
                    className="relative"
                    style={{
                      fontSize: isH2 ? 12.5 : 11.5,
                      fontWeight: isH2 ? (isActive || isParentOfActive ? 600 : 500) : 400,
                      letterSpacing: isH2 ? '0.02em' : '0',
                      lineHeight: 1.45,
                      color: isActive
                        ? 'var(--accent)'
                        : isParentOfActive
                        ? 'var(--text-primary)'
                        : isH2
                        ? 'var(--text-secondary)'
                        : 'var(--text-tertiary)',
                      transition: 'color 0.3s',
                    }}
                  >
                    {heading.text}
                  </span>

                  {/* Hover effect */}
                  <span
                    className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: 'rgba(14,165,233,0.04)' }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Footer ── */}
      <div className="px-4 mt-2 pt-2" style={{ borderTop: '1px solid var(--rule-color)' }}>
        <div className="flex items-center justify-between">
          <p className="font-serif italic text-[10px] text-[var(--text-tertiary)] opacity-30">
            {headings.length} sections
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[9px] font-sans tracking-wider uppercase px-2 py-1 rounded-sm transition-all duration-200"
            style={{
              color: 'var(--text-tertiary)',
              border: '1px solid var(--rule-color)',
              opacity: readProgress > 0.1 ? 1 : 0,
              transform: readProgress > 0.1 ? 'none' : 'translateY(4px)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--rule-color)';
            }}
          >
            ↑ Top
          </button>
        </div>
      </div>
    </aside>
  );
}
