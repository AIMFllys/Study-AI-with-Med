import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ContentMeta, HeadingItem } from '@/types/mdx';

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
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }

  return headings;
}
