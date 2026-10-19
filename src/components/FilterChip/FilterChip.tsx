import type { ButtonHTMLAttributes } from 'react';
import './FilterChip.css';

export type FilterChipState = 'Default' | 'Hover' | 'Active' | 'Disabled';

export type FilterChipProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'style' | 'children' | 'disabled' | 'aria-pressed'
> & {
  Label?: string;
  /**
   * Default, Active (the filter is on) or Disabled are real behaviour.
   * Hover pins the hover look for display; a real pointer shows it anyway.
   */
  State?: FilterChipState;
};

export function FilterChip({
  Label = 'Label',
  State = 'Default',
  className,
  type = 'button',
  onClick,
  ...rest
}: FilterChipProps) {
  const classes = ['filter-chip', className].filter(Boolean).join(' ');
  const disabled = State === 'Disabled';

  return (
    <button
      {...rest}
      type={type}
      className={classes}
      data-state={State}
      disabled={disabled}
      aria-pressed={State === 'Active'}
      onClick={disabled ? undefined : onClick}
    >
      <span className="filter-chip__label">{Label}</span>
    </button>
  );
}

export default FilterChip;
