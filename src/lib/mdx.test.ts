import { describe, expect, it } from 'vitest';
import { compileMDX } from 'next-mdx-remote/rsc';
import { renderToStaticMarkup } from 'react-dom/server';
import { sharedMdxOptions } from './mdx';

async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    options: { mdxOptions: sharedMdxOptions },
  });
  return renderToStaticMarkup(content);
}

describe('shared MDX options', () => {
  it('renders bold text ending in full-width punctuation before CJK text', async () => {
    const html = await renderMdx('与**施维雅（Servier）**签订高达 **8.88 亿美元**的合作协议');

    expect(html).toContain('<strong>施维雅（Servier）</strong>签订');
    expect(html).toContain('<strong>8.88 亿美元</strong>');
    expect(html).not.toContain('**');
  });

  it('keeps adjacent bold spans separated around CJK text', async () => {
    const html = await renderMdx('本平台是**羽升（YuSheng）**在探索 AI 赋能医学方向过程中的**学习研究日志**。');

    expect(html).toContain('<strong>羽升（YuSheng）</strong>在探索');
    expect(html).toContain('<strong>学习研究日志</strong>。');
    expect(html).not.toContain('**');
  });
});
