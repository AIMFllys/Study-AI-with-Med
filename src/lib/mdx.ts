import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkCjkFriendly from 'remark-cjk-friendly/parseOnly';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import type { ContentMeta, HeadingItem } from '@/types/mdx';

type MdxOptions = NonNullable<NonNullable<MDXRemoteProps['options']>['mdxOptions']>;

/**
 * Shared MDX compilation options.
 * Single source of truth for all remark/rehype plugin chains.
 */
export const sharedMdxOptions: MdxOptions = {
  remarkPlugins: [remarkGfm, remarkMath, remarkCjkFriendly],
  rehypePlugins: [
    rehypeSlug,
    rehypeKatex,
    [
      rehypePrettyCode,
      {
        theme: {
          dark: 'github-dark-dimmed',
          light: 'vitesse-light',
        },
        keepBackground: false,
      },
    ],
  ],
};

// Repo-controlled MDX may pass code to components; keep dangerous-expression checks enabled.
export const sharedMdxRemoteOptions = {
  mdxOptions: sharedMdxOptions,
  blockJS: false,
  blockDangerousJS: true,
};

type MdastNode = {
  type?: string;
  lang?: string | null;
  children?: MdastNode[];
};

const mathParser = unified().use(remarkParse).use(remarkMdx).use(remarkMath);

function hasMathNode(node: MdastNode): boolean {
  if (node.type === 'inlineMath' || node.type === 'math') return true;
  if (node.type === 'code' && node.lang === 'math') return true;
  return node.children?.some(hasMathNode) ?? false;
}

export function hasMathSyntax(content: string): boolean {
  return hasMathNode(mathParser.parse(content) as MdastNode);
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Recursively get all .mdx files under content/
 */
function getAllMdxFiles(dir: string = CONTENT_DIR, basePath: string = ''): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, relativePath));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(relativePath);
    }
  }
  return files;
}

/**
 * Convert a file path like "experiments/proteinviz-demo.mdx" to slug segments ["experiments", "proteinviz-demo"]
 */
function filePathToSlug(filePath: string): string[] {
  return filePath
    .replace(/\.mdx$/, '')
    .split(path.sep)
    .filter(Boolean);
}

/**
 * Get all slugs for generateStaticParams
 */
export function getAllContentSlugs(): { slug: string[] }[] {
  const files = getAllMdxFiles();
  return files
    .filter((f) => f !== 'index.mdx')
    .map((f) => ({ slug: filePathToSlug(f) }));
}

/**
 * Get content + metadata for a given slug
 */
export function getContentBySlug(slugSegments: string[]): {
  source: string;
  hasMath: boolean;
  frontmatter: ContentMeta;
  headings: HeadingItem[];
} {
  const filePath = path.join(CONTENT_DIR, ...slugSegments) + '.mdx';

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const headings = extractHeadings(content);

  return {
    source: content,
    hasMath: hasMathSyntax(content),
    frontmatter: {
      slug: slugSegments.join('/'),
      title: data.title || slugSegments[slugSegments.length - 1],
      description: data.description,
      date: data.date,
      category: data.category,
      order: data.order ?? 99,
      tags: data.tags,
      references: data.references,
    },
    headings,
  };
}

/**
 * Get the index page content
 */
export function getIndexContent() {
  const filePath = path.join(CONTENT_DIR, 'index.mdx');
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    source: content,
    hasMath: hasMathSyntax(content),
    frontmatter: {
      slug: '',
      title: data.title || '研究总览',
      description: data.description,
      date: data.date,
      category: data.category,
      order: 0,
      tags: data.tags,
      references: data.references,
    } as ContentMeta,
    headings: extractHeadings(content),
  };
}

/**
 * Get all content metadata for navigation/listing
 */
export function getAllContentMeta(): ContentMeta[] {
  const files = getAllMdxFiles();
  return files.map((f) => {
    const filePath = path.join(CONTENT_DIR, f);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    const slug = f === 'index.mdx' ? '' : filePathToSlug(f).join('/');
    return {
      slug,
      title: data.title || filePathToSlug(f).pop() || '',
      description: data.description,
      date: data.date,
      category: data.category,
      order: data.order ?? 99,
      tags: data.tags,
      references: data.references,
    };
  });
}

/**
 * Extract headings from raw MDX content for the Table of Contents
 */
function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  const slugger = new GithubSlugger();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({ id: slugger.slug(text), text, level });
  }

  return headings;
}
