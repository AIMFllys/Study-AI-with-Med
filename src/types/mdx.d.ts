export interface HomeChapterMeta {
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
}

export interface HomeOverviewMeta {
  icon: string;
  title: string;
  highlight: string;
  stat: string;
  detail: string;
}

export interface HomeMeta {
  order?: number;
  chapter?: HomeChapterMeta;
  overview?: HomeOverviewMeta;
}

export interface ContentMeta {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  order?: number;
  tags?: string[];
  references?: Reference[];
  home?: HomeMeta;
}

export interface Reference {
  id: string;
  text: string;
  url?: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface NavItem {
  slug: string;
  title: string;
  category?: string;
  order: number;
  children?: NavItem[];
  disabled?: boolean;
}

