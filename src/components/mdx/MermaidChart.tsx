'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, Minimize2, Copy, Check } from 'lucide-react';

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
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#0ea5e9',
        primaryTextColor: '#e2e8f0',
        primaryBorderColor: '#38bdf8',
        lineColor: '#94a3b8',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a',
        edgeLabelBackground: '#0f172a',
        clusterBkg: 'rgba(14,165,233,0.08)',
        clusterBorder: '#38bdf8',
        titleColor: '#e2e8f0',
        nodeTextColor: '#e2e8f0',
      },
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        padding: 16,
      },
      timeline: {
        useMaxWidth: false,
        padding: 20,
      },
    });

    const render = async () => {
      if (!containerRef.current || !code) return;
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      try {
        const { svg } = await mermaid.render(id, code);
        containerRef.current.innerHTML = svg;
        // Make SVG responsive: remove fixed width/height, use viewBox scaling
        const svgEl = containerRef.current.querySelector('svg');
        if (svgEl) {
          svgEl.style.minWidth = '600px';
          svgEl.style.height = 'auto';
          svgEl.style.maxHeight = expanded ? 'none' : '600px';
        }
      } catch (err) {
        containerRef.current.innerHTML = `<pre class="text-red-400 text-sm p-4">${code}</pre>`;
      }
    };

    render();
  }, [code, expanded]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cb-feishu my-6">
      {/* Toolbar — same style as CodeBlockWrapper */}
      <div className="cb-toolbar">
        <div className="cb-toolbar-left">
          <div className="cb-dots">
            <span className="cb-dot cb-dot-red" style={{ cursor: 'default' }} />
            <span className="cb-dot cb-dot-yellow" style={{ cursor: 'default' }} />
            <span className="cb-dot cb-dot-green" style={{ cursor: 'default' }} />
          </div>
          <span className="cb-title">📊 Mermaid 流程图</span>
        </div>
        <div className="cb-toolbar-right">
          <button
            onClick={() => setExpanded(!expanded)}
            className="cb-action-btn"
            title={expanded ? '收起' : '全屏展开'}
          >
            {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleCopy}
            className={`cb-action-btn ${copied ? 'cb-action-success' : ''}`}
            title="复制 Mermaid 代码"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mermaid rendering area — full width, scrollable */}
      <div
        className={`mermaid-render-area ${expanded ? 'mermaid-expanded' : ''}`}
        style={{
          overflowX: 'auto',
          overflowY: expanded ? 'auto' : 'hidden',
          padding: '24px 16px',
          background: 'rgba(0,0,0,0.15)',
          maxHeight: expanded ? 'none' : '600px',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div
          ref={containerRef}
          className="flex justify-center [&>svg]:max-w-none"
        />
      </div>
    </div>
  );
}
