import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';

export type LinkButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'style' | 'children'
> & {
  /** Hover pins the hover look for display. Real pointer hover works in Default. Disabled sets the native disabled attribute. */
  State?: 'Default' | 'Hover' | 'Disabled';
  Label?: string;
  'Icon Right'?: boolean;
  /** Replaces the default arrow-right icon. */
  'Icon Right swap'?: ReactNode;
};

export function LinkButton({
  State = 'Default',
  Label = 'Review',
  'Icon Right': iconRight = false,
  'Icon Right swap': iconRightSwap = null,
  className,
  type = 'button',
  ...rest
}: LinkButtonProps) {
  const classes = ['link-button', className].filter(Boolean).join(' ');

  return (
    <button
      {...rest}
      type={type}
      className={classes}
      data-state={State}
      disabled={State === 'Disabled' || rest.disabled}
    >
      <span className="link-button__label">{Label}</span>
      {iconRight ? (
        <span className="link-button__icon" aria-hidden="true">
          {iconRightSwap ?? <Icon Name="arrow-right" Size="sm" />}
        </span>
      ) : null}
    </button>
  );
}

export default LinkButton;
