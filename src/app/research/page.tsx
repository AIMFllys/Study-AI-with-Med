import { MDXRemote } from 'next-mdx-remote/rsc';
import { getIndexContent } from '@/lib/mdx';
import { getMdxComponents } from '@/components/mdx';
import { ReferenceList } from '@/components/mdx/Citation';
import TableOfContents from '@/components/layout/TableOfContents';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '研究总览',
};

export default function ResearchIndex() {
  const data = getIndexContent();

  if (!data) {
    return (
      <div className="flex-1 py-12 px-8">
        <h1 className="text-4xl font-bold mb-4 text-gradient">研究总览</h1>
        <p className="text-[var(--text-secondary)]">
          正在准备内容，请在 <code className="text-medical-cyan">content/index.mdx</code> 中添加总览内容。
        </p>
      </div>
    );
  }

  const components = getMdxComponents(data.frontmatter.references);

  return (
    <>
      <article className="flex-1 min-w-0 py-12 px-8 lg:px-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            {data.frontmatter.title}
          </h1>
          {data.frontmatter.description && (
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {data.frontmatter.description}
            </p>
          )}
        </header>
        <div className="mdx-content">
          <MDXRemote
            source={data.source}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeSlug, rehypeKatex as any],
              },
            }}
          />
        </div>
        <ReferenceList references={data.frontmatter.references || []} />
      </article>
      <TableOfContents headings={data.headings} />
    </>
  );
}
