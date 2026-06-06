import Link from 'next/link';
import { Heart, ShieldCheck, Share2, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { listMockCampaigns } from '@/lib/mock-campaigns';
import { CampaignCarousel } from '@/components/campaign/campaign-carousel';

export default function HomePage() {
  const campaigns = listMockCampaigns().filter((c) => c.status === 'active');

  return (
    <main className="min-h-screen bg-background">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-4 w-4 fill-current text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">En Masa Social</span>
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Panel ONG
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, var(--accent-blue) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--terracotta) 0%, transparent 40%)',
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Donaciones con impacto verificable
            </div>

            {/* Headline */}
            <h1 className="mb-5 text-balance text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Cada peso,{' '}
              <span
                className="italic"
                style={{ color: 'var(--terracotta)' }}
              >
                trazable.
              </span>
              <br />
              Cada hito,{' '}
              <span style={{ color: 'var(--accent-blue)' }}>verificado.</span>
            </h1>

            {/* Sub */}
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
              En Masa Social conecta donantes con causas comunitarias reales. Cada campaña
              libera fondos por hitos verificados con evidencia pública — no hay caja negra.
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/c/comedor-esperanza"
                className="flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
              >
                <Heart className="h-4 w-4 fill-current" />
                Ver campaña activa
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Soy una ONG
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Social proof */}
            <p className="mt-8 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">+250 donantes</span> ya apoyaron
              campañas en{' '}
              <span className="font-semibold text-foreground">Rosario y CABA</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust band ── */}
      <section className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                color: 'var(--primary)',
                title: 'Impacto verificable',
                desc: 'Cada hito requiere evidencia pública — facturas, fotos y reportes — antes de liberar fondos.',
              },
              {
                icon: Share2,
                color: 'var(--accent-blue)',
                title: 'Difusión lista para usar',
                desc: 'Mensajes optimizados por canal para WhatsApp, Instagram, LinkedIn y email. Compartís en segundos.',
              },
              {
                icon: BarChart3,
                color: 'var(--terracotta)',
                title: 'Aporte con contexto',
                desc: 'Cada monto tiene un impacto concreto asignado. Sabés exactamente qué cubre tu donación.',
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
                >
                  <Icon className="h-4.5 w-4.5" style={{ color }} />
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

      {/* ── How it works ── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Proceso
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              ¿Cómo funciona?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Llegás por un link',
                desc: 'Alguien de tu red compartió una campaña. Hacés click y llegás a la landing.',
              },
              {
                step: '02',
                title: 'Entendés la causa',
                desc: 'Ves el progreso, el impacto por monto y los hitos verificados en segundos.',
              },
              {
                step: '03',
                title: 'Donás o compartís',
                desc: 'Elegís un monto, donás, y recibís un link personalizado para difundir.',
              },
              {
                step: '04',
                title: 'Seguís el impacto',
                desc: 'Cada hito se publica con evidencia. Tu donación tiene trazabilidad real.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="rounded-xl border border-border bg-card p-5">
                <div
                  className="mb-3 inline-block text-3xl font-black leading-none tracking-tighter"
                  style={{ color: 'var(--accent-blue)', opacity: 0.3 }}
                >
                  {step}
                </div>
                <h3 className="mb-1.5 font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Campaign carousel ── */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Proyectos activos
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Campañas que necesitan tu apoyo
            </h2>
          </div>
          <Link
            href="/dashboard"
            className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            Panel ONG
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <CampaignCarousel campaigns={campaigns} />
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
            Sumate
          </p>
          <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
            ¿Sos una ONG con causas reales?
          </h2>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            Publicá tu campaña con hitos verificables, activá el kit viral y
            recibí donaciones con trazabilidad completa desde el día uno.
          </p>

          <div className="mb-6 flex flex-col items-center gap-2 text-sm text-muted-foreground">
            {[
              'Sin comisiones ocultas',
              'Liberación de fondos por hitos verificados',
              'Kit viral listo para WhatsApp e Instagram',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </span>
            ))}
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
          >
            Quiero publicar mi campaña
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">En Masa Social</span> — Donaciones con
          impacto verificable · Rosario & CABA, Argentina
        </div>
      </footer>
    </main>
  );
}
