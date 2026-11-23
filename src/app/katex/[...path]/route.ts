import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

const KATEX_DIST = path.join(process.cwd(), 'node_modules', 'katex', 'dist');
const CONTENT_TYPES: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  if (!segments.length) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = path.resolve(KATEX_DIST, ...segments);
  const contentType = CONTENT_TYPES[path.extname(filePath)];
  if (!filePath.startsWith(`${KATEX_DIST}${path.sep}`) || !contentType) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const file = await readFile(filePath);
    return new Response(new Uint8Array(file), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
