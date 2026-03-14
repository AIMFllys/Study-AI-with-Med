'use client';

import React from 'react';

interface InteractiveHTMLProps {
  children: React.ReactNode;
}

export default function InteractiveHTML({ children }: InteractiveHTMLProps) {
  return (
    <div className="my-6 glass-card p-6 overflow-x-auto [&>svg]:max-w-full [&>svg]:h-auto">
      {children}
    </div>
  );
}
