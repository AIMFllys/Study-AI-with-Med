'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/research', label: '研究报告', icon: BookIcon, enabled: true },
  { href: '/playground', label: '实验场', icon: FlaskIcon, enabled: false },
  { href: '/about', label: '关于', icon: UserIcon, enabled: false },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* ═══════════ Desktop Top Navbar ═══════════ */}
      <header
        className="sticky top-0 z-50 hidden md:block"
        style={{
          background: 'color-mix(in srgb, var(--bg-primary) 88%, transparent)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid var(--rule-color)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="no-underline flex items-center gap-3 group">
            <div className="relative w-6 h-7 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-[2px] transition-transform duration-300 group-hover:scale-105"
                style={{ background: 'var(--accent)', opacity: 0.9 }}
              />
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[2px]"
                style={{ background: 'rgba(0,0,0,0.25)' }}
              />
              <span
                className="relative font-serif font-black text-[10px] italic z-10"
                style={{ color: '#0d0d0e' }}
              >
                AI
              </span>
            </div>
            <div>
              <span
                className="font-serif font-semibold text-sm block leading-none"
                style={{ color: 'var(--text-primary)' }}
              >
                Study AI with Med
              </span>
              <span
                className="font-sans text-[9px] tracking-[0.2em] uppercase block mt-0.5"
                style={{ color: 'var(--text-tertiary)' }}
              >
                YuSheng's Journal
              </span>
            </div>
          </Link>

          {/* Center Nav */}
          <nav className="flex items-center gap-1">
            {navLinks.map(({ href, label, enabled }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');

              if (!enabled) {
                return (
                  <span
                    key={href}
                    className="relative px-4 py-1.5 font-sans text-[13px] tracking-wide rounded-sm cursor-not-allowed select-none flex items-center gap-1.5"
                    style={{ color: 'var(--text-tertiary)', opacity: 0.5 }}
                  >
                    {label}
                    <span
                      className="text-[8px] tracking-wider uppercase px-1 py-0.5 rounded-sm"
                      style={{ border: '1px solid var(--card-border)', color: 'var(--text-tertiary)', fontSize: '8px' }}
                    >
                      soon
                    </span>
                  </span>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  className="relative no-underline px-4 py-1.5 font-sans text-[13px] tracking-wide rounded-sm transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(14,165,233,0.08)' : 'transparent',
                  }}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-px"
                      style={{ background: 'var(--accent)', opacity: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/AIMFllys/Study-AI-with-Med"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-200 no-underline"
              style={{ border: '1px solid var(--card-border)', color: 'var(--text-secondary)' }}
              aria-label="GitHub"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)';
              }}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ═══════════ Mobile Top Bar (minimal) ═══════════ */}
      <header
        className="sticky top-0 z-50 md:hidden"
        style={{
          background: 'color-mix(in srgb, var(--bg-primary) 92%, transparent)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--rule-color)',
        }}
      >
        <div className="flex items-center justify-between px-4 h-12">
          <Link href="/" className="no-underline flex items-center gap-2">
            <div className="relative w-5 h-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-[2px]" style={{ background: 'var(--accent)', opacity: 0.9 }} />
              <span className="relative font-serif font-black text-[8px] italic z-10" style={{ color: '#0d0d0e' }}>AI</span>
            </div>
            <span className="font-serif font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>
              Study AI with Med
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ═══════════ Mobile Bottom Tab Bar ═══════════ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: 'color-mix(in srgb, var(--bg-primary) 92%, transparent)',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          borderTop: '1px solid var(--rule-color)',
        }}
      >
        {/* 页面进度条（顶部细线） */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--rule-color)' }} />

        <div className="flex items-center justify-around px-2 py-1 pb-[env(safe-area-inset-bottom)]">
          {/* Home */}
          <MobileTabItem
            href="/"
            label="首页"
            icon={HomeIcon}
            isActive={pathname === '/'}
            enabled={true}
          />
          {navLinks.map(({ href, label, icon, enabled }) => (
            <MobileTabItem
              key={href}
              href={href}
              label={label}
              icon={icon}
              isActive={pathname === href || pathname.startsWith(href + '/')}
              enabled={enabled}
            />
          ))}
          {/* GitHub */}
          <a
            href="https://github.com/AIMFllys/Study-AI-with-Med"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-colors"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <Github className="w-5 h-5" />
            <span className="text-[9px] font-sans tracking-wider">GitHub</span>
          </a>
        </div>
      </nav>
    </>
  );
}

/* ── Mobile Tab Item ── */
function MobileTabItem({
  href,
  label,
  icon: Icon,
  isActive,
  enabled,
}: {
  href: string;
  label: string;
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  isActive: boolean;
  enabled: boolean;
}) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg relative">
      {/* Active indicator dot */}
      {isActive && (
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{
            background: 'var(--accent)',
            boxShadow: '0 0 6px var(--accent)',
            animation: 'fade-up 0.3s ease',
          }}
        />
      )}
      <Icon
        className="w-5 h-5 transition-all duration-300"
        style={{
          color: isActive ? 'var(--accent)' : enabled ? 'var(--text-tertiary)' : 'var(--text-tertiary)',
          opacity: enabled ? 1 : 0.35,
          transform: isActive ? 'translateY(-1px)' : 'none',
        }}
      />
      <span
        className="text-[9px] font-sans tracking-wider transition-colors duration-300"
        style={{
          color: isActive ? 'var(--accent)' : enabled ? 'var(--text-tertiary)' : 'var(--text-tertiary)',
          opacity: enabled ? 1 : 0.35,
        }}
      >
        {label}
      </span>
    </div>
  );

  if (!enabled) {
    return <div className="cursor-not-allowed select-none">{content}</div>;
  }

  return (
    <Link href={href} className="no-underline">
      {content}
    </Link>
  );
}

/* ── SVG Icons (lightweight, no extra deps) ── */
function HomeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

function BookIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function FlaskIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M12 3v7l-5 8a1 1 0 0 0 .85 1.5h8.3a1 1 0 0 0 .85-1.5L12 10V3" />
    </svg>
  );
}

function UserIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
