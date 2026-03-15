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
      className="hidden lg:flex flex-col w-[280px] flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]
        overflow-y-auto custom-scrollbar py-8 pr-2"
      style={{
        borderRight: '1px solid var(--rule-color)',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* 章节标注 */}
      <div className="px-5 mb-6">
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase mb-1"
          style={{ color: 'var(--accent)', opacity: 0.6 }}
        >
          Contents
        </p>
        <div className="h-px" style={{ background: 'var(--rule-color)' }} />
      </div>

      <nav className="px-3 flex-1">
        <OverviewLink pathname={pathname} />
        <div className="h-px my-4 mx-2" style={{ background: 'var(--rule-color)' }} />
        <div className="space-y-0.5">
          {items.map((item) => (
            <SidebarItem key={item.slug} item={item} pathname={pathname} depth={0} />
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

  /* Flatten tree to get top-level chips for mobile */
  const getChipItems = (navItems: NavItem[]): NavItem[] => {
    const chips: NavItem[] = [];
    for (const item of navItems) {
      chips.push(item);
    }
    return chips;
  };

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
        {getChipItems(items).map((item) => (
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

  /* Find first leaf child as default href */
  const getFirstLeafHref = (node: NavItem): string => {
    if (!node.children || node.children.length === 0) return `/research/${node.slug}`;
    return getFirstLeafHref(node.children[0]);
  };

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

  const href = getFirstLeafHref(item);
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


/* ── Desktop components ── */
function OverviewLink({ pathname }: { pathname: string }) {
  const isActive = pathname === '/research';
  return (
    <Link
      href="/research"
      className="no-underline flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[13px] font-sans transition-all duration-200 mb-1"
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

/* ── 递归渲染的核心组件 ── */
function SidebarItem({ item, pathname, depth }: { item: NavItem; pathname: string; depth: number }) {
  /* 检查任意后代是否激活 */
  const isDescendantActive = (navItem: NavItem): boolean => {
    if (pathname === `/research/${navItem.slug}`) return true;
    if (navItem.children) {
      return navItem.children.some(isDescendantActive);
    }
    return false;
  };

  const isActive = pathname === `/research/${item.slug}`;
  const groupActive = isDescendantActive(item);

  /* 默认展开最外层（depth=0），或者当子项被激活时 */
  const [isOpen, setIsOpen] = useState(groupActive || depth === 0);

  useEffect(() => {
    if (groupActive) setIsOpen(true);
  }, [groupActive]);

  /* 深度自适应样式配置 */
  const fontSize = depth === 0 ? 'text-[13px]' : depth === 1 ? 'text-[12.5px]' : 'text-[12px]';

  /* ── 禁用项 ── */
  if (item.disabled) {
    return (
      <div
        className={`flex items-center justify-between px-2 py-2 rounded-md font-sans select-none ${fontSize}`}
        style={{ color: 'var(--text-tertiary)', opacity: 0.45, cursor: 'not-allowed' }}
      >
        <div className="flex items-center gap-2">
          <DepthIcon depth={depth} active={false} />
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

  /* ── 有子项：可折叠分组 ── */
  if (item.children && item.children.length > 0) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-2 py-2 rounded-md font-sans transition-all duration-200 group ${fontSize}`}
          style={{
            color: groupActive ? 'var(--text-primary)' : 'var(--text-secondary)',
            background: depth === 0 && groupActive ? 'rgba(14,165,233,0.04)' : 'transparent',
            fontWeight: depth === 0 ? 600 : groupActive ? 500 : 400,
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <DepthIcon depth={depth} active={groupActive} open={isOpen} isGroup />
            <span className="truncate">{item.title}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: 'var(--text-tertiary)', opacity: groupActive ? 0.7 : 0.3 }}
          />
        </button>

        {/* 子节点递归渲染，带左侧连接线动画 */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div
              className="flex flex-col space-y-0.5 relative ml-[14px] pl-3 pt-0.5 pb-0.5"
              style={{ borderLeft: `1.5px solid ${groupActive ? 'rgba(14,165,233,0.35)' : 'var(--rule-color)'}` }}
            >
              {item.children.map((child, i) => (
                <SidebarItem key={child.slug} item={child} pathname={pathname} depth={depth + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── 叶子节点（具体内容文章） ── */
  return (
    <Link
      href={`/research/${item.slug}`}
      className={`no-underline flex items-center gap-2 px-2 py-1.5 rounded-md font-sans transition-all duration-200 relative group ${fontSize}`}
      style={{
        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
        background: isActive ? 'rgba(14,165,233,0.08)' : 'transparent',
        fontWeight: isActive ? 500 : 400,
      }}
    >
      {/* Active indicator dot on the tree line */}
      {isActive && (
        <div
          className="absolute -left-[14.5px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full"
          style={{ background: 'var(--accent)', boxShadow: '0 0 6px rgba(14,165,233,0.4)' }}
        />
      )}
      <DepthIcon depth={depth} active={isActive} />
      <span className="truncate leading-snug">{item.title}</span>
    </Link>
  );
}

/* ── 深度自适应图标 ── */
function DepthIcon({ depth, active, open, isGroup }: { depth: number; active: boolean; open?: boolean; isGroup?: boolean }) {
  const accentOpacity = active ? 0.8 : 0.3;
  const accentColor = 'var(--accent)';

  if (depth === 0) {
    if (isGroup) {
      return (
        <span
          className="shrink-0 text-[10px] transition-transform duration-200"
          style={{ color: accentColor, opacity: accentOpacity }}
        >
          {open ? '▾' : '▸'}
        </span>
      );
    }
    return (
      <span
        className="shrink-0 font-serif italic text-[11px]"
        style={{ color: accentColor, opacity: accentOpacity }}
      >
        §
      </span>
    );
  }

  if (isGroup) {
    return (
      <span
        className="shrink-0 text-[9px] transition-transform duration-200"
        style={{ color: accentColor, opacity: accentOpacity }}
      >
        {open ? '▿' : '▹'}
      </span>
    );
  }

  return (
    <span
      className="shrink-0 text-[8px]"
      style={{ color: accentColor, opacity: active ? 1 : 0.25 }}
    >
      {active ? '●' : '○'}
    </span>
  );
}
