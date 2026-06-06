import { CheckCircle2, CircleDot, ShieldCheck, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Milestone } from '@/types/campaign';
import { cn } from '@/lib/utils';

type MilestonesListProps = {
  milestones: Milestone[];
  compact?: boolean;
};

const statusCopy: Record<Milestone['status'], string> = {
  pending: 'Pendiente',
  completed: 'Completado',
  reached: 'Meta alcanzada',
  validated: 'Validado',
};

const statusStyles: Record<Milestone['status'], string> = {
  pending: 'border-border bg-muted text-muted-foreground',
  completed: 'border-amber-600/30 bg-amber-900/20 text-amber-400',
  reached: 'border-amber-600/30 bg-amber-900/20 text-amber-400',
  validated: 'border-primary/30 bg-primary/10 text-primary',
};

export function MilestonesList({ milestones, compact = false }: MilestonesListProps) {
  return (
    <div className={cn('space-y-3', compact && 'space-y-2')}>
      {milestones
        .slice()
        .sort((a, b) => a.sequence - b.sequence)
        .map((milestone) => (
          <article
            key={milestone.id}
            className={cn(
              'rounded-xl border border-border bg-card shadow-sm',
              compact ? 'p-3' : 'p-4'
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-border bg-background">
                {milestone.status === 'validated' ? (
                  <ShieldCheck className="h-4 w-4 text-primary" />
                ) : milestone.status === 'reached' ? (
                  <CheckCircle2 className="h-4 w-4 text-amber-400" />
                ) : (
                  <CircleDot className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Hito {milestone.sequence}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn('rounded-full px-3 py-0.5 text-xs', statusStyles[milestone.status])}
                  >
                    {statusCopy[milestone.status]}
                  </Badge>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>Meta: ${milestone.target_amount.toLocaleString('es-AR')}</span>
                  {milestone.validated_at && (
                    <span>
                      Validado el{' '}
                      {new Date(milestone.validated_at).toLocaleDateString('es-AR')}
                    </span>
                  )}
                </div>

                {milestone.proof_description && (
                  <p className="mt-2 rounded-lg border border-border bg-background px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                    {milestone.proof_description}
                  </p>
                )}

                {milestone.proof_url && milestone.proof_url !== '#' && (
                  <div className="mt-2">
                    <a
                      href={milestone.proof_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      Ver evidencia
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
    </div>
  );
}
