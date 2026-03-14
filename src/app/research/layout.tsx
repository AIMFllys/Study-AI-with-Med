import Sidebar, { MobileSidebarChips } from '@/components/layout/Sidebar';
import { buildNavigationTree } from '@/lib/navigation';

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = buildNavigationTree();

  return (
    <div className="max-w-[90rem] mx-auto">
      {/* Mobile: horizontal chips (below top nav) */}
      <MobileSidebarChips items={navItems} />
      {/* Desktop: flex layout with sidebar + content */}
      <div className="flex">
        <Sidebar items={navItems} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
