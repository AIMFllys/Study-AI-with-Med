'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  easing?: string;
  y?: number;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  easing = 'cubic-bezier(0.23,1,0.32,1)',
  y = 24,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateY(${y}px)`,
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ${easing} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function Typewriter({ text, speed = 40, startDelay = 600 }: { text: string; speed?: number; startDelay?: number }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i += 1;
        } else {
          clearInterval(interval);
          interval = undefined;
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [text, speed, startDelay]);

  return <>{displayed}</>;
}
