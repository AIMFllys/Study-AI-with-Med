'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Menu, X, Home, BookOpen, FlaskConical, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/research', label: '研究报告', enabled: true },
  { href: '/playground', label: '实验场', enabled: false },
  { href: '/about', label: '关于', enabled: false },
];

const mobileTabLinks = [
  { href: '/', label: '首页', icon: Home, enabled: true },
  { href: '/research', label: '研究报告', icon: BookOpen, enabled: true },
  { href: '/playground', label: '实验场', icon: FlaskConical, enabled: false },
  { href: '/about', label: '关于', icon: Info, enabled: false },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* ═══════════ Desktop / Mobile Top Bar ═══════════ */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--rule-color)',
          boxShadow: '0 1px 10px rgba(0,0,0,0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="no-underline flex items-center gap-2.5 group flex-shrink-0">
            <LogoIcon className="w-7 h-7 transition-transform duration-300 group-hover:scale-105 flex-shrink-0" />
            <div>
              <span
                className="font-serif font-semibold text-sm block leading-none"
                style={{ color: 'var(--text-primary)' }}
              >
                Study AI with Med
              </span>
              <span
                className="font-sans text-[9px] tracking-[0.2em] uppercase block mt-0.5 hidden sm:block"
                style={{ color: 'var(--text-tertiary)' }}
              >
                YuSheng&apos;s Journal
              </span>
            </div>
          </Link>

          {/* ── Desktop Center Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, enabled }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              if (!enabled) {
                return (
                  <span
                    key={href}
                    className="relative px-4 py-2 text-[13px] font-sans flex items-center gap-1.5 cursor-not-allowed select-none"
                    style={{ color: 'var(--text-tertiary)', opacity: 0.45 }}
                  >
                    {label}
                    <span
                      className="text-[8px] tracking-widest uppercase px-1 py-px rounded-sm"
                      style={{ border: '1px solid var(--card-border)', color: 'var(--text-tertiary)' }}
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
                  className="no-underline relative px-4 py-2 text-[13px] font-sans transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 400,
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

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">
            {/* GitHub (desktop) */}
            <a
              href="https://github.com/AIMFllys/Study-AI-with-Med"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-sm transition-all duration-200 no-underline"
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

      {/* ═══════════ Mobile Bottom Tab Bar ═══════════ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: 'color-mix(in srgb, var(--bg-primary) 92%, transparent)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '1px solid var(--rule-color)',
        }}
      >
        <div className="flex items-stretch h-14">
          {mobileTabLinks.map(({ href, label, icon: Icon, enabled }) => {
            const isActive = href === '/'
              ? pathname === '/'
              : pathname === href || pathname.startsWith(href + '/');

            if (!enabled) {
              return (
                <div
                  key={href}
                  className="flex-1 flex flex-col items-center justify-center gap-0.5 cursor-not-allowed select-none"
                  style={{ opacity: 0.3 }}
                >
                  <Icon className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                  <span className="font-sans text-[9px]" style={{ color: 'var(--text-tertiary)' }}>
                    {label}
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className="no-underline flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors relative"
              >
                {/* Active indicator glow */}
                {isActive && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-b"
                    style={{ background: 'var(--accent)', boxShadow: '0 2px 8px rgba(14,165,233,0.35)' }}
                  />
                )}
                <Icon
                  className="w-4 h-4 transition-colors"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--text-tertiary)' }}
                />
                <span
                  className="font-sans text-[9px] transition-colors"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
        {/* Safe area for phones with home indicator */}
        <div className="h-[env(safe-area-inset-bottom)]" style={{ background: 'var(--bg-primary)' }} />
      </nav>
    </>
  );
}

/* ── Logo Icon (SVG) ── */
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill="#0ea5e9" />
      <rect x="0" y="0" width="4" height="32" rx="2" fill="rgba(0,0,0,0.15)" />
      <circle cx="16" cy="10" r="2.5" fill="white" opacity="0.95" />
      <circle cx="22" cy="16" r="2" fill="white" opacity="0.75" />
      <circle cx="10" cy="16" r="2" fill="white" opacity="0.75" />
      <circle cx="16" cy="22" r="2.5" fill="white" opacity="0.95" />
      <line x1="16" y1="12.5" x2="22" y2="14" stroke="white" strokeWidth="1.2" opacity="0.5" />
      <line x1="16" y1="12.5" x2="10" y2="14" stroke="white" strokeWidth="1.2" opacity="0.5" />
      <line x1="10" y1="18" x2="16" y2="19.5" stroke="white" strokeWidth="1.2" opacity="0.5" />
      <line x1="22" y1="18" x2="16" y2="19.5" stroke="white" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}
