'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidChartProps {
  children: React.ReactNode;
}

/**
 * Extract raw text from React children (MDX passes JSX nodes, not raw strings)
 */
function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children) && children.props) {
    return extractText((children.props as { children?: React.ReactNode }).children);
  }
  return '';
}

export default function MermaidChart({ children }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const code = extractText(children).trim();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#6366f1',
        primaryTextColor: '#f1f5f9',
        primaryBorderColor: '#6366f1',
        lineColor: '#94a3b8',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a',
      },
    });

    const render = async () => {
      if (!containerRef.current || !code) return;
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      try {
        const { svg } = await mermaid.render(id, code);
        containerRef.current.innerHTML = svg;
      } catch (err) {
        containerRef.current.innerHTML = `<pre class="text-red-400 text-sm">${code}</pre>`;
      }
    };

    render();
  }, [code]);

  return (
    <div className="my-6 flex justify-center">
      <div
        ref={containerRef}
        className="glass-card p-6 overflow-x-auto max-w-full [&>svg]:max-w-full"
      />
    </div>
  );
}
