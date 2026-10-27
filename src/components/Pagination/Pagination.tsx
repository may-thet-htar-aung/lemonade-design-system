import type { MouseEventHandler } from 'react';
import { PaginationArrow } from '../PaginationArrow/PaginationArrow';

export type PaginationProps = {
  Position?: 'First' | 'Middle' | 'Last';
  /** Figma "Show summary". Hide the range text when it is not needed. */
  ShowSummary?: boolean;
  /** The range text, such as "Showing 9–16 of 192 reports". Update it on every page change. */
  Summary?: string;
  onPrevious?: MouseEventHandler<HTMLButtonElement>;
  onNext?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const DEFAULT_SUMMARY: Record<NonNullable<PaginationProps['Position']>, string> = {
  First: 'Showing 1–8 of 192 reports',
  Middle: 'Showing 89–96 of 192 reports',
  Last: 'Showing 185–192 of 192 reports',
};

export function Pagination({
  Position = 'First',
  ShowSummary = true,
  Summary,
  onPrevious,
  onNext,
  className,
}: PaginationProps) {
  const classes = ['pagination', className].filter(Boolean).join(' ');
  return (
    <nav className={classes} aria-label="Pagination" data-position={Position}>
      {ShowSummary && (
        <p className="pagination__summary" aria-live="polite">
          {Summary ?? DEFAULT_SUMMARY[Position]}
        </p>
      )}
      <div className="pagination__controls">
        <div className="pagination__pager">
          <PaginationArrow
            Direction="Previous"
            State={Position === 'First' ? 'Disabled' : 'Default'}
            onClick={onPrevious}
          />
          <PaginationArrow
            Direction="Next"
            State={Position === 'Last' ? 'Disabled' : 'Default'}
            onClick={onNext}
          />
        </div>
      </div>
    </nav>
  );
}

export default Pagination;
