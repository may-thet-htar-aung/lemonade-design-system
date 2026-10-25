import type { HTMLAttributes } from 'react';
import { Logo } from '../Logo/Logo';
import { TopNavLink } from '../TopNavLink/TopNavLink';
import { Button } from '../Button/Button';
import './TopNav.css';

/* Figma node 161:415 (component set Top Nav, property Page).
   Composes Logo (Light, Medium), four Top Nav Link instances, and two
   Buttons (Ghost "Sign in", Primary "Report an item"). */

export type TopNavPage = 'Home' | 'Browse' | 'Report' | 'Track';

export type TopNavProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** The section the person is in. Home has no active link. */
  Page?: TopNavPage;
  /** Target of the skip link the node's accessibility notes ask for. */
  skipLinkHref?: string;
};

type NavLink = { label: string; page: TopNavPage | null };

/* The node's links, in the node's order. "How it works" has no Page value. */
const LINKS: NavLink[] = [
  { label: 'Browse items', page: 'Browse' },
  { label: 'Report an item', page: 'Report' },
  { label: 'Track a case', page: 'Track' },
  { label: 'How it works', page: null },
];

export function TopNav({
  Page = 'Home',
  skipLinkHref = '#main',
  className,
  ...rest
}: TopNavProps) {
  const classes = ['top-nav', className].filter(Boolean).join(' ');

  return (
    <header {...rest} className={classes} data-page={Page}>
      <a className="top-nav__skip-link" href={skipLinkHref}>
        Skip to main content
      </a>
      <div className="top-nav__left">
        {/* Logo instance: Theme Light, Size Medium. Linked to home, as the
            Logo's accessibility notes ask. */}
        <a className="top-nav__home" href="#">
          <Logo Theme="Light" Size="Medium" />
        </a>
        <nav className="top-nav__nav" aria-label="Main">
          <ul className="top-nav__links">
            {LINKS.map((link) => (
              <li key={link.label}>
                <TopNavLink
                  Label={link.label}
                  State={link.page !== null && link.page === Page ? 'Active' : 'Default'}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="top-nav__actions">
        <Button Style="Ghost" Label="Sign in" />
        <Button Style="Primary" Label="Report an item" />
      </div>
    </header>
  );
}

export default TopNav;
