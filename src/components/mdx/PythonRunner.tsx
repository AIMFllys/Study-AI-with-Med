'use client';

import React, { useState, useCallback } from 'react';

interface PythonRunnerProps {
  children: React.ReactNode;
}

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children) && children.props) {
    return extractText((children.props as { children?: React.ReactNode }).children);
  }
  return '';
}

// Load Pyodide from CDN (avoids Next.js server-side bundling issues)
async function loadPyodideFromCDN() {
  // If already loaded, return the instance on window
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  if (win.__pyodide_ready) return win.__pyodide_instance;

  // Inject the CDN script tag if not present
  if (!document.getElementById('pyodide-cdn')) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.id = 'pyodide-cdn';
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Pyodide CDN script'));
      document.head.appendChild(script);
    });
  }

  // loadPyodide is now globally available
  const pyodide = await win.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
  });
  win.__pyodide_ready = true;
  win.__pyodide_instance = pyodide;
  return pyodide;
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

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-md shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/70"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400/70"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400/70"></span>
          </div>
          <span className="text-xs font-semibold text-medical-slate/80 uppercase tracking-widest ml-1">
            🐍 Python · Pyodide WASM
          </span>
        </div>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="group flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-xl bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/25 hover:border-emerald-400/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_16px_rgba(52,211,153,0.2)]"
        >
          <span className={isRunning ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}>
            {isRunning ? '⏳' : '▶'}
          </span>
          {isLoading ? '加载中...' : isRunning ? '运行中...' : '运行'}
        </button>
      </div>

      {/* Code */}
      <pre className="p-5 text-[13.5px] leading-relaxed overflow-x-auto">
        <code className="text-slate-300 font-mono">{code}</code>
      </pre>

      {/* Output */}
      {output && (
        <div className="border-t border-white/10 bg-black/40">
          <div className="flex items-center gap-2 px-5 py-2 border-b border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-bold text-medical-slate/50 uppercase tracking-widest">Output</span>
          </div>
          <pre className="px-5 py-4 text-sm text-emerald-300 whitespace-pre-wrap font-mono leading-relaxed">{output}</pre>
        </div>
      )}
    </div>
  );
}
