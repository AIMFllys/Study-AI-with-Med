import { describe, expect, it } from 'vitest';
import { getAllContentSlugs, getContentBySlug } from './mdx';

describe('directory index routes', () => {
  it('generates the directory route for a nested index page', () => {
    expect(getAllContentSlugs()).toContainEqual({ slug: ['ai-news'] });
  });

  it('loads directory index content from the directory route', () => {
    const { frontmatter } = getContentBySlug(['ai-news']);

    expect(frontmatter.title).toBe('医疗 AI 每周动态');
    expect(frontmatter.slug).toBe('ai-news');
  });

  it('keeps the legacy index slug loadable', () => {
    const { frontmatter } = getContentBySlug(['ai-news', 'index']);

    expect(frontmatter.title).toBe('医疗 AI 每周动态');
  });
});
