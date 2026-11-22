import { getAllContentMeta, getNavGroups } from './mdx';
import type { NavGroupConfig, NavItem } from '@/types/mdx';

/**
 * Slugs that are hidden from sidebar navigation (superseded by group structure).
 */
const HIDDEN_SLUGS = new Set<string>([]);

/**
 * Build a dynamic, recursive tree-shaped navigation structure from flat content metadata.
 * Supports N-level deep directories.
 */
export function buildNavigationTree(): NavItem[] {
  const allMeta = getAllContentMeta().filter(
    (m) => m.slug !== '' && !HIDDEN_SLUGS.has(m.slug)
  );
  const groups = getNavGroups();

  const rootItems: NavItem[] = [];

  for (const meta of allMeta) {
    const segments = meta.slug.split('/');
    let currentLevel = rootItems;
    let currentPath = '';

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;
      const isLeaf = i === segments.length - 1;

      let existingNode = currentLevel.find((node) => node.slug === currentPath);

      if (!existingNode) {
        if (isLeaf) {
          // File Node
          existingNode = {
            slug: meta.slug,
            title: meta.title,
            category: meta.category,
            order: meta.order ?? 99,
          };
        } else {
          // Directory Node (Group): title and order come from content frontmatter
          existingNode = {
            slug: currentPath,
            title: resolveGroupTitle(segment, groups),
            order: resolveGroupOrder(segment, groups),
            children: [],
          };
        }
        currentLevel.push(existingNode);
      }

      if (existingNode.children) {
        currentLevel = existingNode.children;
      }
    }
  }

  // Recursively sort the tree by order
  const sortTree = (items: NavItem[]) => {
    items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    for (const item of items) {
      if (item.children) {
        sortTree(item.children);
      }
    }
  };

  sortTree(rootItems);
  return rootItems;
}

/**
 * Group titles and order are data-driven: declared per directory segment in the
 * `groups` frontmatter of content/index.mdx. The fallbacks below only apply to a
 * directory that has no frontmatter entry yet.
 */
function resolveGroupTitle(segment: string, groups: Record<string, NavGroupConfig>): string {
  return groups[segment]?.title ?? formatGroupTitle(segment);
}

function resolveGroupOrder(segment: string, groups: Record<string, NavGroupConfig>): number {
  return groups[segment]?.order ?? 50;
}

function formatGroupTitle(key: string): string {
  return key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
