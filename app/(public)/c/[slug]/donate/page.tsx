'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getMockCampaignBySlug } from '@/lib/mock-campaigns';
import { ProgressBar } from '@/components/campaign/progress-bar';

const PRESET_AMOUNTS = [10000, 30000, 60000, 120000];

export default function DonatePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { slug } = use(params);
  const { ref } = use(searchParams);
  const router = useRouter();
  const campaign = getMockCampaignBySlug(slug);

  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('one_time');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!campaign) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Campaña no encontrada.</p>
      </main>
    );
  }

  const pct = Math.min(
    Math.round((campaign.total_raised / campaign.goal_amount) * 100),
    100
  );

  const selectedAmount = amount !== '' ? amount : Number(customAmount) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedAmount || selectedAmount < campaign.min_donation) {
      setError(`El mínimo es $${campaign.min_donation.toLocaleString('es-AR')}.`);
      return;
    }
    if (!name.trim()) {
      setError('Tu nombre es requerido.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Email inválido.');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push(`/c/${slug}/thanks?amount=${selectedAmount}&name=${encodeURIComponent(name)}${ref ? `&ref=${ref}` : ''}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <nav className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link
            href={`/c/${slug}${ref ? `?ref=${ref}` : ''}`}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
          <span className="text-sm font-semibold text-foreground">{campaign.title}</span>
        </div>
      </nav>

      <div className="mx-auto max-w-lg px-4 py-8">
        {/* Progress summary */}
        <section className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>${campaign.total_raised.toLocaleString('es-AR')} recaudados</span>
            <span>{pct}%</span>
          </div>
          <ProgressBar value={pct} />
        </section>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Frequency */}
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Tipo de donación</p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { value: 'one_time', label: 'Una vez' },
                  { value: 'monthly', label: 'Mensual' },
                ] as const
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFrequency(value)}
                  className={`rounded-xl border py-3 text-sm font-medium transition-colors ${
                    frequency === value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Amount presets */}
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Elegí un monto</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount('');
                  }}
                  className={`rounded-xl border py-3 text-sm font-semibold transition-colors ${
                    amount === preset
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-foreground hover:border-primary'
                  }`}
                >
                  ${preset.toLocaleString('es-AR')}
                </button>
              ))}
            </div>

            <div className="mt-2">
              <Label htmlFor="custom-amount" className="sr-only">
                Monto personalizado
              </Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder={`Otro monto (mín. $${campaign.min_donation.toLocaleString('es-AR')})`}
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('');
                }}
                className="mt-2 bg-card"
              />
            </div>
          </div>

          {/* Impact hint */}
          {selectedAmount > 0 && campaign.impact_per_amount[String(selectedAmount)] && (
            <p className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              {campaign.impact_per_amount[String(selectedAmount)]}
            </p>
          )}

          {/* Personal data */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="donor-name">Nombre</Label>
              <Input
                id="donor-name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 bg-card"
                required
              />
            </div>
            <div>
              <Label htmlFor="donor-email">Email</Label>
              <Input
                id="donor-email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-card"
                required
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl py-6 text-base font-bold"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Heart className="h-5 w-5 fill-current" />
                Confirmar donación
                {selectedAmount > 0 && ` · $${selectedAmount.toLocaleString('es-AR')}`}
              </>
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
