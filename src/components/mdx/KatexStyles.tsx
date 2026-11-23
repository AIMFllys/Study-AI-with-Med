export function KaTeXStyles() {
  // KaTeX is only needed on math pages; there is no CSS-module equivalent for conditional loading.
  // eslint-disable-next-line @next/next/no-css-tags
  return <link rel="stylesheet" href="/katex/katex.min.css" precedence="default" />;
}
