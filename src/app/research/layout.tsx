import Sidebar from '@/components/layout/Sidebar';
import { buildNavigationTree } from '@/lib/navigation';

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = buildNavigationTree();

  return (
    <div className="max-w-[90rem] mx-auto flex">
      <Sidebar items={navItems} />
      {children}
    </div>
  );
}
