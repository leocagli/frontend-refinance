import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif font-semibold text-foreground">Refinance</span>
          </Link>
          <span className="text-xs text-muted-foreground">Panel de gestión</span>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
