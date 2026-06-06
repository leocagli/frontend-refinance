import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Users,
  Calendar,
  MapPin,
  ShieldCheck,
  Share2,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { getMockCampaignBySlug } from '@/lib/mock-campaigns';
import { ProgressBar } from '@/components/campaign/progress-bar';
import { MilestonesList } from '@/components/campaign/milestones-list';
import { SharePanel } from '@/components/campaign/share-panel';
import { ImageSliderHero } from '@/components/campaign/image-slider-hero';

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
      images: campaign?.og_image_url ? [campaign.og_image_url] : [],
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

  const images = campaign.images ?? (campaign.og_image_url ? [campaign.og_image_url] : []);

  const milestoneStatusLabels: Record<string, string> = {
    validated: 'Verificado',
    reached: 'Alcanzado',
    pending: 'Pendiente',
    completed: 'Completado',
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ── Sticky nav ── */}
      <nav className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-1.5">
            <Image
              src="/images/refinance-logo.png"
              alt="ReFinance"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            <span className="text-sm font-extrabold text-primary">Re<span className="text-foreground">Finance</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary sm:inline-block">
              Campaña activa
            </span>
            <Link
              href={`/c/${slug}/donate${ref ? `?ref=${ref}` : ''}`}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Heart className="h-3 w-3 fill-current" />
              Donar ahora
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO — full-bleed with image + dark overlay
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[92dvh] overflow-hidden">
        {/* Background image */}
        {images.length > 0 ? (
          <ImageSliderHero images={images} title={campaign.title} />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[92dvh] max-w-5xl flex-col justify-end px-4 pb-12 pt-20">
          <div className="max-w-2xl">
            {/* Cause tag */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--terracotta)' }}
              />
              {campaign.cause}
            </div>

            {/* Campaign title */}
            <h1 className="mb-4 text-balance text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
              {campaign.title}
            </h1>

            {/* Description */}
            <p className="mb-6 max-w-xl text-lg leading-relaxed text-white/85">
              {campaign.description}
            </p>

            {/* Location + deadline */}
            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
              {campaign.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {campaign.location}
                </span>
              )}
              {campaign.deadline && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Cierra el {campaign.deadline}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {campaign.donors_count} donantes
              </span>
            </div>

            {/* Progress block */}
            <div className="mb-8 rounded-2xl border border-white/20 bg-black/40 p-5 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between text-xs text-white/70">
                <span>Recaudado</span>
                <span className="font-bold text-white">{pct}% de la meta</span>
              </div>
              <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: 'var(--primary)',
                  }}
                />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-white">
                    ${campaign.total_raised.toLocaleString('es-AR')}
                  </p>
                  <p className="text-sm text-white/60">
                    de meta ${campaign.goal_amount.toLocaleString('es-AR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{campaign.donors_count}</p>
                  <p className="text-xs text-white/60">donantes</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/c/${slug}/donate${ref ? `?ref=${ref}` : ''}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 text-base font-black text-white shadow-lg transition-opacity hover:opacity-90 sm:flex-none sm:px-8"
                style={{ backgroundColor: 'var(--primary)', boxShadow: '0 4px 24px color-mix(in srgb, var(--primary) 40%, transparent)' }}
              >
                <Heart className="h-5 w-5 fill-current" />
                Donar ahora
              </Link>
              <button
                id="hero-share-btn"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex-none sm:px-8"
                onClick={undefined}
              >
                <Share2 className="h-5 w-5" />
                Compartir campaña
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST BAND
          ═══════════════════════════════════════════ */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                color: 'var(--primary)',
                title: 'Impacto verificable',
                desc: 'Fondos liberados por hito con evidencia pública — facturas, fotos y validación externa.',
              },
              {
                icon: Share2,
                color: 'var(--accent-blue)',
                title: 'Difusión lista para usar',
                desc: 'Mensajes por canal para WhatsApp, Instagram, LinkedIn y email. Un clic y ya compartís.',
              },
              {
                icon: BarChart3,
                color: 'var(--terracotta)',
                title: 'Aporte con contexto',
                desc: 'Cada monto tiene un impacto concreto: sabés exactamente qué cubre tu donación.',
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — two-column on large
          ═══════════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left column */}
          <div className="space-y-12">
            {/* Impact by amount */}
            {campaign.impact_per_amount &&
              Object.keys(campaign.impact_per_amount).length > 0 && (
                <section>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    Tu aporte
                  </p>
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    ¿Cuánto querés donar?
                  </h2>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {Object.entries(campaign.impact_per_amount).map(([amount, impact], i) => (
                      <Link
                        key={amount}
                        href={`/c/${slug}/donate?amount=${amount}${ref ? `&ref=${ref}` : ''}`}
                        className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
                      >
                        {/* Accent bar */}
                        <div
                          className="absolute left-0 top-0 h-full w-1 rounded-l-2xl transition-colors"
                          style={{
                            backgroundColor:
                              i % 2 === 0 ? 'var(--accent-blue)' : 'var(--terracotta)',
                          }}
                        />
                        <div className="pl-3">
                          <p
                            className="mb-1.5 text-2xl font-black"
                            style={{
                              color: i % 2 === 0 ? 'var(--accent-blue)' : 'var(--terracotta)',
                            }}
                          >
                            ${parseInt(amount).toLocaleString('es-AR')}
                          </p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {impact}
                          </p>
                          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                            Donar este monto
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

            {/* Milestones */}
            <section>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Trazabilidad
              </p>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Hitos del proyecto</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                El dinero se mueve por hitos verificados. Cada etapa requiere evidencia antes de liberar fondos.
              </p>
              <MilestonesList milestones={campaign.milestones ?? []} />
            </section>

            {/* Share panel — mobile/tablet */}
            <div className="lg:hidden">
              <SharePanel
                campaignSlug={slug}
                campaignTitle={campaign.title}
                promoters={campaign.promoters ?? []}
                contentAssets={campaign.content_assets ?? []}
              />
            </div>
          </div>

          {/* Right column (sticky on lg) */}
          <div className="space-y-5">
            {/* Progress card */}
            <div className="sticky top-20 space-y-5">
              <section className="rounded-2xl border border-border bg-card p-5">
                <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Recaudado</span>
                  <span className="font-semibold text-foreground">{pct}%</span>
                </div>
                <ProgressBar value={pct} className="mb-4" />
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black text-foreground">
                      ${campaign.total_raised.toLocaleString('es-AR')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      de ${campaign.goal_amount.toLocaleString('es-AR')}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p className="text-base font-bold text-foreground">{campaign.donors_count}</p>
                    donantes
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-2 border-t border-border pt-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Mínimo</p>
                    <p className="font-semibold text-foreground">
                      ${campaign.min_donation.toLocaleString('es-AR')}
                    </p>
                  </div>
                  {campaign.deadline && (
                    <div className="text-right">
                      <p className="text-muted-foreground">Cierre</p>
                      <p className="font-semibold text-foreground">{campaign.deadline}</p>
                    </div>
                  )}
                </div>

                <Link
                  href={`/c/${slug}/donate${ref ? `?ref=${ref}` : ''}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <Heart className="h-4 w-4 fill-current" />
                  Donar ahora
                </Link>

                {campaign.lead_contact && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                    Responsable:{' '}
                    <span className="font-medium text-foreground">{campaign.lead_contact}</span>
                  </div>
                )}

                {campaign.location && (
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    {campaign.location}
                  </div>
                )}
              </section>

              {/* Milestone status summary */}
              <section className="rounded-2xl border border-border bg-card p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Estado de hitos</h3>
                <div className="space-y-2">
                  {campaign.milestones?.slice(0, 3).map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-2 text-xs">
                      <span className="line-clamp-1 text-muted-foreground">{m.description}</span>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 font-medium ${
                          m.status === 'validated'
                            ? 'bg-primary/15 text-primary'
                            : m.status === 'reached'
                              ? 'bg-[color:var(--accent-blue)]/15 text-[color:var(--accent-blue)]'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {milestoneStatusLabels[m.status] ?? m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Share panel — desktop */}
              <div className="hidden lg:block">
                <SharePanel
                  campaignSlug={slug}
                  campaignTitle={campaign.title}
                  promoters={campaign.promoters ?? []}
                  contentAssets={campaign.content_assets ?? []}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          FINAL CTA SECTION
          ═══════════════════════════════════════════ */}
      <section className="border-t border-border">
        <div
          className="relative overflow-hidden py-20"
          style={{
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--accent-blue) 8%, transparent) 0%, transparent 50%, color-mix(in srgb, var(--terracotta) 8%, transparent) 100%)',
          }}
        >
          <div className="mx-auto max-w-2xl px-4 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              Sumarte importa
            </p>
            <h2 className="mb-4 text-3xl font-black text-foreground sm:text-4xl">
              Tu aporte cambia el barrio.
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Cada peso se mueve con trazabilidad. Sabés exactamente a dónde va y
              cuándo se libera. Sin letra chica.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/c/${slug}/donate${ref ? `?ref=${ref}` : ''}`}
                className="flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-black text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--primary)',
                  boxShadow: '0 4px 28px color-mix(in srgb, var(--primary) 35%, transparent)',
                }}
              >
                <Heart className="h-5 w-5 fill-current" />
                Donar ahora
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Mínimo sugerido:{' '}
              <span className="font-semibold text-foreground">
                ${campaign.min_donation.toLocaleString('es-AR')}
              </span>
              {campaign.deadline && (
                <>
                  {' '}· Campaña abierta hasta el{' '}
                  <span className="font-semibold text-foreground">{campaign.deadline}</span>
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-muted-foreground">
          <p>
            Contacto:{' '}
            <span className="font-medium text-foreground">{campaign.lead_contact}</span>
            {campaign.location && (
              <>
                {' '}· <span>{campaign.location}</span>
              </>
            )}
          </p>
          <p className="mt-1">Powered by <span className="font-serif font-semibold">ReFinance</span> — Donaciones con impacto verificable</p>
        </div>
      </footer>
    </main>
  );
}
