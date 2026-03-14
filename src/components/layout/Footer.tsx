import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-medical-slate">
        <p>
          © 2026 羽升 (YuSheng) · 
          <Link href="/about" className="text-medical-cyan hover:underline ml-1 no-underline">
            AI 赋能医学探索日志
          </Link>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/AIMFllys/Study-AI-with-Med"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-medical-cyan transition-colors no-underline"
          >
            GitHub
          </a>
          <span className="text-white/20">|</span>
          <span>Built with Next.js 16 + MDX</span>
        </div>
      </div>
    </footer>
  );
}
