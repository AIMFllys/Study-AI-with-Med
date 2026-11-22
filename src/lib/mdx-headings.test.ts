import { describe, expect, it } from 'vitest';
import { getContentBySlug } from './mdx';

const affectedHeadings = [
  {
    slug: ['ai-analysis', 'ai-agent', 'industry-overview'],
    text: 'AI-HOPE / KGARevion',
    id: 'ai-hope--kgarevion',
  },
  {
    slug: ['ai-analysis', 'ai-drug', 'intro'],
    text: '4.2 强化学习 + 生成模型',
    id: '42-强化学习--生成模型',
  },
  {
    slug: ['ai-analysis', 'ai-imaging', 'intro'],
    text: '6.2 数字孪生 + 流体力学仿真',
    id: '62-数字孪生--流体力学仿真',
  },
  {
    slug: ['ai-analysis', 'ai-llm', 'industry-overview'],
    text: '核心亮点：RAG + 医疗知识图谱增强',
    id: '核心亮点rag--医疗知识图谱增强',
  },
  {
    slug: ['ai-analysis', 'ai-llm', 'intro'],
    text: '路线一：医疗语料预训练 + 医疗微调',
    id: '路线一医疗语料预训练--医疗微调',
  },
  {
    slug: ['ai-analysis', 'ai-protein', 'intro'],
    text: 'Boltz-1 / Boltz-2：AlphaFold 3 的完全开源平替',
    id: 'boltz-1--boltz-2alphafold-3-的完全开源平替',
  },
] as const;

describe('extractHeadings', () => {
  it.each(affectedHeadings)('matches the rendered heading id for $text', ({ slug, text, id }) => {
    const { headings } = getContentBySlug([...slug]);

    expect(headings).toContainEqual({ id, text, level: 3 });
  });
});
