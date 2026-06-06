import Link from 'next/link';
import { CheckCircle2, Share2 } from 'lucide-react';
import { getMockCampaignBySlug } from '@/lib/mock-campaigns';
import { SharePanel } from '@/components/campaign/share-panel';

export default async function ThanksPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ amount?: string; name?: string; ref?: string }>;
}) {
  const { slug } = await params;
  const { amount, name, ref } = await searchParams;
  const campaign = getMockCampaignBySlug(slug);

  const donorName = name ? decodeURIComponent(name) : 'Gracias';
  const donatedAmount = amount ? parseInt(amount) : 0;

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-lg items-center px-4 py-3">
          <Link href="/" className="text-sm font-semibold text-primary">
            Halketon
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        {/* Success icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>

        <h1 className="mb-2 text-balance text-3xl font-bold text-foreground">
          {donorName ? `¡Gracias, ${donorName.split(' ')[0]}!` : '¡Gracias por donar!'}
        </h1>

        {donatedAmount > 0 && (
          <p className="mb-2 text-4xl font-bold text-primary">
            ${donatedAmount.toLocaleString('es-AR')}
          </p>
        )}

        <p className="mb-8 leading-relaxed text-muted-foreground">
          Tu donación a{' '}
          <span className="font-medium text-foreground">{campaign?.title ?? 'la campaña'}</span>{' '}
          fue registrada. Te llegará un comprobante por email.
        </p>

        {/* Impact message */}
        {campaign && donatedAmount > 0 && campaign.impact_per_amount[String(donatedAmount)] && (
          <div className="mb-8 rounded-xl border border-primary/30 bg-primary/10 p-4">
            <p className="text-sm font-medium text-primary">Con tu donación:</p>
            <p className="mt-1 text-foreground">
              {campaign.impact_per_amount[String(donatedAmount)]}
            </p>
          </div>
        )}

        {/* Share section */}
        {campaign && (
          <div className="mb-8 text-left">
            <div className="mb-4 flex items-center gap-2">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-semibold text-foreground">
                Multiplicá el impacto compartiendo
              </p>
            </div>
            <SharePanel
              campaignSlug={slug}
              campaignTitle={campaign.title}
              promoters={campaign.promoters ?? []}
              contentAssets={campaign.content_assets ?? []}
            />
          </div>
        )}

        <Link
          href={`/c/${slug}`}
          className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          Ver la campaña completa
        </Link>
      </div>
    </main>
  );
}
