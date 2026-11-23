import { getAllContentMeta } from './mdx';
import type { ContentMeta } from '@/types/mdx';

export interface HomeChapter {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  slug: string;
  hasContent: boolean;
  tags: string[];
  href: string;
}

export interface HomeOverviewItem {
  icon: string;
  title: string;
  highlight: string;
  stat: string;
  detail: string;
  slug: string;
  disabled: boolean;
}

export interface HomeResearchContent {
  chapters: HomeChapter[];
  overviewItems: HomeOverviewItem[];
  directionCount: number;
}

const INTRO_SLUG_PATTERN = /^ai-analysis\/[^/]+\/intro$/;
const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

function toRomanNumeral(index: number): string {
  return ROMAN_NUMERALS[index] ?? String(index + 1);
}

function fallbackTags(meta: ContentMeta): string[] {
  return (meta.tags ?? []).filter((tag) => tag !== '入门讲义').slice(0, 3);
}

function toHomeChapter(meta: ContentMeta, index: number): HomeChapter {
  const homeChapter = meta.home?.chapter;

  return {
    number: toRomanNumeral(index),
    title: homeChapter?.title ?? meta.category ?? meta.title,
    subtitle: homeChapter?.subtitle ?? '研究方向',
    desc: homeChapter?.description ?? meta.description ?? '',
    slug: meta.slug,
    hasContent: true,
    tags: homeChapter?.tags ?? fallbackTags(meta),
    href: `/research/${meta.slug}`,
  };
}

function toHomeOverviewItem(meta: ContentMeta): HomeOverviewItem {
  const homeOverview = meta.home?.overview;

  return {
    icon: homeOverview?.icon ?? '🔬',
    title: homeOverview?.title ?? meta.category ?? meta.title,
    highlight: homeOverview?.highlight ?? meta.tags?.[0] ?? meta.category ?? '',
    stat: homeOverview?.stat ?? '研究方向',
    detail: homeOverview?.detail ?? meta.description ?? '',
    slug: meta.slug,
    disabled: false,
  };
}

/**
 * Build the home page's research directions from ai-analysis/<direction>/intro.mdx metadata.
 * The `home` frontmatter block carries the polished landing-page copy; fields fall
 * back to ordinary content metadata so newly added directions still render.
 */
export function getHomeResearchContent(): HomeResearchContent {
  const directions = getAllContentMeta()
    .filter((meta) => INTRO_SLUG_PATTERN.test(meta.slug))
    .sort((a, b) => {
      const orderDiff = (a.home?.order ?? 50) - (b.home?.order ?? 50);
      return orderDiff !== 0 ? orderDiff : a.slug.localeCompare(b.slug);
    });

  return {
    chapters: directions.map(toHomeChapter),
    overviewItems: directions.map(toHomeOverviewItem),
    directionCount: directions.length,
  };
}
