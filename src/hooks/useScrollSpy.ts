'use client';

import { useEffect, useState, useCallback } from 'react';
import type { HeadingItem } from '@/types/mdx';

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: '-80px 0px -70% 0px',
  threshold: 0,
};

/**
 * Centralized scroll spy hook.
 * Tracks the active heading and overall read progress for TOC components.
 */
export function useScrollSpy(headings: HeadingItem[]) {
  const [activeId, setActiveId] = useState<string>('');
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    }, OBSERVER_OPTIONS);

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

  return { activeId, readProgress };
}

/**
 * Smooth-scrolls to a heading element and updates the URL hash.
 */
export function useScrollToHeading() {
  return useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  }, []);
}

/**
 * Locks body scroll while `locked` is true (for modal/drawer overlays).
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [locked]);
}
