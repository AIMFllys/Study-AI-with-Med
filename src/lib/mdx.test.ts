import { describe, expect, it } from 'vitest';
import { compileMDX } from 'next-mdx-remote/rsc';
import { renderToStaticMarkup } from 'react-dom/server';
import { hasMathSyntax, sharedMdxOptions } from './mdx';

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

describe('hasMathSyntax', () => {
  it('detects inline and display math outside code', () => {
    expect(hasMathSyntax('公式 $E=mc^2$ 很重要')).toBe(true);
    expect(hasMathSyntax('$ x $')).toBe(true);
    expect(hasMathSyntax('multiline $a\nb$ end')).toBe(true);
    expect(hasMathSyntax('$$\nx^2\n$$')).toBe(true);
  });

  it('detects math inside JSX', () => {
    expect(hasMathSyntax('<div>$x^2$</div>')).toBe(true);
    expect(hasMathSyntax('<section>\n\n$x^2$\n\n</section>')).toBe(true);
  });

  it('detects math fenced code', () => {
    expect(hasMathSyntax('```math\nx^2\n```')).toBe(true);
    expect(hasMathSyntax('~~~math\nx^2\n~~~')).toBe(true);
  });

  it('ignores dollar signs inside code fences and inline code', () => {
    expect(hasMathSyntax('```powershell\n$ErrorActionPreference = "Stop"\n```')).toBe(false);
    expect(hasMathSyntax('```powershell\n$x = 1\n```')).toBe(false);
    expect(hasMathSyntax('使用 `$variable` 表示变量')).toBe(false);
  });
});
