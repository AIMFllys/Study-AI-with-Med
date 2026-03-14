export interface ContentMeta {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  order?: number;
  tags?: string[];
  references?: Reference[];
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

export interface ContentData {
  meta: ContentMeta;
  headings: HeadingItem[];
  content: string; // raw MDX source
}

export interface NavItem {
  slug: string;
  title: string;
  category?: string;
  order: number;
  children?: NavItem[];
  disabled?: boolean;
}
