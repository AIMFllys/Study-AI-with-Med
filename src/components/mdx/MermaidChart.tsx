'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { Maximize2, Minimize2, Copy, Check } from 'lucide-react';

interface MermaidChartProps {
  children: React.ReactNode;
}

type MermaidTheme = 'light' | 'dark';

type MermaidConfig = Parameters<typeof mermaid.initialize>[0];

// Mermaid's built-in 'default'/'dark' themes hardcode node fills (mainBkg,
// nodeBorder, ...), which silently ignore primaryColor-style overrides.
// The 'base' theme derives everything from themeVariables, so the palette
// below fully controls node, edge, label and actor colors.
const MERMAID_FONT_FAMILY =
  '"Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';

const MERMAID_LAYOUT = {
  startOnLoad: false,
  theme: 'base',
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    padding: 16,
  },
  timeline: {
    useMaxWidth: false,
    padding: 20,
  },
} as const;

const MERMAID_CONFIGS: Record<MermaidTheme, MermaidConfig> = {
  dark: {
    ...MERMAID_LAYOUT,
    themeVariables: {
      background: '#020617',
      fontFamily: MERMAID_FONT_FAMILY,
      fontSize: '16px',
      primaryColor: '#1e293b',
      mainBkg: '#1e293b',
      secondBkg: '#334155',
      primaryTextColor: '#e2e8f0',
      nodeTextColor: '#e2e8f0',
      textColor: '#e2e8f0',
      titleColor: '#e2e8f0',
      primaryBorderColor: '#38bdf8',
      nodeBorder: '#38bdf8',
      secondaryBorderColor: '#475569',
      tertiaryBorderColor: '#334155',
      lineColor: '#94a3b8',
      arrowheadColor: '#94a3b8',
      edgeLabelBackground: 'rgba(11, 17, 32, 0.9)',
      clusterBkg: 'rgba(14, 165, 233, 0.08)',
      clusterBorder: '#38bdf8',
      actorBkg: '#1e293b',
      actorBorder: '#38bdf8',
      actorTextColor: '#e2e8f0',
      signalColor: '#e2e8f0',
      signalTextColor: '#e2e8f0',
      labelBoxBkgColor: '#0b1120',
      labelBoxBorderColor: '#38bdf8',
      labelTextColor: '#e2e8f0',
      noteBkgColor: '#44403c',
      noteTextColor: '#fef3c7',
      noteBorderColor: '#a16207',
    },
  },
  light: {
    ...MERMAID_LAYOUT,
    themeVariables: {
      background: '#f8fafc',
      fontFamily: MERMAID_FONT_FAMILY,
      fontSize: '16px',
      primaryColor: '#e0f2fe',
      mainBkg: '#e0f2fe',
      secondBkg: '#f1f5f9',
      primaryTextColor: '#0f172a',
      nodeTextColor: '#0f172a',
      textColor: '#0f172a',
      titleColor: '#0f172a',
      primaryBorderColor: '#0284c7',
      nodeBorder: '#0284c7',
      secondaryBorderColor: '#bae6fd',
      tertiaryBorderColor: '#cbd5e1',
      lineColor: '#64748b',
      arrowheadColor: '#64748b',
      edgeLabelBackground: 'rgba(255, 255, 255, 0.9)',
      clusterBkg: 'rgba(14, 165, 233, 0.08)',
      clusterBorder: '#38bdf8',
      actorBkg: '#e0f2fe',
      actorBorder: '#0284c7',
      actorTextColor: '#0f172a',
      signalColor: '#0f172a',
      signalTextColor: '#0f172a',
      labelBoxBkgColor: '#ffffff',
      labelBoxBorderColor: '#0284c7',
      labelTextColor: '#0f172a',
      noteBkgColor: '#fef9c3',
      noteTextColor: '#0f172a',
      noteBorderColor: '#eab308',
    },
  },
};

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
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Wait for next-themes to resolve so the diagram is only rendered once,
    // in the correct theme (avoids a dark flash on light pages).
    if (!resolvedTheme) return;
    const theme: MermaidTheme = resolvedTheme === 'light' ? 'light' : 'dark';
    mermaid.initialize(MERMAID_CONFIGS[theme]);

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
  }, [code, expanded, resolvedTheme]);

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
          background: resolvedTheme === 'light' ? 'rgba(2, 6, 23, 0.04)' : 'rgba(0, 0, 0, 0.15)',
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
