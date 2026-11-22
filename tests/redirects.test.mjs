import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(repoRoot, 'package.json'));

function loadNextConfig() {
  const configPath = path.join(repoRoot, 'next.config.ts');
  const source = fs.readFileSync(configPath, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: configPath,
  });

  const moduleShim = { exports: {} };
  vm.runInNewContext(
    outputText,
    {
      module: moduleShim,
      exports: moduleShim.exports,
      require,
      __filename: configPath,
      __dirname: repoRoot,
      console,
    },
    { filename: configPath }
  );

  return moduleShim.exports.default ?? moduleShim.exports;
}

function destinationFor(redirects, pathname) {
  for (const redirect of redirects) {
    if (redirect.source === pathname) {
      return redirect.destination;
    }

    const wildcardSuffix = '/:path*';
    if (redirect.source.endsWith(wildcardSuffix)) {
      const prefix = redirect.source.slice(0, -wildcardSuffix.length);
      if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
        const pathParam = pathname.slice(prefix.length).replace(/^\//, '');
        return redirect.destination.replace(':path*', pathParam);
      }
    }
  }

  return null;
}

function contentPathForResearchPath(pathname) {
  assert.ok(pathname.startsWith('/research/'), `expected a research path: ${pathname}`);
  const slug = pathname.slice('/research/'.length).replace(/\/$/, '');
  return path.join(repoRoot, 'content', `${slug}.mdx`);
}

test('legacy research redirects resolve to existing content', async () => {
  const config = loadNextConfig();
  const redirects = await config.redirects();

  const cases = [
    ['/research/ai-drug-discovery', '/research/ai-analysis/ai-drug/intro'],
    ['/research/medical-llms', '/research/ai-analysis/ai-llm/intro'],
    ['/research/medical-imaging', '/research/ai-analysis/ai-imaging/intro'],
    ['/research/agentic-ai-clinical', '/research/ai-analysis/ai-agent/intro'],
    ['/research/protein-engineering', '/research/ai-analysis/ai-protein/intro'],
    [
      '/research/protein-prediction/industry-overview',
      '/research/ai-analysis/ai-protein/industry-overview',
    ],
    [
      '/research/protein-prediction/boltz-deployment-guide',
      '/research/ai-analysis/ai-protein/tools/boltz-deployment-guide',
    ],
  ];

  for (const [source, expectedDestination] of cases) {
    const destination = destinationFor(redirects, source);
    assert.equal(destination, expectedDestination, `wrong destination for ${source}`);
    assert.ok(
      fs.existsSync(contentPathForResearchPath(destination)),
      `redirect destination has no content file: ${destination}`
    );
  }
});
