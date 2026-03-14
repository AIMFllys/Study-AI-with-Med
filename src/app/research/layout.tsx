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
      {/* Mobile: horizontal chips below top nav */}
      <MobileSidebarChips items={navItems} />
      {/* Main content area: sidebar + content flex */}
      <div className="flex">
        <Sidebar items={navItems} />
        {/* Inner flex: article + right TOC sit side by side on desktop */}
        <div className="flex-1 min-w-0 flex flex-col lg:flex-row">
          {children}
        </div>
      </div>
    </div>
  );
}
