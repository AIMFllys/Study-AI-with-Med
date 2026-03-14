'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, X, BookOpen } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import type { NavItem } from '@/types/mdx';

interface SidebarProps {
  items: NavItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Mobile Trigger Button (floating) ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 bottom-20 z-40 lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300"
        style={{
          background: 'color-mix(in srgb, var(--bg-primary) 90%, transparent)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--card-border)',
          color: 'var(--text-secondary)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
        aria-label="打开目录"
      >
        <BookOpen className="w-4 h-4" style={{ color: 'var(--accent)' }} />
        <span className="text-[10px] font-sans tracking-wider uppercase">目录</span>
      </button>

      {/* ── Mobile Drawer Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 flex flex-col lg:hidden transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--rule-color)',
          boxShadow: mobileOpen ? '8px 0 40px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--rule-color)' }}>
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-xs" style={{ color: 'var(--accent)', opacity: 0.5 }}>§</span>
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-tertiary)' }}>
              Contents
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-sm transition-colors"
            style={{ color: 'var(--text-tertiary)', border: '1px solid var(--rule-color)' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Drawer Content */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">
          <OverviewLink pathname={pathname} />
          <div className="h-px my-3 mx-1" style={{ background: 'var(--rule-color)' }} />
          <div className="space-y-0.5">
            {items.map((item) => (
              <SidebarItem key={item.slug} item={item} pathname={pathname} />
            ))}
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="px-5 py-3" style={{ borderTop: '1px solid var(--rule-color)' }}>
          <p className="font-serif italic text-[10px] text-[var(--text-tertiary)] opacity-40 leading-relaxed">
            Study AI with Medicine
          </p>
        </div>
      </aside>

      {/* ── Desktop Sidebar (unchanged structure) ── */}
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
    </>
  );
}

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
