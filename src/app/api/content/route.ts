import { getAllContentMeta } from '@/lib/mdx';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    // Return full content for a specific article
    const filePath = path.join(process.cwd(), 'content', ...slug.split('/')) + '.mdx';
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return NextResponse.json({
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      tags: data.tags,
      references: data.references,
      content: content,
    });
  }

  // Return all content metadata
  const allMeta = getAllContentMeta();
  return NextResponse.json(allMeta);
}
