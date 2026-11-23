import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Noto_Serif_SC } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
});

const notoSerifSC = Noto_Serif_SC({
  variable: '--font-noto-serif-sc',
  preload: false,
});

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
  icons: {
    icon: '/logo.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${notoSerifSC.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col pb-16 md:pb-0">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
