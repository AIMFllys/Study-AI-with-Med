import { getAllContentMeta } from './mdx';
import type { NavItem } from '@/types/mdx';

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
          // Directory Node (Group)
          existingNode = {
            slug: currentPath,
            title: formatGroupTitle(segment),
            order: getGroupOrder(segment),
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

function formatGroupTitle(key: string): string {
  const titles: Record<string, string> = {
    'ai-analysis': 'AI+X 多维分析',
    'ai-protein': 'AI+蛋白质预测',
    'ai-drug': 'AI+药物发现',
    'ai-llm': 'AI+医疗大模型',
    'ai-imaging': 'AI+精准影像',
    'ai-agent': 'AI+临床智能体',
    'ai-report': 'AI医疗报告论文',
    'tools': '工具与部署指南',
    knowledge: '知识点分析',
    notes: '个人笔记区',
    forum: '微论坛',
  };
  return titles[key] || key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getGroupOrder(key: string): number {
  const orders: Record<string, number> = {
    'ai-analysis': 1,
    'ai-protein': 1,
    'ai-drug': 2,
    'ai-llm': 3,
    'ai-imaging': 4,
    'ai-agent': 5,
    'ai-report': 6,
    'tools': 90, // Display tools category lower intuitively
    knowledge: 10,
    notes: 80,
    forum: 90,
  };
  return orders[key] ?? 50;
}
