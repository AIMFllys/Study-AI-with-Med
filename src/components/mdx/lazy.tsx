'use client';

import dynamic from 'next/dynamic';
import type { ComponentPropsWithoutRef } from 'react';

const MermaidChart = dynamic(() => import('./MermaidChart'));
const PythonRunner = dynamic(() => import('./PythonRunner'));
const CodeBlockWrapper = dynamic(() => import('./CodeBlockWrapper'));

export { MermaidChart, PythonRunner };

type FigureProps = ComponentPropsWithoutRef<'figure'> & {
  'data-rehype-pretty-code-figure'?: string;
  'data-language'?: string;
  'data-title'?: string;
};

export function CodeFigure(props: FigureProps) {
  if (props['data-rehype-pretty-code-figure'] !== undefined) {
    return (
      <CodeBlockWrapper
        data-language={props['data-language']}
        data-title={props['data-title']}
      >
        <figure {...props} />
      </CodeBlockWrapper>
    );
  }
  return <figure {...props} />;
}
