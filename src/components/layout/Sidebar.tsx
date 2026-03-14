'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { NavItem } from '@/types/mdx';

interface SidebarProps {
  items: NavItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r border-white/5 bg-black/10 backdrop-blur-3xl py-6 px-4">
      <div className="flex items-center gap-2 text-[10px] font-bold text-medical-slate/60 uppercase tracking-[0.2em] mb-6 px-3">
        <span className="w-1.5 h-1.5 rounded-full bg-medical-indigo/50 animate-pulse"></span>
        DIRECTORY
      </div>
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
        <Link
          href="/research"
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 no-underline ${
            pathname === '/research'
              ? 'bg-gradient-to-r from-medical-indigo/20 to-transparent text-medical-cyan font-medium border-l-2 border-medical-cyan shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
              : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)] border-l-2 border-transparent'
          }`}
        >
          <span className="opacity-70 group-hover:opacity-100 transition-opacity">📋</span> 总览
        </Link>
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />
        {items.map((item) => (
          <SidebarItem key={item.slug} item={item} pathname={pathname} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(
    item.children ? pathname.startsWith(`/research/${item.slug}`) : false
  );
  const isActive = pathname === `/research/${item.slug}`;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border-l-2 border-transparent text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]`}
        >
          <span className="tracking-wide">{item.title}</span>
          <ChevronDown
            className={`w-4 h-4 text-medical-slate/50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-medical-indigo' : 'group-hover:text-[var(--text-primary)]'}`}
          />
        </button>
        {isOpen && (
          <div className="ml-4 pl-3 py-1 space-y-1 mt-1 border-l border-white/10 relative before:absolute before:inset-0 before:-left-[1px] before:w-[2px] before:bg-gradient-to-b before:from-medical-indigo/50 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity">
            {item.children.map((child) => {
              const childActive = pathname === `/research/${child.slug}`;
              return (
                <Link
                  key={child.slug}
                  href={`/research/${child.slug}`}
                  className={`block px-3 py-2 rounded-lg text-[13px] transition-all duration-300 no-underline ${
                    childActive
                      ? 'bg-medical-indigo/10 text-medical-cyan font-medium translate-x-1'
                      : 'text-medical-slate hover:text-white hover:bg-white/5 hover:translate-x-0.5'
                  }`}
                >
                  {child.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={`/research/${item.slug}`}
      className={`block px-3 py-2.5 rounded-xl text-sm transition-all duration-300 no-underline ${
        isActive
          ? 'bg-gradient-to-r from-medical-indigo/20 to-transparent text-medical-cyan font-medium border-l-2 border-medical-cyan shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
          : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)] border-l-2 border-transparent hover:border-white/20'
      }`}
    >
      {item.title}
    </Link>
  );
}
