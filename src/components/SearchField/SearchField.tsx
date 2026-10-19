import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import './SearchField.css';

export type SearchFieldState = 'Default' | 'Focused' | 'Filled' | 'Disabled' | 'Clear Hover';

export type SearchFieldProps = {
  State?: SearchFieldState;
  /** Figma text property. Name what can be searched. Never leave it empty. */
  Placeholder?: string;
  /** Accessible name. The placeholder is not a label. */
  'aria-label'?: string;
  /** Initial search term. Filled and Clear Hover start with one when none is given. */
  defaultValue?: string;
  name?: string;
  className?: string;
  /** Called on every change of the term, including when the clear button empties it. */
  onValueChange?: (value: string) => void;
};

const SAMPLE_TERM = 'Black wallet';

export function SearchField({
  State = 'Default',
  Placeholder = 'Search lost & found items',
  'aria-label': ariaLabel = 'Search lost and found items',
  defaultValue,
  name,
  className,
  onValueChange,
}: SearchFieldProps) {
  const seeded = defaultValue ?? (State === 'Filled' || State === 'Clear Hover' ? SAMPLE_TERM : '');
  const [value, setValue] = useState(seeded);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => setValue(seeded), [seeded]);

  const isDisabled = State === 'Disabled';
  const classes = ['search-field', className].filter(Boolean).join(' ');

  const change = (next: string) => {
    setValue(next);
    onValueChange?.(next);
  };

  const clear = () => {
    change('');
    inputRef.current?.focus();
  };

  return (
    <div role="search" className={classes} data-state={State} data-filled={value !== '' ? 'true' : 'false'}>
      <Icon Name="search" Size="md" className="search-field__icon" />
      <input
        ref={inputRef}
        type="search"
        className="search-field__control"
        name={name}
        placeholder={Placeholder}
        aria-label={ariaLabel}
        value={value}
        disabled={isDisabled}
        onChange={(e) => change(e.target.value)}
      />
      {value !== '' && !isDisabled ? (
        <button type="button" className="search-field__clear" aria-label="Clear search" onClick={clear}>
          <Icon Name="x" Size="md" />
        </button>
      ) : null}
    </div>
  );
}

export default SearchField;
