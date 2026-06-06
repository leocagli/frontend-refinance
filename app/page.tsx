import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Share2,
  BarChart3,
  MapPin,
  Users,
} from 'lucide-react';
import { listMockCampaigns } from '@/lib/mock-campaigns';
import { ProgressBar } from '@/components/campaign/progress-bar';
import { CampaignCarousel } from '@/components/campaign/campaign-carousel';

export default function HomePage() {
  const campaigns = listMockCampaigns().filter((c) => c.status === 'active');

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-4 w-4 fill-current text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              Refinance
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-8 md:flex">
            {[
              { label: 'Misión', href: '#mission' },
              { label: 'Cómo funciona', href: '#features' },
              { label: 'Tecnología', href: '#tecnologia' },
              { label: 'Campañas', href: '#campaigns' },
              { label: 'FAQ', href: '#faq' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Panel ONG
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/comedor-hero.png"
            alt="Comedor comunitario"
            fill
            className="object-cover"
            priority
          />
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/80" />
        </div>

        {/* Giant wordmark — Homie signature move */}
        <div className="absolute inset-x-0 bottom-0 overflow-hidden select-none" aria-hidden>
          <p
            className="font-serif font-black leading-none tracking-tighter text-foreground/[0.07]"
            style={{ fontSize: 'clamp(80px, 20vw, 260px)', whiteSpace: 'nowrap' }}
          >
            REFINANCE
          </p>
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-start justify-center px-6 pt-32 pb-40">
          {/* Eyebrow pill */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Donaciones con impacto verificable
          </span>

          {/* Headline — Homie uses massive serif */}
          <h1
            className="mb-6 font-serif font-black leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: 'clamp(42px, 7vw, 88px)' }}
          >
            Cada peso,
            <br />
            <span style={{ color: 'var(--terracotta)' }}>trazable.</span>
            <br />
            Cada hito,
            <br />
            <span style={{ color: 'var(--accent-blue)' }}>verificado.</span>
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-foreground/70">
            Refinance conecta donantes con causas comunitarias reales. Cada campaña libera
            fondos por hitos verificados con evidencia pública — sin caja negra.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/c/comedor-esperanza"
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-opacity hover:opacity-90"
            >
              <Heart className="h-4 w-4 fill-current" />
              Ver campaña activa
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-8 py-3.5 text-base font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              Soy una ONG
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-foreground/60">
            <span className="font-semibold text-foreground">+250 donantes</span> ya apoyaron
            campañas en{' '}
            <span className="font-semibold text-foreground">Rosario y CABA</span>
          </p>
        </div>
      </section>

      {/* ── Mission — dark card, Homie style ── */}
      <section id="mission" className="relative scroll-mt-20 overflow-hidden py-4">
        {/* Section watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
          <p
            className="font-serif font-black uppercase tracking-tighter text-foreground/[0.04]"
            style={{ fontSize: 'clamp(60px, 15vw, 200px)', whiteSpace: 'nowrap' }}
          >
            MISIÓN
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Mission card — dark, Homie style */}
            <div className="rounded-3xl bg-foreground p-10 text-background">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-background/50">
                Nuestra misión
              </p>
              <h2 className="mb-5 font-serif text-3xl font-bold leading-tight text-background lg:text-4xl">
                Simplificar la donación con responsabilidad real
              </h2>
              <p className="mb-4 leading-relaxed text-background/70">
                En Refinance creemos que donar debe ser tan fácil como pagar un café — y tan
                transparente como una factura. Conectamos ONGs con sus comunidades sin
                intermediarios opacos.
              </p>
              <p className="leading-relaxed text-background/70">
                Cada transacción es segura, cada hito verificado con evidencia, y cada donante
                recibe trazabilidad completa de su aporte.
              </p>
            </div>

            {/* Stats / pillars */}
            <div className="flex flex-col gap-4">
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
                  title: 'Kit viral listo para usar',
                  desc: 'Mensajes optimizados por canal para WhatsApp, Instagram y LinkedIn. Compartís en segundos.',
                },
                {
                  icon: BarChart3,
                  color: 'var(--terracotta)',
                  title: 'Aporte con contexto',
                  desc: 'Cada monto tiene un impacto concreto asignado. Sabés exactamente qué cubre tu donación.',
                },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6"
                >
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works — Homie features section ── */}
      <section id="features" className="relative scroll-mt-20 overflow-hidden border-t border-border py-4">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
          <p
            className="font-serif font-black uppercase tracking-tighter text-foreground/[0.04]"
            style={{ fontSize: 'clamp(60px, 15vw, 200px)', whiteSpace: 'nowrap' }}
          >
            PROCESO
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
              Cómo funciona
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              De la causa al impacto, en 4 pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                icon: '🔗',
                title: 'Llegás por un link',
                desc: 'Alguien de tu red compartió una campaña. Un click y estás en la landing.',
              },
              {
                step: '02',
                icon: '📋',
                title: 'Entendés la causa',
                desc: 'Ves el progreso, el impacto por monto y los hitos verificados.',
              },
              {
                step: '03',
                icon: '💚',
                title: 'Donás',
                desc: 'Elegís un monto, donás, y recibís un link personal para difundir.',
              },
              {
                step: '04',
                icon: '✅',
                title: 'Seguís el impacto',
                desc: 'Cada hito se publica con evidencia. Tu aporte tiene trazabilidad real.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div
                  className="absolute -right-3 -top-4 font-serif font-black leading-none text-foreground/[0.06] select-none"
                  style={{ fontSize: '6rem' }}
                  aria-hidden
                >
                  {step}
                </div>
                <p className="mb-3 font-serif text-4xl font-black text-primary/20">{step}</p>
                <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology integrations ── */}
      <section id="tecnologia" className="relative scroll-mt-20 overflow-hidden border-t border-border">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
          <p
            className="font-serif font-black uppercase tracking-tighter text-foreground/[0.035]"
            style={{ fontSize: 'clamp(60px, 15vw, 200px)', whiteSpace: 'nowrap' }}
          >
            TECNOLOGÍA
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
              Infraestructura
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Tres tecnologías que lo hacen posible
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Refinance no es solo una plataforma de donaciones. Integra generación de contenido
              con IA, distribución por WhatsApp y un sistema financiero que hace rendir cada
              peso mientras el proyecto se completa.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* ── Higgsfield ── */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg">
              {/* Color accent bar */}
              <div className="h-1.5 w-full" style={{ background: 'var(--accent-blue)' }} />
              <div className="flex flex-1 flex-col p-8">
                {/* Badge */}
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-black text-white"
                    style={{ background: 'var(--accent-blue)' }}
                  >
                    H
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold text-foreground">Higgsfield</p>
                    <p className="text-xs text-muted-foreground">Generación de contenido IA</p>
                  </div>
                </div>

                <h3 className="mb-3 font-semibold text-foreground">
                  Video e imágenes generadas con IA para cada campaña
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Higgsfield genera automáticamente el material visual del kit viral de cada
                  campaña: imágenes para Instagram, miniaturas para WhatsApp y videos cortos
                  de impacto. Sin diseñador, sin tiempo de espera.
                </p>

                <div className="rounded-xl border border-border bg-secondary/60 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Flujo
                  </p>
                  <div className="flex flex-col gap-1.5 text-sm text-foreground">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--accent-blue)' }} />
                      La ONG crea la campaña
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--accent-blue)' }} />
                      Higgsfield genera el kit visual
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--accent-blue)' }} />
                      El material queda listo para difundir
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Hermes Kapso ── */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg">
              <div className="h-1.5 w-full bg-primary" />
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-black text-primary-foreground">
                    K
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold text-foreground">Hermes Kapso</p>
                    <p className="text-xs text-muted-foreground">Distribución inteligente</p>
                  </div>
                </div>

                <h3 className="mb-3 font-semibold text-foreground">
                  El contenido llega por WhatsApp y se publica solo en tus redes
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Hermes Kapso actúa como puente entre Higgsfield y el usuario. Una vez generado
                  el contenido, lo devuelve al promotor directamente por WhatsApp — con el texto,
                  la imagen y el link personalizado. Con un toque, el promotor puede publicarlo
                  en sus redes sociales sin salir del chat.
                </p>

                <div className="rounded-xl border border-border bg-secondary/60 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Flujo
                  </p>
                  <div className="flex flex-col gap-1.5 text-sm text-foreground">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Kapso recibe el kit de Higgsfield
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Lo entrega al promotor por WhatsApp
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      El promotor publica en sus redes en un toque
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── P2P.me + Mercado Pago MCP ── */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg">
              <div className="h-1.5 w-full" style={{ background: 'var(--terracotta)' }} />
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-black text-white"
                    style={{ background: 'var(--terracotta)' }}
                  >
                    P
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold text-foreground">P2P.me &times; Mercado Pago</p>
                    <p className="text-xs text-muted-foreground">Rendimientos mientras esperás</p>
                  </div>
                </div>

                <h3 className="mb-3 font-semibold text-foreground">
                  Tu donación en efectivo genera rendimientos hasta que el proyecto se completa
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  El donante paga en efectivo a través de Mercado Pago MCP. P2P.me convierte
                  ese pago en un aporte a un pool de liquidez que genera rendimientos mientras
                  el proyecto acumula su meta — igual que Kickstarter, pero el dinero trabaja.
                  Cuando el hito se verifica, los fondos se liberan a la ONG.
                </p>

                <div className="rounded-xl border border-border bg-secondary/60 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Flujo
                  </p>
                  <div className="flex flex-col gap-1.5 text-sm text-foreground">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--terracotta)' }} />
                      Donante paga en efectivo vía Mercado Pago
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--terracotta)' }} />
                      P2P.me deposita en pool de liquidez
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--terracotta)' }} />
                      Hito verificado &rarr; fondos + rendimiento a la ONG
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Integration diagram — how the 3 connect */}
          <div className="mt-10 rounded-2xl border border-border bg-foreground px-8 py-7">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-background/50">
              Cómo se integran
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-0">
              {[
                { name: 'Higgsfield', label: 'Genera el contenido visual', color: 'var(--accent-blue)' },
                { name: 'Hermes Kapso', label: 'Distribuye por WhatsApp + redes', color: 'var(--primary)' },
                { name: 'P2P.me', label: 'Gestiona el dinero en el pool', color: 'var(--terracotta)' },
              ].map(({ name, label, color }, i) => (
                <div key={name} className="flex items-center gap-0 sm:flex-row">
                  <div className="flex flex-col items-center gap-1.5 px-6 text-center">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white"
                      style={{ background: color }}
                    >
                      {i + 1}
                    </div>
                    <p className="font-serif text-sm font-bold text-background">{name}</p>
                    <p className="text-xs text-background/60">{label}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden text-background/30 sm:block">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Campaign carousel — Homie "Properties" section ── */}
      <section id="campaigns" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                Proyectos activos
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Campañas que necesitan tu apoyo
              </h2>
              <p className="mt-2 text-muted-foreground">
                Proyectos verificados con impacto real en tu comunidad.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
            >
              Panel ONG
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <CampaignCarousel campaigns={campaigns} />
        </div>
      </section>

      {/* ── Final CTA — Homie "Ready to simplify" ── */}
      <section className="relative overflow-hidden border-t border-border bg-foreground py-24">
        {/* Watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
          <p
            className="font-serif font-black uppercase tracking-tighter text-background/[0.04]"
            style={{ fontSize: 'clamp(60px, 15vw, 220px)', whiteSpace: 'nowrap' }}
          >
            SUMATE
          </p>
        </div>

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-background/50">
            Para ONGs
          </p>
          <h2 className="mb-5 font-serif text-3xl font-bold text-background sm:text-4xl lg:text-5xl">
            ¿Listo para publicar tu campaña?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-background/70">
            Publicá con hitos verificables, activá el kit viral y recibí donaciones
            con trazabilidad completa desde el día uno.
          </p>

          <div className="mb-8 flex flex-col items-center gap-2">
            {[
              'Sin comisiones ocultas',
              'Liberación de fondos por hitos verificados',
              'Kit viral listo para WhatsApp e Instagram',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-background/70">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </span>
            ))}
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-opacity hover:opacity-90"
          >
            Publicar mi campaña
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">FAQ</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">Preguntas frecuentes</h2>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {[
              {
                q: '¿Cuánto cobra Refinance por cada donación?',
                a: 'Cero comisión de plataforma. Solo se aplica el costo de procesamiento del medio de pago (Mercado Pago).',
              },
              {
                q: '¿Cómo se verifican los hitos?',
                a: 'La ONG sube evidencia pública (facturas, fotos, informes). El equipo de Refinance valida antes de liberar el tramo de fondos correspondiente.',
              },
              {
                q: '¿Qué es Higgsfield y por qué lo usan?',
                a: 'Higgsfield es un motor de generación de imágenes y video con IA. Refinance lo usa para crear automáticamente el kit visual de cada campaña — imágenes para Instagram, miniaturas y videos cortos — sin necesitar un diseñador.',
              },
              {
                q: '¿Cómo funciona Hermes Kapso?',
                a: 'Hermes Kapso es el sistema de distribución inteligente. Una vez que Higgsfield genera el contenido, Kapso lo devuelve al promotor directamente por WhatsApp con el texto, la imagen y el link personalizado. Desde ahí, el promotor puede publicarlo en sus redes sociales en un solo toque.',
              },
              {
                q: '¿Qué pasa con mi dinero mientras la campaña no llega a la meta?',
                a: 'El pago en efectivo hecho vía Mercado Pago MCP es gestionado por P2P.me, que lo deposita en un pool de liquidez. Ese dinero genera rendimientos mientras el proyecto acumula su objetivo — similar a Kickstarter, pero el capital no está inactivo. Cuando se verifica el hito, los fondos más el rendimiento acumulado se liberan a la ONG.',
              },
              {
                q: '¿Puedo seguir el impacto de mi donación?',
                a: 'Sí. Cada campaña tiene una página pública con el estado de cada hito, la evidencia de validación y el rendimiento generado en el pool durante el período de recaudación.',
              },
              {
                q: '¿Cómo funcionan los links personalizados de difusión?',
                a: 'Al donar recibís un link con tu código de referido. Cuando alguien dona a través de ese link, tu nombre aparece como promotor en la campaña. Hermes Kapso también te entrega ese link automáticamente por WhatsApp con contenido listo para compartir.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  {q}
                  <span className="ml-2 shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <Heart className="h-3 w-3 fill-current text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-foreground">Refinance</span>
            <span>— Donaciones con impacto verificable</span>
          </div>
          <span>Rosario &amp; CABA, Argentina</span>
        </div>
      </footer>
    </div>
  );
}
