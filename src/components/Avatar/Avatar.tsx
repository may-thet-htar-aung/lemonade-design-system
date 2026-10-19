import type { HTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import './Avatar.css';

export type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style' | 'children'> & {
  Type?: 'Initials' | 'Image';
  Size?: 'Small' | 'Medium' | 'Large';
  /** Hover pins the ring. In Default, a real pointer over the avatar shows the same ring. */
  State?: 'Default' | 'Hover';
  /** Up to two letters, first and last name, such as AC. Used when Type is Initials. */
  Initials?: string;
  /** Required: the person's full name, such as "Aye Chan". */
  'aria-label': string;
};

const ICON_SIZE = { Small: 'sm', Medium: 'lg', Large: 'xl' } as const;

export function Avatar({
  Type = 'Initials',
  Size = 'Small',
  State = 'Default',
  Initials = 'AC',
  className,
  ...rest
}: AvatarProps) {
  const classes = [
    'avatar',
    'avatar--' + Type.toLowerCase(),
    'avatar--' + Size.toLowerCase(),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span {...rest} role="img" className={classes} data-state={State}>
      {Type === 'Image' ? (
        <Icon Name="user" Size={ICON_SIZE[Size]} />
      ) : (
        <span className="avatar__initials" aria-hidden="true">
          {Initials}
        </span>
      )}
    </span>
  );
}

export default Avatar;
