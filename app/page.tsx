import Link from 'next/link';
import { Heart, BarChart3, Share2, ShieldCheck, ArrowRight } from 'lucide-react';
import { listMockCampaigns } from '@/lib/mock-campaigns';
import { ProgressBar } from '@/components/campaign/progress-bar';

export default function HomePage() {
  const campaigns = listMockCampaigns().filter((c) => c.status === 'active');

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-4 w-4 fill-current text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Halketon</span>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Panel ONG
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
          Donaciones con impacto verificable
        </p>
        <h1 className="mb-4 text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Cada peso, trazable.
          <br />
          Cada hito, verificado.
        </h1>
        <p className="mx-auto mb-10 max-w-xl leading-relaxed text-muted-foreground">
          Halketon conecta donantes con causas reales a través de hitos verificables,
          un kit viral para WhatsApp e Instagram, y transparencia total.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'Hitos verificables',
              desc: 'Cada desembolso requiere evidencia pública antes de liberar fondos.',
            },
            {
              icon: Share2,
              title: 'Kit viral',
              desc: 'Mensajes listos para WhatsApp, Instagram, LinkedIn y email.',
            },
            {
              icon: BarChart3,
              title: 'Dashboard ONG',
              desc: 'Seguimiento de recaudación, promotores y ranking en tiempo real.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 text-left">
              <Icon className="mb-3 h-5 w-5 text-primary" />
              <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Campaign list */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Campañas activas</h2>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Panel ONG <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {campaigns.map((campaign) => {
            const pct = Math.min(
              Math.round((campaign.total_raised / campaign.goal_amount) * 100),
              100
            );
            return (
              <Link
                key={campaign.id}
                href={`/c/${campaign.slug}`}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--accent-blue)]">
                  {campaign.cause}
                </p>
                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary">
                  {campaign.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {campaign.description}
                </p>

                <ProgressBar value={pct} className="mb-3" />

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-semibold text-foreground">
                      ${campaign.total_raised.toLocaleString('es-AR')}
                    </span>
                    <span className="text-muted-foreground">
                      {' '}/ ${campaign.goal_amount.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {campaign.donors_count} donantes
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Donar ahora
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
