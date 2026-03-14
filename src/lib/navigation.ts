import { getAllContentMeta } from './mdx';
import type { ContentMeta, NavItem } from '@/types/mdx';

/**
 * Build a tree-shaped navigation structure from flat content metadata
 */
export function buildNavigationTree(): NavItem[] {
  const allMeta = getAllContentMeta().filter((m) => m.slug !== '');

  // Group by top-level category (first path segment or root)
  const rootItems: NavItem[] = [];
  const groups: Record<string, NavItem[]> = {};

  for (const meta of allMeta) {
    const segments = meta.slug.split('/');

    if (segments.length === 1) {
      // Top-level item
      rootItems.push({
        slug: meta.slug,
        title: meta.title,
        category: meta.category,
        order: meta.order ?? 99,
      });
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
    experiments: '开源项目实验',
    'deep-dive': '深入理论分析',
  };
  return titles[key] || key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getGroupOrder(key: string): number {
  const orders: Record<string, number> = {
    experiments: 80,
    'deep-dive': 90,
  };
  return orders[key] ?? 50;
}
