'use client';

import React, { useState, useCallback } from 'react';

interface PythonRunnerProps {
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

export default function PythonRunner({ children }: PythonRunnerProps) {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const code = extractText(children).trim();

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setIsLoading(true);
    setOutput('正在加载 Python 运行时 (Pyodide)...');

    try {
      // Dynamically import pyodide
      const { loadPyodide } = await import('pyodide');
      const pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
      });

      setIsLoading(false);
      setOutput('运行中...');

      // Capture stdout
      pyodide.setStdout({ batched: (text: string) => {
        setOutput((prev) => (prev === '运行中...' ? text : prev + '\n' + text));
      }});

      await pyodide.runPythonAsync(code);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setOutput(`Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
      setIsLoading(false);
    }
  }, [code]);

  return (
    <div className="my-6 glass-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-lg">🐍</span>
          <span className="text-xs font-medium text-medical-slate uppercase tracking-wider">
            Python (Pyodide WASM)
          </span>
        </div>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="px-4 py-1.5 text-xs font-medium rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '⏳ 加载中...' : isRunning ? '⏳ 运行中...' : '▶ 运行'}
        </button>
      </div>

      <pre className="p-4 text-sm overflow-x-auto">
        <code className="text-slate-300">{code}</code>
      </pre>

      {output && (
        <div className="border-t border-white/10 bg-black/30 p-4">
          <div className="text-xs text-medical-slate mb-2 uppercase tracking-wider">Output</div>
          <pre className="text-sm text-emerald-300 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
