'use client';

import React from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'danger' | 'tip';
  children: React.ReactNode;
}

const styles = {
  info: { bg: 'bg-blue-500/5', border: 'border-blue-500/20', leftBorder: 'border-l-blue-400', icon: '💡', text: 'text-blue-100' },
  tip: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', leftBorder: 'border-l-emerald-400', icon: '🌱', text: 'text-emerald-100' },
  warning: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', leftBorder: 'border-l-amber-400', icon: '⚡', text: 'text-amber-100' },
  danger: { bg: 'bg-rose-500/5', border: 'border-rose-500/20', leftBorder: 'border-l-rose-400', icon: '🚨', text: 'text-rose-100' },
};

export default function Callout({ type = 'info', children }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={`relative overflow-hidden ${s.bg} border-y border-r border-l-4 ${s.border} ${s.leftBorder} backdrop-blur-md rounded-r-2xl rounded-l-lg p-6 my-8 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div className="flex gap-4 relative z-10">
        <span className="text-2xl mt-0.5 flex-shrink-0 drop-shadow-md">{s.icon}</span>
        <div className={`${s.text} font-medium tracking-wide text-[15px] leading-[1.8] [&>p]:m-0`}>{children}</div>
      </div>
    </div>
  );
}
