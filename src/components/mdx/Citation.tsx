'use client';

import React from 'react';

interface CitationProps {
  id: string;
  references?: { id: string; text: string; url?: string }[];
}

export default function Citation({ id, references = [] }: CitationProps) {
  const ref = references.find((r) => r.id === id);
  const index = references.findIndex((r) => r.id === id) + 1;

  return (
    <sup className="inline-flex">
      <a
        href={ref?.url || `#ref-${id}`}
        target={ref?.url ? '_blank' : undefined}
        rel={ref?.url ? 'noopener noreferrer' : undefined}
        className="text-medical-cyan hover:text-medical-indigo transition-colors text-xs font-medium px-0.5"
        title={ref?.text}
      >
        [{index || id}]
      </a>
    </sup>
  );
}

interface ReferenceListProps {
  references: { id: string; text: string; url?: string }[];
}

export function ReferenceList({ references }: ReferenceListProps) {
  if (!references || references.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-bold mb-6" id="references">
        参考文献
      </h2>
      <ol className="space-y-3 list-none pl-0">
        {references.map((ref, index) => (
          <li key={ref.id} id={`ref-${ref.id}`} className="text-sm text-medical-slate leading-relaxed">
            <span className="text-medical-cyan font-medium mr-2">[{index + 1}]</span>
            {ref.text}
            {ref.url && (
              <>
                {' '}
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medical-indigo hover:underline break-all"
                >
                  {ref.url}
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
