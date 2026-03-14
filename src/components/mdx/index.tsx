import Callout from './Callout';
import MermaidChart from './MermaidChart';
import PythonRunner from './PythonRunner';
import Citation, { ReferenceList } from './Citation';
import GitHubCard from './GitHubCard';
import DataTable from './DataTable';
import InteractiveHTML from './InteractiveHTML';
import CodeBlockWrapper from './CodeBlockWrapper';
import type { MDXComponents } from 'mdx/types';

export function getMdxComponents(references?: { id: string; text: string; url?: string }[]): MDXComponents {
  return {
    // Override default HTML elements for styling
    h1: (props) => <h1 className="text-4xl md:text-5xl font-extrabold mt-12 mb-8 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent tracking-tight" {...props} />,
    h2: (props) => (
      <h2 className="text-2xl font-bold mt-16 mb-6 text-[var(--text-primary)] scroll-mt-24 border-b border-white/5 pb-2 flex items-center relative group" {...props}>
        <div className="absolute -left-5 opacity-0 group-hover:opacity-100 text-medical-indigo/50 transition-opacity">#</div>
        {props.children}
      </h2>
    ),
    h3: (props) => <h3 className="text-xl font-bold mt-10 mb-4 text-[var(--text-primary)] scroll-mt-24 tracking-wide text-medical-cyan/90" {...props} />,
    p: (props) => <p className="text-[15.5px] text-[var(--text-secondary)] leading-[1.8] mb-6 font-normal tracking-[0.01em]" {...props} />,
    ul: (props) => <ul className="text-[15.5px] text-[var(--text-secondary)] leading-[1.8] mb-6 list-none pl-2 space-y-2 [&>li]:relative [&>li]:pl-6 before:[&>li]:absolute before:[&>li]:left-0 before:[&>li]:top-[10px] before:[&>li]:w-1.5 before:[&>li]:h-1.5 before:[&>li]:bg-medical-indigo/70 before:[&>li]:rounded-full" {...props} />,
    ol: (props) => <ol className="text-[15.5px] text-[var(--text-secondary)] leading-[1.8] mb-6 list-decimal pl-6 space-y-2 marker:text-medical-cyan/70 marker:font-bold" {...props} />,
    li: (props) => <li className="" {...props} />,
    a: (props) => <a className="text-medical-cyan hover:text-medical-indigo hover:bg-medical-indigo/10 px-0.5 rounded transition-all underline decoration-medical-cyan/30 underline-offset-4" target="_blank" rel="noopener noreferrer" {...props} />,
    blockquote: (props) => (
      <blockquote className="relative border-l-4 border-medical-indigo bg-gradient-to-r from-medical-indigo/10 to-transparent p-5 my-8 rounded-r-2xl" {...props}>
        <div className="absolute top-2 left-4 text-4xl text-medical-indigo/20 font-serif">"</div>
        <div className="relative z-10 text-[15.5px] text-[var(--text-secondary)] italic leading-[1.8]">{props.children}</div>
      </blockquote>
    ),
    strong: (props) => <strong className="text-[var(--text-primary)] font-bold bg-white/5 px-1 rounded" {...props} />,
    table: (props) => (
      <div className="my-6 overflow-x-auto glass-card">
        <table className="w-full text-sm" {...props} />
      </div>
    ),
    thead: (props) => <thead className="border-b border-white/10 bg-white/5" {...props} />,
    th: (props) => <th className="px-4 py-3 text-left font-semibold text-foreground" {...props} />,
    td: (props) => <td className="px-4 py-3 text-medical-slate border-t border-white/5" {...props} />,
    hr: () => <hr className="my-8 border-white/10" />,

    // Wrap code figures with our enhanced CodeBlockWrapper
    figure: (props: any) => {
      // Only wrap rehype-pretty-code figures
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
    },

    // Custom MDX components
    Callout,
    MermaidChart,
    PythonRunner,
    Citation: (props: { id: string }) => <Citation {...props} references={references} />,
    ReferenceList: () => <ReferenceList references={references || []} />,
    GitHubCard,
    DataTable,
    InteractiveHTML,
  } as MDXComponents;
}
