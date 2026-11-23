import { describe, expect, it } from 'vitest';
import { parseGitHubRepo } from './GitHubCard';

describe('parseGitHubRepo', () => {
  it.each([
    {
      repo: 'AI-in-Health/MedLLMsPracticalGuide',
      expected: { owner: 'AI-in-Health', name: 'MedLLMsPracticalGuide' },
    },
    {
      repo: 'openmedlab',
      expected: { name: 'openmedlab' },
    },
    {
      repo: 'openmedlab/',
      expected: { name: 'openmedlab' },
    },
  ])('parses $repo', ({ repo, expected }) => {
    expect(parseGitHubRepo(repo)).toEqual(expected);
  });
});
