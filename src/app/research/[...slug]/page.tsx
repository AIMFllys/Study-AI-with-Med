import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentBySlug, getAllContentSlugs } from '@/lib/mdx';
import { getMdxComponents } from '@/components/mdx';
import { ReferenceList } from '@/components/mdx/Citation';
import TableOfContents from '@/components/layout/TableOfContents';
import MobileTocDrawer from '@/components/layout/MobileTocDrawer';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllContentSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getContentBySlug(slug);
    return {
      title: frontmatter.title,
      description: frontmatter.description,
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  let data;
  try {
    data = getContentBySlug(slug);
  } catch {
    notFound();
  }

  const components = getMdxComponents(data.frontmatter.references);

  return (
    <>
      <article
        className="flex-1 min-w-0 py-10 sm:py-16 px-4 sm:px-8 lg:px-14"
        style={{ animation: 'page-turn 0.5s cubic-bezier(0.23,1,0.32,1) both' }}
      >
        <header className="mb-12">
          {/* 分类标签 */}
          {data.frontmatter.category && (
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: 'var(--accent)', opacity: 0.5 }} />
              <span
                className="font-sans text-[10px] tracking-[0.25em] uppercase"
                style={{ color: 'var(--accent)', opacity: 0.7 }}
              >
                {data.frontmatter.category}
              </span>
            </div>
          )}

          {/* 主标题 */}
          <h1
            className="font-serif font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', color: 'var(--text-primary)' }}
          >
            {data.frontmatter.title}
          </h1>

          {/* 描述 */}
          {data.frontmatter.description && (
            <p
              className="font-body text-base leading-relaxed max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {data.frontmatter.description}
            </p>
          )}

          {/* 日期 */}
          {data.frontmatter.date && (
            <p
              className="font-sans text-xs tracking-wider mt-4"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {data.frontmatter.date}
            </p>
          )}

          {/* 底部分隔线 */}
          <div className="h-px mt-8" style={{ background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
        </header>

        <div className="mdx-content">
          <MDXRemote
            source={data.source}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [
                  rehypeSlug,
                  rehypeKatex as any,
                  [
                    rehypePrettyCode as any,
                    {
                      theme: {
                        dark: 'github-dark-dimmed',
                        light: 'vitesse-light',
                      },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
        <ReferenceList references={data.frontmatter.references || []} />
      </article>
      <TableOfContents headings={data.headings} />
      <MobileTocDrawer headings={data.headings} />
    </>
  );
}
