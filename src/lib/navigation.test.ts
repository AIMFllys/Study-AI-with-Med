import { describe, expect, it } from 'vitest';
import { buildNavigationTree } from './navigation';
import { getNavGroups } from './mdx';
import type { NavItem } from '@/types/mdx';

function findBySlug(items: NavItem[], slug: string): NavItem | undefined {
  for (const item of items) {
    if (item.slug === slug) return item;
    const found = item.children ? findBySlug(item.children, slug) : undefined;
    if (found) return found;
  }
  return undefined;
}

describe('getNavGroups', () => {
  it('reads group titles and order from content/index.mdx frontmatter', () => {
    const groups = getNavGroups();

    expect(groups['ai-analysis']).toEqual({ title: 'AI+X 多维分析', order: 1 });
    expect(groups['ai-protein']).toEqual({ title: 'AI+蛋白质预测', order: 1 });
    expect(groups['ai-drug']).toEqual({ title: 'AI+药物发现', order: 2 });
    expect(groups['ai-llm']).toEqual({ title: 'AI+医疗大模型', order: 3 });
    expect(groups['ai-imaging']).toEqual({ title: 'AI+精准影像', order: 4 });
    expect(groups['ai-agent']).toEqual({ title: 'AI+临床智能体', order: 5 });
    expect(groups.tools).toEqual({ title: '工具与部署指南', order: 90 });
    expect(groups['ai-report']).toEqual({ title: 'AI医疗报告论文', order: 6 });
    expect(groups['ai-news']).toEqual({ title: '医疗 AI 每周动态', order: 7 });
    expect(groups.knowledge).toEqual({ title: '知识点分析', order: 10 });
    expect(groups.notes).toEqual({ title: '个人笔记区', order: 80 });
    expect(groups.forum).toEqual({ title: '微论坛', order: 90 });
  });
});

describe('buildNavigationTree', () => {
  const tree = buildNavigationTree();

  it('labels top-level groups from frontmatter and sorts them by frontmatter order', () => {
    expect(tree.map((n) => [n.slug, n.title, n.order])).toEqual([
      ['ai-analysis', 'AI+X 多维分析', 1],
      ['ai-report', 'AI医疗报告论文', 6],
      ['ai-news', '医疗 AI 每周动态', 7],
      ['knowledge', '知识点分析', 10],
      ['notes', '个人笔记区', 80],
      ['forum', '微论坛', 90],
    ]);
  });

  it('labels nested AI+X sub-groups from frontmatter and sorts them by frontmatter order', () => {
    const analysis = findBySlug(tree, 'ai-analysis');

    expect(analysis?.children?.map((n) => [n.slug, n.title, n.order])).toEqual([
      ['ai-analysis/ai-protein', 'AI+蛋白质预测', 1],
      ['ai-analysis/ai-drug', 'AI+药物发现', 2],
      ['ai-analysis/ai-llm', 'AI+医疗大模型', 3],
      ['ai-analysis/ai-imaging', 'AI+精准影像', 4],
      ['ai-analysis/ai-agent', 'AI+临床智能体', 5],
    ]);
  });

  it('labels tools sub-groups from frontmatter', () => {
    const tools = findBySlug(tree, 'ai-analysis/ai-protein/tools');

    expect(tools?.title).toBe('工具与部署指南');
    expect(tools?.order).toBe(90);
  });

  it('sources every group node title and order from the frontmatter registry', () => {
    const groups = getNavGroups();

    const assertGroupsSourced = (items: NavItem[]) => {
      for (const item of items) {
        if (item.children && item.children.length > 0) {
          const segment = item.slug.split('/').pop()!;
          expect(groups[segment]).toBeDefined();
          expect(item.title).toBe(groups[segment].title);
          expect(item.order).toBe(groups[segment].order);
          assertGroupsSourced(item.children);
        }
      }
    };

    assertGroupsSourced(tree);
  });
});
