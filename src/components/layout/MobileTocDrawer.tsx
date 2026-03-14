'use client';

import { useState, useEffect, useCallback } from 'react';
import { List, X } from 'lucide-react';
import type { HeadingItem } from '@/types/mdx';

interface MobileTocDrawerProps {
  headings: HeadingItem[];
}

export default function MobileTocDrawer({ headings }: MobileTocDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [readProgress, setReadProgress] = useState(0);

  /* Scroll spy */
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollToHeading = useCallback((id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${id}`);
      }
    }, 300);
  }, []);

  if (headings.length === 0) return null;

  return (
    <>
      {/* ── Floating trigger button (right side) ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-3 bottom-20 z-40 xl:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300"
        style={{
          background: 'color-mix(in srgb, var(--bg-primary) 90%, transparent)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--card-border)',
          color: 'var(--text-secondary)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
        aria-label="页面目录"
      >
        {/* 小型进度环 */}
        <svg width="16" height="16" viewBox="0 0 20 20" className="-rotate-90">
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
        <span className="text-[10px] font-sans tracking-wider uppercase">导读</span>
      </button>

      {/* ── Backdrop ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 xl:hidden"
          onClick={() => setIsOpen(false)}
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* ── Drawer (slides from right) ── */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 flex flex-col xl:hidden transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--rule-color)',
          boxShadow: isOpen ? '-8px 0 40px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--rule-color)' }}>
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-xs" style={{ color: 'var(--accent)', opacity: 0.5 }}>§</span>
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-tertiary)' }}>
              On This Page
            </span>
            <span className="font-mono text-[10px] tabular-nums" style={{ color: 'var(--text-tertiary)' }}>
              {Math.round(readProgress * 100)}%
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-sm transition-colors"
            style={{ color: 'var(--text-tertiary)', border: '1px solid var(--rule-color)' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mx-5 mt-2 mb-3 relative h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--rule-color)' }}>
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
            style={{
              width: `${readProgress * 100}%`,
              background: `linear-gradient(90deg, var(--accent), var(--accent-light))`,
            }}
          />
        </div>

        {/* Heading list */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar px-4">
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
        <div className="px-5 py-3" style={{ borderTop: '1px solid var(--rule-color)' }}>
          <button
            onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-full text-center text-[10px] font-sans tracking-wider uppercase py-2 rounded-sm transition-colors"
            style={{ color: 'var(--text-tertiary)', border: '1px solid var(--rule-color)' }}
          >
            ↑ 返回顶部
          </button>
        </div>
      </aside>
    </>
  );
}
