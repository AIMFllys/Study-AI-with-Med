'use client';

import { useEffect, useState } from 'react';
import type { HeadingItem } from '@/types/mdx';

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] p-6 bg-black/5 backdrop-blur-3xl border-l border-white/5">
      <div className="flex items-center gap-2 text-[10px] font-bold text-medical-slate/60 uppercase tracking-[0.2em] mb-6">
        <span className="w-1 h-3 rounded-full bg-medical-cyan/50"></span>
        ON THIS PAGE
      </div>
      <nav className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />
        <ul className="space-y-2.5 text-[13px] relative z-10 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 custom-scrollbar">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`transition-all duration-300 ${
                heading.level === 3 ? 'ml-4' : ''
              }`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  window.history.pushState(null, '', `#${heading.id}`);
                }}
                className={`block relative py-1 pl-4 no-underline border-l-[1.5px] transition-all duration-300 ${
                  activeId === heading.id
                    ? 'border-medical-cyan text-medical-cyan font-medium translate-x-1'
                    : 'border-transparent text-medical-slate hover:text-white hover:border-white/30'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
