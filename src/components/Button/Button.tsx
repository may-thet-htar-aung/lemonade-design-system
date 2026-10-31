import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'style' | 'children'
> & {
  Style?: 'Primary' | 'Outline' | 'Ghost';
  /** Hover pins the hover look for display. Real pointer hover works in Default. Disabled sets the native disabled attribute. */
  State?: 'Default' | 'Hover' | 'Disabled';
  Label?: string;
  'Icon Left'?: boolean;
  'Icon Left swap'?: ReactNode;
  'Icon Right'?: boolean;
  'Icon Right swap'?: ReactNode;
};

export function Button({
  Style = 'Primary',
  State = 'Default',
  Label = 'Button',
  'Icon Left': iconLeft = false,
  'Icon Left swap': iconLeftSwap = null,
  'Icon Right': iconRight = false,
  'Icon Right swap': iconRightSwap = null,
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
      {iconLeft && iconLeftSwap ? (
        <span className="button__icon" aria-hidden="true">
          {iconLeftSwap}
        </span>
      ) : null}
      <span className="button__label">{Label}</span>
      {iconRight && iconRightSwap ? (
        <span className="button__icon" aria-hidden="true">
          {iconRightSwap}
        </span>
      ) : null}
    </button>
  );
}

export default Button;
