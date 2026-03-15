'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, Check, Download, Play, Loader2 } from 'lucide-react';
import { loadPyodideFromCDN } from '@/lib/pyodide';

interface PythonRunnerProps {
  children?: React.ReactNode;
  code?: string;
}

function extractText(children: React.ReactNode): string {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children) && children.props) {
    return extractText((children.props as { children?: React.ReactNode }).children);
  }
  return '';
}

export default function PythonRunner({ children, code: codeProp }: PythonRunnerProps) {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [totalLines, setTotalLines] = useState(0);

  const lineNumRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  const code = (codeProp || extractText(children)).trim();

  // Count lines and render line numbers
  useEffect(() => {
    const lines = code.split('\n');
    setTotalLines(lines.length);

    if (lineNumRef.current) {
      lineNumRef.current.innerHTML = '';
      for (let i = 1; i <= lines.length; i++) {
        const numEl = document.createElement('div');
        numEl.className = 'cb-ln';
        numEl.textContent = String(i);
        lineNumRef.current.appendChild(numEl);
      }
    }
  }, [code]);

  // Sync scroll between line numbers and code
  useEffect(() => {
    const pre = codeRef.current;
    const gutter = lineNumRef.current;
    if (!pre || !gutter) return;

    const syncScroll = () => { gutter.scrollTop = pre.scrollTop; };
    pre.addEventListener('scroll', syncScroll);
    return () => pre.removeEventListener('scroll', syncScroll);
  }, [totalLines]);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setIsLoading(true);
    setOutput('正在加载 Python 运行时 (Pyodide)...');

    try {
      const pyodide = await loadPyodideFromCDN();
      setIsLoading(false);

      let stdout = '';
      pyodide.setStdout({
        batched: (text: string) => {
          stdout += text + '\n';
          setOutput(stdout.trim());
        },
      });
      pyodide.setStderr({
        batched: (text: string) => {
          stdout += text + '\n';
          setOutput(stdout.trim());
        },
      });

      setOutput('运行中...');
      await pyodide.runPythonAsync(code);
      if (!stdout.trim()) setOutput('✓ 运行完成（无输出）');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setOutput(`❌ Error:\n${msg}`);
    } finally {
      setIsRunning(false);
      setIsLoading(false);
    }
  }, [code]);

  const handleCopy = useCallback(async () => {
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
  }, [code]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code]);

  return (
    <div className="cb-feishu">
      {/* ── Toolbar (matching CodeBlockWrapper style) ── */}
      <div className="cb-toolbar">
        <div className="cb-toolbar-left">
          <div className="cb-dots">
            <span className="cb-dot cb-dot-red" style={{ cursor: 'default' }} />
            <span className="cb-dot cb-dot-yellow" style={{ cursor: 'default' }} />
            <span className="cb-dot cb-dot-green" style={{ cursor: 'default' }} />
          </div>
          <span className="cb-title">🐍 Python · Pyodide WASM</span>
          {totalLines > 0 && <span className="cb-line-count">{totalLines} 行</span>}
        </div>
        <div className="cb-toolbar-right">
          {/* ▶ Run button — LEFT of language selector */}
          <button
            onClick={runCode}
            disabled={isRunning}
            className="cb-run-btn"
            title="运行 Python 代码"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span>{isLoading ? '加载中' : isRunning ? '运行中' : '运行'}</span>
          </button>
          {/* Language badge */}
          <span className="cb-lang-badge">Python</span>
          {/* Download */}
          <button onClick={handleDownload} className="cb-action-btn" title="下载文件">
            <Download className="w-3.5 h-3.5" />
          </button>
          {/* Copy */}
          <button
            onClick={handleCopy}
            className={`cb-action-btn ${copied ? 'cb-action-success' : ''}`}
            title="复制代码"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── Code body: gutter + code ── */}
      <div className="cb-body">
        <div className="cb-gutter" ref={lineNumRef} aria-hidden="true" />
        <div className="cb-code-area">
          <pre
            ref={codeRef}
            style={{
              padding: '1rem 0',
              overflow: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              background: 'transparent',
              margin: 0,
            }}
          >
            <code style={{ display: 'grid', minWidth: '100%' }}>
              {code.split('\n').map((line, i) => (
                <span
                  key={i}
                  data-line=""
                  style={{
                    padding: '0 1rem',
                    display: 'block',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {line || '\u200B'}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* ── Output panel ── */}
      {output && (
        <div style={{ borderTop: '1px solid rgba(128,128,128,0.1)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderBottom: '1px solid rgba(128,128,128,0.05)',
              background: 'rgba(0,0,0,0.03)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                animation: 'pulse 2s infinite',
              }}
            />
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Output
            </span>
          </div>
          <pre
            style={{
              padding: '12px 16px',
              fontSize: '0.85rem',
              color: '#22c55e',
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-mono)',
              lineHeight: '1.6',
              margin: 0,
              background: 'rgba(0,0,0,0.02)',
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
