import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, TrendingUp, Users, Target, MousePointerClick } from 'lucide-react';
import { getMockCampaignById } from '@/lib/mock-campaigns';
import { ProgressBar } from '@/components/campaign/progress-bar';
import { MilestonesList } from '@/components/campaign/milestones-list';
import { Badge } from '@/components/ui/badge';
import type { CampaignPromoter } from '@/types/campaign';

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = getMockCampaignById(id);

  if (!campaign) notFound();

  const pct = Math.min(
    Math.round((campaign.total_raised / campaign.goal_amount) * 100),
    100
  );

  const promotersSorted = [...campaign.promoters].sort(
    (a, b) => b.total_raised - a.total_raised
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      {/* Back */}
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Todas las campañas
      </Link>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">{campaign.title}</h1>
            <Badge
              variant="outline"
              className={
                campaign.status === 'active'
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground'
              }
            >
              {campaign.status === 'active' ? 'Activa' : campaign.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {campaign.cause} · {campaign.location}
          </p>
        </div>
        <Link
          href={`/c/${campaign.slug}`}
          target="_blank"
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          Ver landing
        </Link>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: 'Recaudado',
            value: `$${campaign.total_raised.toLocaleString('es-AR')}`,
            icon: TrendingUp,
            color: 'text-primary',
          },
          {
            label: 'Donantes',
            value: campaign.donors_count,
            icon: Users,
            color: 'text-[color:var(--accent-blue)]',
          },
          {
            label: 'Avance',
            value: `${pct}%`,
            icon: Target,
            color: 'text-[color:var(--terracotta)]',
          },
          {
            label: 'Promotores',
            value: campaign.promoters.length,
            icon: MousePointerClick,
            color: 'text-foreground',
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{label}</p>
              <Icon className={`h-3.5 w-3.5 ${color}`} />
            </div>
            <p className={`mt-1.5 text-xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>Meta: ${campaign.goal_amount.toLocaleString('es-AR')}</span>
          <span>
            {campaign.deadline ? `Hasta ${campaign.deadline}` : 'Sin fecha límite'}
          </span>
        </div>
        <ProgressBar value={pct} />
      </div>

      {/* Promoters ranking */}
      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-foreground">
          Ranking de promotores
        </h2>
        <div className="space-y-3">
          {promotersSorted.map((p: CampaignPromoter, idx: number) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-bold text-muted-foreground">
                {idx + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {'?ref='}{p.referral_code} ·{' '}
                  <span className="capitalize">
                    {p.type === 'volunteer'
                      ? 'Voluntario'
                      : p.type === 'partner'
                      ? 'Aliado'
                      : 'Staff'}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  ${p.total_raised.toLocaleString('es-AR')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {p.donations} don. · {p.clicks} clicks
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-foreground">
          Hitos y liberación de fondos
        </h2>
        <MilestonesList milestones={campaign.milestones} />
      </section>

      {/* Content assets summary */}
      <section>
        <h2 className="mb-3 text-base font-semibold text-foreground">Kit viral</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {campaign.content_assets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--accent-blue)]">
                  {asset.channel}
                </span>
                {asset.version && (
                  <span className="text-xs text-muted-foreground">v{asset.version}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{asset.audience}</p>
              <p className="mt-2 line-clamp-3 text-sm text-foreground">{asset.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
