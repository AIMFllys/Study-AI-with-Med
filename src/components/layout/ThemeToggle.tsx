'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
      aria-label="Toggle theme"
    >
      <Sun className="w-4 h-4 text-amber-400 hidden dark:block" />
      <Moon className="w-4 h-4 text-indigo-400 dark:hidden" />
    </button>
  );
}
