import { MDXRemote } from 'next-mdx-remote/rsc';
import { getIndexContent, sharedMdxOptions } from '@/lib/mdx';
import { getMdxComponents } from '@/components/mdx';
import { ReferenceList } from '@/components/mdx/Citation';
import TableOfContents from '@/components/layout/TableOfContents';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '研究总览',
};

export default function ResearchIndex() {
  const data = getIndexContent();

  if (!data) {
    return (
      <div className="flex-1 py-16 px-8 lg:px-14">
        <h1 className="font-serif text-4xl font-bold mb-4 text-gradient">研究总览</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          正在准备内容，请在 <code style={{ color: 'var(--accent)' }}>content/index.mdx</code> 中添加总览内容。
        </p>
      </div>
    );
  }

  const components = getMdxComponents(data.frontmatter.references);

  return (
    <>
      <article
        className="flex-1 min-w-0 py-16 px-8 lg:px-14"
        style={{ animation: 'page-turn 0.5s cubic-bezier(0.23,1,0.32,1) both' }}
      >
        <header className="mb-12">
          {/* 章节标注 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: 'var(--accent)', opacity: 0.5 }} />
            <span
              className="font-sans text-[10px] tracking-[0.25em] uppercase"
              style={{ color: 'var(--accent)', opacity: 0.7 }}
            >
              Research Journal · Overview
            </span>
          </div>

          <h1
            className="font-serif font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)' }}
          >
            {data.frontmatter.title}
          </h1>

          {data.frontmatter.description && (
            <p
              className="font-body text-lg leading-relaxed max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {data.frontmatter.description}
            </p>
          )}

          {/* 分隔线 */}
          <div className="h-px mt-8" style={{ background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
        </header>

        <div className="mdx-content">
          <MDXRemote
            source={data.source}
            components={components}
            options={{ mdxOptions: sharedMdxOptions }}
          />
        </div>
        <ReferenceList references={data.frontmatter.references || []} />
      </article>
      <TableOfContents headings={data.headings} />
    </>
  );
}
