import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { ReFinanceLogo } from '@/components/refinance-logo';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          <Link href="/dashboard">
            <ReFinanceLogo size={26} />
          </Link>
          <span className="text-xs text-muted-foreground">Panel de gestión</span>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
