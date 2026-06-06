import Link from 'next/link';
import { TrendingUp, Users, Target, ArrowRight, MapPin } from 'lucide-react';
import { listMockCampaigns } from '@/lib/mock-campaigns';
import { ProgressBar } from '@/components/campaign/progress-bar';

export default function DashboardPage() {
  const campaigns = listMockCampaigns();

  const totalRaised = campaigns.reduce((sum, c) => sum + c.total_raised, 0);
  const totalDonors = campaigns.reduce((sum, c) => sum + c.donors_count, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Panel de campañas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Seguimiento de recaudación, promotores e hitos
        </p>
      </div>

      {/* Summary metrics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: 'Total recaudado',
            value: `$${totalRaised.toLocaleString('es-AR')}`,
            icon: TrendingUp,
            color: 'text-primary',
          },
          {
            label: 'Donantes totales',
            value: totalDonors.toLocaleString('es-AR'),
            icon: Users,
            color: 'text-[color:var(--accent-blue)]',
          },
          {
            label: 'Campañas activas',
            value: activeCampaigns,
            icon: Target,
            color: 'text-[color:var(--terracotta)]',
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Campaign list */}
      <h2 className="mb-4 text-base font-semibold text-foreground">Campañas</h2>
      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const pct = Math.min(
            Math.round((campaign.total_raised / campaign.goal_amount) * 100),
            100
          );
          const validatedMilestones = campaign.milestones.filter(
            (m) => m.status === 'validated'
          ).length;

          return (
            <Link
              key={campaign.id}
              href={`/dashboard/campaigns/${campaign.id}`}
              className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                        campaign.status === 'active'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {campaign.status === 'active' ? 'Activa' : campaign.status}
                    </span>
                  </div>
                  {campaign.location && (
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {campaign.location}
                    </p>
                  )}
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              </div>

              <ProgressBar value={pct} className="mb-3" />

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="font-semibold text-foreground">
                  ${campaign.total_raised.toLocaleString('es-AR')}
                </span>
                <span className="text-muted-foreground">
                  de ${campaign.goal_amount.toLocaleString('es-AR')}
                </span>
                <span className="text-muted-foreground">{pct}%</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {campaign.donors_count} donantes ·{' '}
                  {validatedMilestones}/{campaign.milestones.length} hitos
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
