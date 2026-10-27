import type { AnchorHTMLAttributes } from 'react';

export type TopNavLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'style' | 'children'
> & {
  /** Hover pins the hover look for display; real pointer hover works in Default. Active marks the current page and sets aria-current="page". */
  State?: 'Default' | 'Hover' | 'Active';
  Label?: string;
};

export function TopNavLink({
  State = 'Default',
  Label = 'Browse items',
  className,
  href = '#',
  ...rest
}: TopNavLinkProps) {
  const classes = ['top-nav-link', className].filter(Boolean).join(' ');

  return (
    <a
      {...rest}
      href={href}
      className={classes}
      data-state={State}
      aria-current={State === 'Active' ? 'page' : rest['aria-current']}
    >
      <span className="top-nav-link__label">{Label}</span>
      <span className="top-nav-link__indicator" aria-hidden="true" />
    </a>
  );
}

export default TopNavLink;
