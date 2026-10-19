import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import './IconButton.css';

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'style' | 'children'
> & {
  Style?: 'Primary' | 'Outline' | 'Ghost';
  /** Hover pins the hover look for display. Real pointer hover works in Default. Disabled sets the native disabled attribute. */
  State?: 'Default' | 'Hover' | 'Disabled';
  'Show badge'?: boolean;
  /** Replaces the default bell icon. */
  'Icon swap'?: ReactNode;
  /** Required: the accessible name. Include the badge, such as "Notifications, 3 unread". */
  'aria-label': string;
};

export function IconButton({
  Style = 'Primary',
  State = 'Default',
  'Show badge': showBadge = false,
  'Icon swap': iconSwap = null,
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  const classes = ['icon-button', 'icon-button--' + Style.toLowerCase(), className]
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
      <span className="icon-button__icon" aria-hidden="true">
        {iconSwap ?? <Icon Name="bell" Size="md" />}
      </span>
      {showBadge ? <span className="icon-button__badge" aria-hidden="true" /> : null}
    </button>
  );
}

export default IconButton;
