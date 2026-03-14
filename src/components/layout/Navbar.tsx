import Link from 'next/link';
import { Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-lg font-bold no-underline">
          <span className="text-2xl">🧬</span>
          <span className="text-gradient">Study AI with Med</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/research" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">
            研究报告
          </Link>
          <Link href="/playground" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">
            Python 实验场
          </Link>
          <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">
            关于
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/AIMFllys/Study-AI-with-Med"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
