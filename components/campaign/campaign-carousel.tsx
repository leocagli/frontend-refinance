'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, Users, Calendar, MapPin } from 'lucide-react';
import { ProgressBar } from '@/components/campaign/progress-bar';
import type { CampaignWithRelations } from '@/types/campaign';

interface CampaignCarouselProps {
  campaigns: CampaignWithRelations[];
}

function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-muted">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={`${title} — imagen ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
          {/* Subtle gradient at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir a imagen ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function CampaignCarousel({ campaigns }: CampaignCarouselProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {campaigns.map((campaign) => {
        const pct = Math.min(
          Math.round((campaign.total_raised / campaign.goal_amount) * 100),
          100
        );
        const images = campaign.images ?? (campaign.og_image_url ? [campaign.og_image_url] : []);

        return (
          <article
            key={campaign.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
          >
            {/* Image slider */}
            <ImageSlider images={images} title={campaign.title} />

            {/* Card body */}
            <div className="flex flex-1 flex-col p-5">
              {/* Cause label */}
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--accent-blue)]">
                {campaign.cause}
              </p>

              <h3 className="mb-1.5 text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                {campaign.title}
              </h3>

              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {campaign.description}
              </p>

              {/* Meta info */}
              <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
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

              {/* Progress */}
              <div className="mb-3">
                <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{pct}% recaudado</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {campaign.donors_count} donantes
                  </span>
                </div>
                <ProgressBar value={pct} />
                <div className="mt-1.5 flex justify-between text-xs">
                  <span className="font-semibold text-foreground">
                    ${campaign.total_raised.toLocaleString('es-AR')}
                  </span>
                  <span className="text-muted-foreground">
                    meta ${campaign.goal_amount.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              {/* Milestone pill */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {campaign.milestones.slice(0, 3).map((m) => (
                  <span
                    key={m.id}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      m.status === 'validated'
                        ? 'bg-primary/15 text-primary'
                        : m.status === 'reached'
                          ? 'bg-[color:var(--accent-blue)]/15 text-[color:var(--accent-blue)]'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {m.status === 'validated'
                      ? 'Verificado'
                      : m.status === 'reached'
                        ? 'Alcanzado'
                        : 'Pendiente'}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/c/${campaign.slug}`}
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Heart className="h-4 w-4 fill-current" />
                Donar a {campaign.title}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
