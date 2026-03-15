'use client';

import { useState } from 'react';
import { List, X, ChevronUp } from 'lucide-react';
import { useScrollSpy, useScrollToHeading, useBodyScrollLock } from '@/hooks/useScrollSpy';
import type { HeadingItem } from '@/types/mdx';

interface MobileTocFloatProps {
  headings: HeadingItem[];
}

/**
 * Floating TOC button + drawer for mobile.
 * Shows above the bottom tab bar, opens a side panel with headings.
 * Hidden on desktop (xl:hidden as desktop uses the sidebar TOC).
 */
export default function MobileTocFloat({ headings }: MobileTocFloatProps) {
  const [open, setOpen] = useState(false);
  const { activeId, readProgress } = useScrollSpy(headings);
  const scrollToHeading = useScrollToHeading();
  useBodyScrollLock(open);

  const handleHeadingClick = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToHeading(id), 300);
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* ── Floating TOC Button ── */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed z-40 xl:hidden flex items-center justify-center rounded-full shadow-lg transition-all duration-300"
        style={{
          bottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))',
          right: '1rem',
          width: 48,
          height: 48,
          background: open ? 'var(--accent)' : 'var(--bg-secondary)',
          color: open ? '#fff' : 'var(--accent)',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--card-border)'}`,
          boxShadow: open
            ? '0 4px 20px rgba(14,165,233,0.4)'
            : '0 4px 16px rgba(0,0,0,0.12)',
        }}
        aria-label="本页目录"
      >
        {open ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
        {/* Progress ring */}
        {!open && (
          <svg
            className="absolute inset-0 -rotate-90"
            width="48" height="48" viewBox="0 0 48 48"
          >
            <circle cx="24" cy="24" r="22" fill="none" stroke="var(--card-border)" strokeWidth="2" opacity="0.3" />
            <circle
              cx="24" cy="24" r="22" fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray={`${readProgress * 138.23} 138.23`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.2s ease' }}
            />
          </svg>
        )}
      </button>

      {/* ── TOC Drawer Overlay ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 xl:hidden"
            style={{
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 35,
            }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            className="fixed right-0 top-14 bottom-14 w-[min(80vw,320px)] z-40 xl:hidden overflow-y-auto custom-scrollbar"
            style={{
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--rule-color)',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
              animation: 'tocSlideIn 0.25s ease-out',
            }}
          >
            {/* Header */}
            <div className="sticky top-0 px-4 py-3 flex items-center justify-between"
              style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--rule-color)' }}
            >
              <div className="flex items-center gap-2">
                <span className="font-serif italic text-xs" style={{ color: 'var(--accent)', opacity: 0.5 }}>§</span>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-tertiary)' }}>
                  本页目录
                </span>
              </div>
              <span
                className="font-mono text-[10px] tabular-nums"
                style={{ color: readProgress > 0.5 ? 'var(--accent)' : 'var(--text-tertiary)' }}
              >
                {Math.round(readProgress * 100)}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="mx-4 mt-2 mb-1 relative h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--rule-color)' }}>
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
                style={{
                  width: `${readProgress * 100}%`,
                  background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
                }}
              />
            </div>

            {/* Heading list */}
            <nav className="px-3 py-2 pb-4">
              <ul className="space-y-0.5">
                {headings.map((heading) => {
                  const isActive = activeId === heading.id;
                  return (
                    <li key={heading.id} className={heading.level === 3 ? 'ml-3' : ''}>
                      <button
                        onClick={() => handleHeadingClick(heading.id)}
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
            <div className="sticky bottom-0 px-4 py-2 flex items-center justify-between"
              style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--rule-color)' }}
            >
              <button
                onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-[10px] font-sans tracking-wider uppercase py-1.5 transition-colors flex items-center gap-1"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <ChevronUp className="w-3 h-3" /> 返回顶部
              </button>
              <button
                onClick={() => setOpen(false)}
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
        @keyframes tocSlideIn {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
