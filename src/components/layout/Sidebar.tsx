'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { NavItem } from '@/types/mdx';

interface SidebarProps {
  items: NavItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    /* Desktop Sidebar only — mobile navigation is handled by MobileSidebarChips */
    <aside
      className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]
        overflow-y-auto custom-scrollbar py-8 pr-1"
      style={{
        borderRight: '1px solid var(--rule-color)',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* 章节标注 */}
      <div className="px-5 mb-6">
        <p
          className="font-sans text-[9px] tracking-[0.3em] uppercase mb-1"
          style={{ color: 'var(--accent)', opacity: 0.6 }}
        >
          Contents
        </p>
        <div className="h-px" style={{ background: 'var(--rule-color)' }} />
      </div>

      <nav className="px-4 flex-1">
        <OverviewLink pathname={pathname} />
        <div className="h-px my-4 mx-1" style={{ background: 'var(--rule-color)' }} />
        <div className="space-y-0.5">
          {items.map((item) => (
            <SidebarItem key={item.slug} item={item} pathname={pathname} />
          ))}
        </div>
      </nav>

      {/* 底部装饰 */}
      <div className="px-5 mt-6 pt-4" style={{ borderTop: '1px solid var(--rule-color)' }}>
        <p className="font-serif italic text-[10px] text-[var(--text-tertiary)] opacity-40 leading-relaxed">
          Study AI with Medicine
        </p>
      </div>
    </aside>
  );
}

/* ── Mobile Sidebar Chips (separate export for use outside flex) ── */
export function MobileSidebarChips({ items }: SidebarProps) {
  const pathname = usePathname();
  const [readProgress, setReadProgress] = useState(0);

  /* Sync reading progress */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="lg:hidden sticky overflow-x-auto custom-scrollbar no-scrollbar"
      style={{
        top: '3.5rem',
        zIndex: 30,
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--rule-color)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center gap-1 px-3 py-2 whitespace-nowrap">
        <MobileOverviewChip pathname={pathname} />
        {items.map((item) => (
          <MobileChip key={item.slug} item={item} pathname={pathname} />
        ))}
      </div>
      {/* Progress Bar */}
      <div className="h-[2px] w-full bg-transparent overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] transition-all duration-200 ease-out"
          style={{ width: `${readProgress * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ── Mobile chip components ── */
function MobileOverviewChip({ pathname }: { pathname: string }) {
  const isActive = pathname === '/research';
  return (
    <Link
      href="/research"
      className="no-underline flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-sans transition-all duration-200 shrink-0"
      style={{
        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
        background: isActive ? 'rgba(14,165,233,0.1)' : 'rgba(128,128,128,0.06)',
        border: `1px solid ${isActive ? 'rgba(14,165,233,0.3)' : 'var(--card-border)'}`,
        fontWeight: isActive ? 500 : 400,
      }}
    >
      总览
    </Link>
  );
}

function MobileChip({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname.startsWith(`/research/${item.slug}`);

  if (item.disabled) {
    return (
      <span
        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-sans shrink-0 cursor-not-allowed"
        style={{
          color: 'var(--text-tertiary)',
          opacity: 0.35,
          background: 'rgba(128,128,128,0.04)',
          border: '1px solid var(--card-border)',
        }}
      >
        {item.title}
      </span>
    );
  }

  if (item.children) {
    const firstChild = item.children[0];
    const href = firstChild ? `/research/${firstChild.slug}` : `/research/${item.slug}`;
    return (
      <Link
        href={href}
        className="no-underline flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-sans transition-all duration-200 shrink-0"
        style={{
          color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
          background: isActive ? 'rgba(14,165,233,0.1)' : 'rgba(128,128,128,0.06)',
          border: `1px solid ${isActive ? 'rgba(14,165,233,0.3)' : 'var(--card-border)'}`,
          fontWeight: isActive ? 500 : 400,
        }}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <Link
      href={`/research/${item.slug}`}
      className="no-underline flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-sans transition-all duration-200 shrink-0"
      style={{
        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
        background: isActive ? 'rgba(14,165,233,0.1)' : 'rgba(128,128,128,0.06)',
        border: `1px solid ${isActive ? 'rgba(14,165,233,0.3)' : 'var(--card-border)'}`,
        fontWeight: isActive ? 500 : 400,
      }}
    >
      {item.title}
    </Link>
  );
}


/* ── Desktop components ── */
function OverviewLink({ pathname }: { pathname: string }) {
  const isActive = pathname === '/research';
  return (
    <Link
      href="/research"
      className="no-underline flex items-center gap-2.5 px-3 py-2 rounded-sm text-[13px] font-sans transition-all duration-200 mb-1"
      style={{
        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
        background: isActive ? 'rgba(14,165,233,0.08)' : 'transparent',
        borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
        fontWeight: isActive ? 500 : 400,
      }}
    >
      <span style={{ color: 'var(--accent)', opacity: isActive ? 0.8 : 0.3, fontSize: 11, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>§</span>
      总览
    </Link>
  );
}

function SidebarItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(
    item.children ? pathname.startsWith(`/research/${item.slug}`) : false
  );
  const isActive = pathname === `/research/${item.slug}`;

  /* 禁用占位项 */
  if (item.disabled) {
    return (
      <div
        className="flex items-center justify-between px-3 py-2 rounded-sm text-[13px] font-sans select-none"
        style={{
          color: 'var(--text-tertiary)',
          opacity: 0.45,
          cursor: 'not-allowed',
          borderLeft: '2px solid transparent',
        }}
      >
        <div className="flex items-center gap-2.5">
          <span style={{ color: 'var(--accent)', opacity: 0.3, fontSize: 11, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>§</span>
          <span>{item.title}</span>
        </div>
        <span
          className="font-sans text-[9px] tracking-wider px-1.5 py-0.5 rounded-sm"
          style={{ border: '1px solid var(--card-border)', color: 'var(--text-tertiary)' }}
        >
          WIP
        </span>
      </div>
    );
  }

  /* 有子项：折叠分组 */
  if (item.children) {
    const groupActive = pathname.startsWith(`/research/${item.slug}`);
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-[13px] font-sans transition-all duration-200 group"
          style={{
            color: groupActive ? 'var(--text-primary)' : 'var(--text-secondary)',
            background: groupActive ? 'rgba(14,165,233,0.05)' : 'transparent',
            borderLeft: groupActive ? '2px solid rgba(14,165,233,0.4)' : '2px solid transparent',
            fontWeight: groupActive ? 500 : 400,
          }}
        >
          <div className="flex items-center gap-2.5">
            <span
              style={{
                color: 'var(--accent)',
                opacity: groupActive ? 0.7 : 0.3,
                fontSize: 11,
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
              }}
            >§</span>
            <span>{item.title}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: 'var(--text-tertiary)', opacity: 0.6 }}
          />
        </button>

        {isOpen && (
          <div
            className="ml-[1.85rem] mt-0.5 mb-1 space-y-0.5 pl-3 py-1 relative"
            style={{ borderLeft: '1px solid var(--rule-color)' }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-px transition-opacity duration-300"
              style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)', opacity: 0.4 }}
            />
            {item.children.map((child, i) => {
              const childActive = pathname === `/research/${child.slug}`;
              return (
                <Link
                  key={child.slug}
                  href={`/research/${child.slug}`}
                  className="no-underline flex items-start gap-2 px-2 py-1.5 rounded-sm text-[12px] font-sans transition-all duration-200"
                  style={{
                    color: childActive ? 'var(--accent)' : 'var(--text-secondary)',
                    background: childActive ? 'rgba(14,165,233,0.08)' : 'transparent',
                    animationDelay: `${i * 0.05}s`,
                    animation: 'chapter-reveal 0.25s ease both',
                  }}
                >
                  <span
                    className="font-serif italic mt-0.5 shrink-0 text-[10px]"
                    style={{
                      color: 'var(--accent)',
                      opacity: childActive ? 0.8 : 0.3,
                    }}
                  >
                    {i + 1}.
                  </span>
                  <span className="leading-snug">{child.title}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* 普通叶子节点 */
  return (
    <Link
      href={`/research/${item.slug}`}
      className="no-underline flex items-center gap-2.5 px-3 py-2 rounded-sm text-[13px] font-sans transition-all duration-200"
      style={{
        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
        background: isActive ? 'rgba(14,165,233,0.08)' : 'transparent',
        borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
        fontWeight: isActive ? 500 : 400,
      }}
    >
      <span style={{ color: 'var(--accent)', opacity: isActive ? 0.8 : 0.3, fontSize: 11, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>§</span>
      {item.title}
    </Link>
  );
}
