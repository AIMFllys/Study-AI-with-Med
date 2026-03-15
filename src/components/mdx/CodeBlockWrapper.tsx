'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Copy, Check, Download, ChevronDown, Search, Play, Loader2 } from 'lucide-react';
import { loadPyodideFromCDN } from '@/lib/pyodide';

/* ── Language definitions ── */
const COMMON_LANGUAGES = [
  { key: 'plaintext', label: 'Plain Text' },
  { key: 'powershell', label: 'PowerShell' },
  { key: 'bash', label: 'Bash' },
  { key: 'python', label: 'Python' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'java', label: 'Java' },
  { key: 'c', label: 'C' },
  { key: 'cpp', label: 'C++' },
  { key: 'csharp', label: 'C#' },
  { key: 'go', label: 'Go' },
  { key: 'rust', label: 'Rust' },
  { key: 'ruby', label: 'Ruby' },
  { key: 'php', label: 'PHP' },
  { key: 'swift', label: 'Swift' },
  { key: 'kotlin', label: 'Kotlin' },
  { key: 'sql', label: 'SQL' },
  { key: 'yaml', label: 'YAML' },
  { key: 'json', label: 'JSON' },
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'tsx', label: 'TSX' },
  { key: 'jsx', label: 'JSX' },
  { key: 'dockerfile', label: 'Dockerfile' },
  { key: 'xml', label: 'XML' },
  { key: 'markdown', label: 'Markdown' },
  { key: 'r', label: 'R' },
  { key: 'scala', label: 'Scala' },
  { key: 'lua', label: 'Lua' },
  { key: 'perl', label: 'Perl' },
];

const LANG_LABELS: Record<string, string> = {};
COMMON_LANGUAGES.forEach(l => { LANG_LABELS[l.key] = l.label; });
Object.assign(LANG_LABELS, {
  ps1: 'PowerShell', sh: 'Bash', py: 'Python',
  js: 'JavaScript', ts: 'TypeScript', yml: 'YAML',
  text: 'Plain Text', '': 'Plain Text',
});

const LANG_EXTENSIONS: Record<string, string> = {
  powershell: '.ps1', ps1: '.ps1', bash: '.sh', sh: '.sh',
  python: '.py', py: '.py', javascript: '.js', js: '.js',
  typescript: '.ts', ts: '.ts', yaml: '.yaml', yml: '.yml',
  json: '.json', sql: '.sql', css: '.css', html: '.html',
  tsx: '.tsx', jsx: '.jsx', java: '.java', c: '.c', cpp: '.cpp',
  csharp: '.cs', go: '.go', rust: '.rs', ruby: '.rb', php: '.php',
  swift: '.swift', kotlin: '.kt', xml: '.xml', markdown: '.md',
  r: '.r', scala: '.scala', lua: '.lua', perl: '.pl',
};

interface CodeBlockWrapperProps {
  children: React.ReactNode;
  'data-language'?: string;
  'data-title'?: string;
}

export default function CodeBlockWrapper({ children, ...props }: CodeBlockWrapperProps) {
  const [copied, setCopied] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const [detectedLang, setDetectedLang] = useState<string>('');
  const [totalLines, setTotalLines] = useState(0);
  const [pyOutput, setPyOutput] = useState<string>('');
  const [pyRunning, setPyRunning] = useState(false);
  const [pyLoading, setPyLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);
  const codeAreaRef = useRef<HTMLDivElement>(null);

  const title = props['data-title'] || '';

  // ── Detect language, count lines, and inject line numbers ──
  useEffect(() => {
    if (!wrapperRef.current) return;

    // Detect language from <code data-language="...">
    const codeEl = wrapperRef.current.querySelector('code[data-language]');
    if (codeEl) {
      setDetectedLang(codeEl.getAttribute('data-language') || '');
    } else {
      const figure = wrapperRef.current.querySelector('[data-rehype-pretty-code-figure]');
      setDetectedLang(figure?.getAttribute('data-language') || props['data-language'] || '');
    }

    // Count .line elements (rehype-pretty-code wraps each line in span.line)
    const lines = wrapperRef.current.querySelectorAll('[data-line]');
    const count = lines.length;
    setTotalLines(count);

    // Generate line numbers in the gutter div
    if (lineNumRef.current && count > 0) {
      // Clear existing
      lineNumRef.current.innerHTML = '';
      for (let i = 1; i <= count; i++) {
        const numEl = document.createElement('div');
        numEl.className = 'cb-ln';
        numEl.textContent = String(i);
        lineNumRef.current.appendChild(numEl);
      }
    }
  }, [children, props]);

  // Sync scroll between line numbers and code
  useEffect(() => {
    const codeArea = codeAreaRef.current;
    const lineNums = lineNumRef.current;
    if (!codeArea || !lineNums) return;

    const syncScroll = () => {
      // Find the pre element inside code area
      const pre = codeArea.querySelector('pre');
      if (pre) {
        lineNums.scrollTop = pre.scrollTop;
      }
    };

    const pre = codeArea.querySelector('pre');
    if (pre) {
      pre.addEventListener('scroll', syncScroll);
      return () => pre.removeEventListener('scroll', syncScroll);
    }
  }, [totalLines, minimized]);

  const displayLang = LANG_LABELS[detectedLang.toLowerCase()] || detectedLang || 'Plain Text';

  // ── Close dropdown on outside click ──
  useEffect(() => {
    if (!showLangDropdown) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowLangDropdown(false);
        setLangSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    setTimeout(() => searchInputRef.current?.focus(), 50);
    return () => document.removeEventListener('mousedown', handler);
  }, [showLangDropdown]);

  // ── Helpers ──
  const getCodeText = useCallback(() => {
    if (!wrapperRef.current) return '';
    const lines = wrapperRef.current.querySelectorAll('[data-line]');
    if (lines.length > 0) {
      return Array.from(lines).map(l => l.textContent || '').join('\n');
    }
    const code = wrapperRef.current.querySelector('code');
    return code?.textContent || '';
  }, []);

  const handleCopy = useCallback(async () => {
    const text = getCodeText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [getCodeText]);

  const handleDownload = useCallback(() => {
    const text = getCodeText();
    const ext = LANG_EXTENSIONS[detectedLang.toLowerCase()] || '.txt';
    const basename = title || `code${ext}`;
    const filename = basename.replace(/[^a-zA-Z0-9._\-\u4e00-\u9fa5]/g, '_');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith(ext) ? filename : filename + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [getCodeText, detectedLang, title]);

  const isPython = ['python', 'py'].includes(detectedLang.toLowerCase());

  const handleRunPython = useCallback(async () => {
    if (!isPython) return;
    setPyRunning(true);
    setPyLoading(true);
    setPyOutput('正在加载 Python 运行时 (Pyodide)...');

    try {
      const pyodide = await loadPyodideFromCDN();
      setPyLoading(false);

      let stdout = '';
      pyodide.setStdout({
        batched: (text: string) => {
          stdout += text + '\n';
          setPyOutput(stdout.trim());
        },
      });
      pyodide.setStderr({
        batched: (text: string) => {
          stdout += text + '\n';
          setPyOutput(stdout.trim());
        },
      });

      setPyOutput('运行中...');
      const codeText = getCodeText();
      await pyodide.runPythonAsync(codeText);
      if (!stdout.trim()) setPyOutput('✓ 运行完成（无输出）');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setPyOutput(`❌ Error:\n${msg}`);
    } finally {
      setPyRunning(false);
      setPyLoading(false);
    }
  }, [isPython, getCodeText]);

  const filteredLangs = COMMON_LANGUAGES.filter(l =>
    l.label.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.key.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <div
      className={`cb-feishu ${minimized ? 'cb-minimized' : ''}`}
      ref={wrapperRef}
    >
      {/* ── Toolbar ── */}
      <div className="cb-toolbar">
        <div className="cb-toolbar-left">
          <div className="cb-dots">
            <button className="cb-dot cb-dot-red" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="返回顶部" />
            <button className="cb-dot cb-dot-yellow" onClick={() => setMinimized(true)} title="折叠代码" />
            <button className="cb-dot cb-dot-green" onClick={() => setMinimized(false)} title="展开代码" />
          </div>
          <span className="cb-title">{title || '代码块'}</span>
          {totalLines > 0 && <span className="cb-line-count">{totalLines} 行</span>}
        </div>
        <div className="cb-toolbar-right">
          {/* ▶ Run button — LEFT of language selector (Python only) */}
          {isPython && (
            <button
              onClick={handleRunPython}
              disabled={pyRunning}
              className="cb-run-btn"
              title="运行 Python 代码"
            >
              {pyRunning ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              <span>{pyLoading ? '加载中' : pyRunning ? '运行中' : '运行'}</span>
            </button>
          )}
          <div className="cb-lang-selector" ref={dropdownRef}>
            <button className="cb-lang-trigger" onClick={() => setShowLangDropdown(!showLangDropdown)}>
              <span>{displayLang}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showLangDropdown && (
              <div className="cb-lang-dropdown">
                <div className="cb-lang-search">
                  <Search className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
                  <input ref={searchInputRef} type="text" placeholder="搜索" value={langSearch}
                    onChange={e => setLangSearch(e.target.value)} className="cb-lang-search-input" />
                </div>
                <div className="cb-lang-list">
                  {filteredLangs.map(lang => (
                    <button key={lang.key}
                      className={`cb-lang-option ${lang.label === displayLang ? 'cb-lang-active' : ''}`}
                      onClick={() => { setShowLangDropdown(false); setLangSearch(''); }}>
                      {lang.label}
                    </button>
                  ))}
                  {filteredLangs.length === 0 && <div className="cb-lang-empty">无匹配语言</div>}
                </div>
              </div>
            )}
          </div>
          <button onClick={handleDownload} className="cb-action-btn" title="下载文件">
            <Download className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleCopy} className={`cb-action-btn ${copied ? 'cb-action-success' : ''}`} title="复制代码">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── Code body: line numbers gutter + code area ── */}
      {!minimized && (
        <div className="cb-body">
          {/* Line numbers gutter — rendered via JS */}
          <div className="cb-gutter" ref={lineNumRef} aria-hidden="true" />
          {/* Code content from rehype-pretty-code */}
          <div className="cb-code-area" ref={codeAreaRef}>
            {children}
          </div>
        </div>
      )}

      {/* ── Python Output panel ── */}
      {isPython && pyOutput && (
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
                textTransform: 'uppercase' as const,
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
            {pyOutput}
          </pre>
        </div>
      )}
    </div>
  );
}
