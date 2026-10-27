import type { HTMLAttributes } from 'react';

export type StatusBadgeStatus =
  | 'Lost'
  | 'Found'
  | 'Potential Match'
  | 'Claim Pending'
  | 'Verified'
  | 'Returned'
  | 'Rejected';

export type StatusBadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style' | 'children'> & {
  Status?: StatusBadgeStatus;
  /** Off by default. Decorative, so it is aria-hidden. */
  Dot?: boolean;
};

export function StatusBadge({
  Status = 'Lost',
  Dot = false,
  className,
  ...rest
}: StatusBadgeProps) {
  const classes = ['status-badge', className].filter(Boolean).join(' ');

  return (
    <span {...rest} className={classes} data-status={Status}>
      {Dot ? <span className="status-badge__dot" aria-hidden="true" /> : null}
      <span className="status-badge__label">{Status}</span>
    </span>
  );
}

export default StatusBadge;
