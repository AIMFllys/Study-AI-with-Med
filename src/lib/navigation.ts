import { getAllContentMeta } from './mdx';
import type { NavItem } from '@/types/mdx';

/**
 * Slugs that are hidden from sidebar navigation (superseded by group structure).
 */
const HIDDEN_SLUGS = new Set(['protein-engineering']);

/**
 * Slugs that are planned sections but not yet clickable.
 * They render as non-interactive labels in the sidebar.
 */
const DISABLED_SLUGS: Record<string, string> = {
  'ai-drug-discovery': 'AI+药物发现',
  'medical-llms': 'AI+医疗大模型',
  'agentic-ai-clinical': 'AI+临床智能体',
};

/**
 * Build a tree-shaped navigation structure from flat content metadata
 */
export function buildNavigationTree(): NavItem[] {
  const allMeta = getAllContentMeta().filter(
    (m) => m.slug !== '' && !HIDDEN_SLUGS.has(m.slug)
  );

  // Group by top-level category (first path segment or root)
  const rootItems: NavItem[] = [];
  const groups: Record<string, NavItem[]> = {};

  for (const meta of allMeta) {
    const segments = meta.slug.split('/');

    if (segments.length === 1) {
      if (DISABLED_SLUGS[meta.slug]) {
        // Disabled placeholder: shown but not clickable
        rootItems.push({
          slug: meta.slug,
          title: DISABLED_SLUGS[meta.slug],
          category: meta.category,
          order: meta.order ?? 99,
          disabled: true,
        });
      } else {
        // Normal top-level item
        rootItems.push({
          slug: meta.slug,
          title: meta.title,
          category: meta.category,
          order: meta.order ?? 99,
        });
      }
    } else {
      // Nested item
      const groupKey = segments[0];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push({
        slug: meta.slug,
        title: meta.title,
        category: meta.category,
        order: meta.order ?? 99,
      });
    }
  }

  // Convert groups into parent NavItems with children
  const groupItems: NavItem[] = Object.entries(groups).map(
    ([key, children]) => ({
      slug: key,
      title: formatGroupTitle(key),
      order: getGroupOrder(key),
      children: children.sort((a, b) => a.order - b.order),
    })
  );

  // Merge root items and group items, sort by order
  return [...rootItems, ...groupItems].sort((a, b) => a.order - b.order);
}

function formatGroupTitle(key: string): string {
  const titles: Record<string, string> = {
    'protein-prediction': 'AI+蛋白质预测',
    experiments: '开源项目实验',
    'deep-dive': '深入理论分析',
  };
  return titles[key] || key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getGroupOrder(key: string): number {
  const orders: Record<string, number> = {
    'protein-prediction': 1,
    experiments: 80,
    'deep-dive': 90,
  };
  return orders[key] ?? 50;
}
