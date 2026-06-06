import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Users, Calendar, MapPin } from 'lucide-react';
import { getMockCampaignBySlug } from '@/lib/mock-campaigns';
import { ProgressBar } from '@/components/campaign/progress-bar';
import { MilestonesList } from '@/components/campaign/milestones-list';
import { SharePanel } from '@/components/campaign/share-panel';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getMockCampaignBySlug(slug);
  return {
    title: campaign?.title ?? 'Campaña de donación',
    description: campaign?.description ?? '',
    openGraph: {
      title: campaign?.title,
      description: campaign?.description ?? '',
    },
  };
}

export default async function CampaignLanding({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { slug } = await params;
  const { ref } = await searchParams;
  const campaign = getMockCampaignBySlug(slug);

  if (!campaign) notFound();

  const pct = Math.min(
    Math.round((campaign.total_raised / campaign.goal_amount) * 100),
    100
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold text-primary">
            Halketon
          </Link>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {campaign.status === 'active' ? 'Activa' : campaign.status}
          </span>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--accent-blue)]">
            {campaign.cause}
          </p>
          <h1 className="mb-3 text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {campaign.title}
          </h1>
          <p className="leading-relaxed text-muted-foreground">{campaign.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {campaign.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {campaign.location}
              </span>
            )}
            {campaign.deadline && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Hasta {campaign.deadline}
              </span>
            )}
          </div>
        </header>

        {/* Progress card */}
        <section className="mb-6 rounded-2xl border border-border bg-card p-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Recaudado</span>
            <span className="font-medium text-foreground">{pct}% de la meta</span>
          </div>
          <ProgressBar value={pct} className="mb-4" />
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${campaign.total_raised.toLocaleString('es-AR')}
              </p>
              <p className="text-xs text-muted-foreground">
                de ${campaign.goal_amount.toLocaleString('es-AR')}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{campaign.donors_count} donantes</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <Link
          href={`/c/${slug}/donate${ref ? `?ref=${ref}` : ''}`}
          className="mb-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-center text-lg font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Heart className="h-5 w-5 fill-current" />
          Donar ahora
        </Link>

        {/* Impact */}
        {campaign.impact_per_amount && Object.keys(campaign.impact_per_amount).length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-foreground">Tu impacto</h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(campaign.impact_per_amount).map(([amount, impact]) => (
                <div key={amount} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-bold text-[color:var(--accent-blue)]">
                    ${parseInt(amount).toLocaleString('es-AR')}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{impact}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Milestones */}
        <section className="mb-8">
          <h2 className="mb-4 text-base font-semibold text-foreground">Hitos del proyecto</h2>
          <MilestonesList milestones={campaign.milestones ?? []} />
        </section>

        {/* Share */}
        <SharePanel
          campaignSlug={slug}
          campaignTitle={campaign.title}
          promoters={campaign.promoters ?? []}
          contentAssets={campaign.content_assets ?? []}
        />

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          <p>
            Contacto:{' '}
            <span className="text-foreground">{campaign.lead_contact}</span>
          </p>
          <p className="mt-1">Powered by Halketon — Donaciones con impacto verificable</p>
        </footer>
      </div>
    </main>
  );
}
