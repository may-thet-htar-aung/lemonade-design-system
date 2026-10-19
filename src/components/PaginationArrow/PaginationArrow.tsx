import type { ButtonHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import './PaginationArrow.css';

export type PaginationArrowProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label'
> & {
  Direction?: 'Previous' | 'Next';
  /** Hover pins the hover look for display. Real pointer hover works in Default. Disabled sets the native disabled attribute. */
  State?: 'Default' | 'Hover' | 'Disabled';
};

export function PaginationArrow({
  Direction = 'Previous',
  State = 'Default',
  className,
  type = 'button',
  ...rest
}: PaginationArrowProps) {
  const classes = ['pagination-arrow', className].filter(Boolean).join(' ');
  return (
    <button
      {...rest}
      type={type}
      className={classes}
      data-state={State}
      aria-label={Direction === 'Previous' ? 'Previous page' : 'Next page'}
      disabled={State === 'Disabled' || rest.disabled}
    >
      <Icon Name={Direction === 'Previous' ? 'chevron-left' : 'chevron-right'} Size="md" />
    </button>
  );
}

export default PaginationArrow;
