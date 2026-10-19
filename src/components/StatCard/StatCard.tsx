import type { HTMLAttributes } from 'react';
import './StatCard.css';

export type StatCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Figma text property: a short noun phrase, such as Open reports. */
  Label?: string;
  /** Figma text property: the one key number. */
  Value?: string;
  /** Figma text property: the change with a time, such as +12 since yesterday. */
  Delta?: string;
  /** Figma boolean "Show delta". Turn it off when there is nothing to compare. */
  'Show delta'?: boolean;
};

/**
 * Stat Card (Figma node 111:16). Not interactive: it has no states.
 * Screen readers read Label, Value and Delta in order, as one sentence.
 */
export function StatCard({
  Label = 'Open reports',
  Value = '128',
  Delta = '+12 since yesterday',
  'Show delta': showDelta = true,
  className,
  ...rest
}: StatCardProps) {
  const classes = ['stat-card', className].filter(Boolean).join(' ');

  return (
    <div {...rest} className={classes}>
      <p className="stat-card__label">{Label}</p>
      <p className="stat-card__value">{Value}</p>
      {showDelta ? <p className="stat-card__delta">{Delta}</p> : null}
    </div>
  );
}
