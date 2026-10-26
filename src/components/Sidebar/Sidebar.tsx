import { useId, useState } from 'react';
import type { HTMLAttributes, MouseEvent } from 'react';
import { Logo } from '../Logo/Logo';
import { LogoSymbol } from '../LogoSymbol/LogoSymbol';
import { IconButton } from '../IconButton/IconButton';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/Icon';
import './Sidebar.css';

/* Figma node 163:295 (component set Sidebar, properties Collapsed and Active).
   Composes Logo (Theme Dark, Size Small) and Logo/Symbol (Color Brand,
   Size Small), two Icon Button instances (Style Ghost, State Default, icon
   swapped to menu and maximize) and one Icon per item (Size md). */

export type SidebarCollapsed = 'False' | 'True';
export type SidebarActive =
  | 'Dashboard'
  | 'Reports'
  | 'Matches'
  | 'Claims'
  | 'Users & Venues'
  | 'Handovers';

export type SidebarProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** The node's Collapsed variant. The toggle button flips it; pass onCollapsedChange to follow it. */
  Collapsed?: SidebarCollapsed;
  /** The node's Active variant: the item for the current page, marked aria-current="page". */
  Active?: SidebarActive;
  onCollapsedChange?: (collapsed: SidebarCollapsed) => void;
  onActiveChange?: (active: SidebarActive) => void;
};

type Item = { label: SidebarActive; icon: IconName; href: string };

/* The node's items, in the node's order, with the icon each instance uses. */
const ITEMS: Item[] = [
  { label: 'Dashboard', icon: 'dashboard', href: '#dashboard' },
  { label: 'Reports', icon: 'file', href: '#reports' },
  { label: 'Matches', icon: 'sparkle', href: '#matches' },
  { label: 'Claims', icon: 'shield', href: '#claims' },
  { label: 'Users & Venues', icon: 'users', href: '#users-venues' },
  { label: 'Handovers', icon: 'handover', href: '#handovers' },
];

export function Sidebar({
  Collapsed = 'False',
  Active = 'Dashboard',
  onCollapsedChange,
  onActiveChange,
  className,
  ...rest
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState<SidebarCollapsed>(Collapsed);
  const [active, setActive] = useState<SidebarActive>(Active);
  const [prevCollapsed, setPrevCollapsed] = useState(Collapsed);
  const [prevActive, setPrevActive] = useState(Active);
  const navId = useId();

  /* Follow the props when they change, and keep local state for clicks. */
  if (Collapsed !== prevCollapsed) {
    setPrevCollapsed(Collapsed);
    setCollapsed(Collapsed);
  }
  if (Active !== prevActive) {
    setPrevActive(Active);
    setActive(Active);
  }

  const isCollapsed = collapsed === 'True';
  const classes = ['sidebar', className].filter(Boolean).join(' ');

  const toggle = () => {
    const next: SidebarCollapsed = isCollapsed ? 'False' : 'True';
    setCollapsed(next);
    onCollapsedChange?.(next);
  };

  const select = (label: SidebarActive) => (_event: MouseEvent<HTMLAnchorElement>) => {
    setActive(label);
    onActiveChange?.(label);
  };

  return (
    <aside
      aria-label="Sidebar"
      {...rest}
      className={classes}
      data-collapsed={collapsed}
      data-active={active}
    >
      <div className="sidebar__header">
        {isCollapsed ? (
          <LogoSymbol Color="Brand" Size="Small" />
        ) : (
          <Logo Theme="Dark" Size="Small" className="sidebar__logo" />
        )}
        <IconButton
          Style="Ghost"
          State="Default"
          className="sidebar__toggle"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
          aria-controls={navId}
          onClick={toggle}
          {...{ 'Icon swap': <Icon Name={isCollapsed ? 'maximize' : 'menu'} Size="md" /> }}
        />
      </div>

      <div className="sidebar__divider" aria-hidden="true">
        <span className="sidebar__line" />
      </div>

      <nav id={navId} className="sidebar__nav" aria-label="Main">
        <ul className="sidebar__items">
          {ITEMS.map((item) => {
            const current = item.label === active;
            return (
              <li key={item.label} className="sidebar__entry">
                <a
                  className="sidebar__item"
                  href={item.href}
                  aria-current={current ? 'page' : undefined}
                  aria-label={isCollapsed ? item.label : undefined}
                  data-current={current ? 'true' : 'false'}
                  onClick={select(item.label)}
                >
                  <Icon Name={item.icon} Size="md" className="sidebar__icon" />
                  {isCollapsed ? null : <span className="sidebar__label">{item.label}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar__spacer" aria-hidden="true" />

      {isCollapsed ? null : (
        <div className="sidebar__staff">
          <span className="sidebar__venue">Central Station desk</span>
          <span className="sidebar__role">Verified staff · Admin</span>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
