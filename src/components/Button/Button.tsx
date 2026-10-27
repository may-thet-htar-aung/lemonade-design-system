import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'style' | 'children'
> & {
  Style?: 'Primary' | 'Outline' | 'Ghost';
  /** Hover pins the hover look for display. Real pointer hover works in Default. Disabled sets the native disabled attribute. */
  State?: 'Default' | 'Hover' | 'Disabled';
  Label?: string;
  IconLeft?: boolean;
  IconLeftSwap?: ReactNode;
  IconRight?: boolean;
  IconRightSwap?: ReactNode;
};

export function Button({
  Style = 'Primary',
  State = 'Default',
  Label = 'Button',
  IconLeft = false,
  IconLeftSwap = null,
  IconRight = false,
  IconRightSwap = null,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = ['button', `button--${Style.toLowerCase()}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...rest}
      type={type}
      className={classes}
      data-state={State}
      disabled={State === 'Disabled' || rest.disabled}
    >
      {IconLeft && IconLeftSwap ? (
        <span className="button__icon" aria-hidden="true">
          {IconLeftSwap}
        </span>
      ) : null}
      <span className="button__label">{Label}</span>
      {IconRight && IconRightSwap ? (
        <span className="button__icon" aria-hidden="true">
          {IconRightSwap}
        </span>
      ) : null}
    </button>
  );
}

export default Button;
