import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentBySlug, getAllContentSlugs } from '@/lib/mdx';
import { getMdxComponents } from '@/components/mdx';
import { ReferenceList } from '@/components/mdx/Citation';
import TableOfContents from '@/components/layout/TableOfContents';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
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
      <article className="flex-1 min-w-0 py-12 px-8 lg:px-12">
        <header className="mb-10">
          {data.frontmatter.category && (
            <div className="inline-block px-3 py-1 mb-4 glass-card text-medical-cyan text-xs font-medium tracking-wider uppercase">
              {data.frontmatter.category}
            </div>
          )}
          <h1 className="text-4xl font-bold text-gradient mb-4">
            {data.frontmatter.title}
          </h1>
          {data.frontmatter.description && (
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {data.frontmatter.description}
            </p>
          )}
          {data.frontmatter.date && (
            <p className="text-sm text-medical-slate mt-2">
              {data.frontmatter.date}
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
