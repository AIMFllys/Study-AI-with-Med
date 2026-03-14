'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, List, X, ChevronUp } from 'lucide-react';
import type { HeadingItem } from '@/types/mdx';

interface MobileSubNavProps {
  headings: HeadingItem[];
}

/**
 * Mobile sub-navigation bar that sits below the main navbar.
 * Shows Sidebar (导读) and TOC (目录) buttons with slide-down drawers.
 * Only visible on mobile (md:hidden) and on research article pages.
 */
export default function MobileSubNav({ headings }: MobileSubNavProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [readProgress, setReadProgress] = useState(0);

  /* ── Scroll spy for TOC ── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
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

  /* Lock body scroll when drawer open */
  useEffect(() => {
    if (tocOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [tocOpen]);

  const scrollToHeading = useCallback((id: string) => {
    setTocOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${id}`);
      }
    }, 300);
  }, []);

  return (
    <>
      {/* ── Sub-navigation bar ── */}
      <div
        className="sticky z-40 md:hidden"
        style={{
          top: '3.5rem', /* height of main navbar */
          background: 'color-mix(in srgb, var(--bg-primary) 92%, transparent)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--rule-color)',
        }}
      >
        <div className="flex items-center justify-between px-4 h-10">
          {/* Left: Reading progress */}
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 20 20" className="-rotate-90">
              <circle cx="10" cy="10" r="8" fill="none" stroke="var(--rule-color)" strokeWidth="2" />
              <circle
                cx="10" cy="10" r="8" fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeDasharray={`${readProgress * 50.26} 50.26`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.2s ease' }}
              />
            </svg>
            <span className="font-mono text-[10px] tabular-nums" style={{ color: 'var(--text-tertiary)' }}>
              {Math.round(readProgress * 100)}%
            </span>
          </div>

          {/* Right: TOC toggle + Back to top */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200"
              style={{
                background: tocOpen ? 'rgba(14,165,233,0.1)' : 'transparent',
                border: `1px solid ${tocOpen ? 'var(--accent)' : 'var(--card-border)'}`,
                color: tocOpen ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              <List className="w-3.5 h-3.5" />
              <span className="text-[11px] font-sans">本页目录</span>
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-7 h-7 flex items-center justify-center rounded-md transition-colors"
              style={{ border: '1px solid var(--card-border)', color: 'var(--text-tertiary)' }}
              aria-label="返回顶部"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── TOC Drawer (slides down from sub-bar) ── */}
      {tocOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 md:hidden"
            style={{ top: 'calc(3.5rem + 2.5rem)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            onClick={() => setTocOpen(false)}
          />

          {/* Panel */}
          <div
            className="fixed left-0 right-0 z-35 md:hidden overflow-y-auto"
            style={{
              top: 'calc(3.5rem + 2.5rem)',
              maxHeight: 'calc(100vh - 6rem)',
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--rule-color)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
              animation: 'tocSlideDown 0.25s ease-out',
              zIndex: 35,
            }}
          >
            {/* Progress bar */}
            <div className="mx-4 mt-3 mb-2 relative h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--rule-color)' }}>
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
                style={{
                  width: `${readProgress * 100}%`,
                  background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
                }}
              />
            </div>

            {/* Heading list */}
            <nav className="px-4 py-2 pb-4">
              <ul className="space-y-0.5">
                {headings.map((heading) => {
                  const isActive = activeId === heading.id;
                  return (
                    <li key={heading.id} className={heading.level === 3 ? 'ml-3' : ''}>
                      <button
                        onClick={() => scrollToHeading(heading.id)}
                        className="w-full text-left block py-2 pl-3 pr-1 text-[13px] font-sans leading-snug transition-all duration-300 rounded-sm"
                        style={{
                          color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                          fontWeight: isActive ? 500 : 400,
                          background: isActive ? 'rgba(14,165,233,0.08)' : 'transparent',
                          borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                        }}
                      >
                        {heading.text}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="px-4 py-2 flex items-center justify-between" style={{ borderTop: '1px solid var(--rule-color)' }}>
              <button
                onClick={() => { setTocOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-[10px] font-sans tracking-wider uppercase py-1.5 transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
              >
                ↑ 返回顶部
              </button>
              <button
                onClick={() => setTocOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-sm transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes tocSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
