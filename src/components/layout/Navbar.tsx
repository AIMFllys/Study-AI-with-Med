'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/research', label: '研究报告', enabled: true },
  { href: '/playground', label: '实验场', enabled: false },
  { href: '/about', label: '关于', enabled: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'color-mix(in srgb, var(--bg-primary) 88%, transparent)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid var(--rule-color)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 h-14 flex items-center justify-between">

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

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-2">
          {/* GitHub (desktop only) */}
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

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-200"
            style={{ border: '1px solid var(--card-border)', color: 'var(--text-secondary)' }}
            aria-label="菜单"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ═══════════ Mobile Dropdown Menu ═══════════ */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ top: '3.5rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div
            className="absolute left-0 right-0 z-50 md:hidden"
            style={{
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--rule-color)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
              animation: 'slideDown 0.25s ease-out',
            }}
          >
            <nav className="px-5 py-4 space-y-1">
              {/* 首页 */}
              <MobileNavLink
                href="/"
                label="首 页"
                isActive={pathname === '/'}
                enabled={true}
                onClick={() => setMobileMenuOpen(false)}
              />
              {navLinks.map(({ href, label, enabled }) => (
                <MobileNavLink
                  key={href}
                  href={href}
                  label={label}
                  isActive={pathname === href || pathname.startsWith(href + '/')}
                  enabled={enabled}
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
            </nav>

            {/* Divider */}
            <div className="mx-5 h-px" style={{ background: 'var(--rule-color)' }} />

            {/* Footer actions */}
            <div className="px-5 py-3 flex items-center justify-between">
              <a
                href="https://github.com/AIMFllys/Study-AI-with-Med"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 no-underline"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <Github className="w-4 h-4" />
                <span className="text-xs font-sans">GitHub</span>
              </a>
              <span className="font-serif italic text-[10px]" style={{ color: 'var(--text-tertiary)', opacity: 0.5 }}>
                Study AI with Medicine
              </span>
            </div>
          </div>
        </>
      )}

      {/* Slide down animation */}
      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}

/* ── Mobile Nav Link Row ── */
function MobileNavLink({
  href,
  label,
  isActive,
  enabled,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  enabled: boolean;
  onClick: () => void;
}) {
  if (!enabled) {
    return (
      <div
        className="flex items-center justify-between px-3 py-2.5 rounded-md cursor-not-allowed"
        style={{ opacity: 0.4 }}
      >
        <span className="font-sans text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {label}
        </span>
        <span
          className="text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-sm"
          style={{ border: '1px solid var(--card-border)', color: 'var(--text-tertiary)' }}
        >
          soon
        </span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-md no-underline transition-all duration-200"
      style={{
        color: isActive ? 'var(--accent)' : 'var(--text-primary)',
        background: isActive ? 'rgba(14,165,233,0.08)' : 'transparent',
        borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
      }}
    >
      <span className="font-sans text-sm font-medium">{label}</span>
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
      )}
    </Link>
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
