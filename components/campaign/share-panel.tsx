'use client';

import { useState } from 'react';
import { MessageCircle, Camera, Briefcase, Mail, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CampaignPromoter, ContentAsset } from '@/types/campaign';

interface SharePanelProps {
  campaignSlug: string;
  campaignTitle: string;
  promoters: CampaignPromoter[];
  contentAssets: ContentAsset[];
}

const APP_URL =
  typeof window !== 'undefined' ? window.location.origin : 'https://halketon.vercel.app';

function buildShareUrl(slug: string, refCode: string) {
  return `${APP_URL}/c/${slug}?ref=${refCode}`;
}

export function SharePanel({
  campaignSlug,
  campaignTitle,
  promoters,
  contentAssets,
}: SharePanelProps) {
  const [selectedPromoter, setSelectedPromoter] = useState<CampaignPromoter | null>(
    promoters[0] ?? null
  );
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);

  const getContent = (channel: string) =>
    contentAssets.find((a) => a.channel === channel)?.content ?? '';

  function buildPersonalized(content: string): string {
    const name = selectedPromoter?.name ?? 'Un amigo';
    const link = selectedPromoter
      ? buildShareUrl(campaignSlug, selectedPromoter.referral_code)
      : `${APP_URL}/c/${campaignSlug}`;
    return content.replace('{{PROMOTER_NAME}}', name) + `\n${link}`;
  }

  function handleCopy(channel: string) {
    const text = buildPersonalized(getContent(channel));
    navigator.clipboard.writeText(text).then(() => {
      setCopiedChannel(channel);
      setTimeout(() => setCopiedChannel(null), 1800);
    });
  }

  function shareOnWhatsApp() {
    const text = buildPersonalized(getContent('whatsapp'));
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  function shareOnLinkedIn() {
    const url = selectedPromoter
      ? buildShareUrl(campaignSlug, selectedPromoter.referral_code)
      : `${APP_URL}/c/${campaignSlug}`;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank'
    );
  }

  function shareByEmail() {
    const rawContent = getContent('email');
    const [subject, ...bodyParts] = rawContent.split('\n\n');
    const body = buildPersonalized(bodyParts.join('\n\n'));
    const cleanSubject = subject.replace(/^Asunto:\s*/i, '');
    window.open(
      `mailto:?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(body)}`,
      '_blank'
    );
  }

  const shareLink = selectedPromoter
    ? buildShareUrl(campaignSlug, selectedPromoter.referral_code)
    : `${APP_URL}/c/${campaignSlug}`;

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-1 text-lg font-semibold text-foreground">Difundir campaña</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Elegí tu canal y compartí {campaignTitle} con tu red.
      </p>

      {promoters.length > 1 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            ¿Quién difunde?
          </p>
          <div className="flex flex-wrap gap-2">
            {promoters.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPromoter(p)}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                  selectedPromoter?.id === p.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* WhatsApp */}
        <Button
          onClick={shareOnWhatsApp}
          className="flex items-center justify-center gap-2 bg-[#25d366] text-white hover:bg-[#1fb955]"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>

        {/* Instagram */}
        <Button
          onClick={() => handleCopy('instagram')}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-orange-500 text-white hover:opacity-90"
        >
          {copiedChannel === 'instagram' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
          {copiedChannel === 'instagram' ? 'Copiado' : 'Instagram'}
        </Button>

        {/* LinkedIn */}
        <Button
          onClick={shareOnLinkedIn}
          className="flex items-center justify-center gap-2 bg-[#0077b5] text-white hover:bg-[#006097]"
        >
          <Briefcase className="h-4 w-4" />
          LinkedIn
        </Button>

        {/* Email */}
        <Button
          onClick={shareByEmail}
          variant="secondary"
          className="flex items-center justify-center gap-2"
        >
          <Mail className="h-4 w-4" />
          Email
        </Button>
      </div>

      {/* Copy link */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{shareLink}</span>
        <button
          onClick={() => handleCopy('link')}
          className="shrink-0 rounded text-xs font-medium text-primary hover:underline"
        >
          {copiedChannel === 'link' ? (
            <span className="flex items-center gap-1">
              <Check className="h-3 w-3" /> Copiado
            </span>
          ) : (
            'Copiar'
          )}
        </button>
      </div>
    </section>
  );
}
