import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Study AI with Med — 羽升的 AI 赋能医学探索日志',
    template: '%s | Study AI with Med',
  },
  description:
    '从蛋白质折叠的生成式突破到多模态临床决策智能体，深度剖析人工智能如何重塑生命科学与临床医药的底层逻辑。',
  openGraph: {
    title: 'Study AI with Med',
    description: '羽升的 AI 赋能医学探索日志',
    url: 'https://github.com/AIMFllys/Study-AI-with-Med',
    siteName: 'Study AI with Med',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
