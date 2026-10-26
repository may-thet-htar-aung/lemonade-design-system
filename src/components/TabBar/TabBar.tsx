import type { HTMLAttributes, MouseEvent } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './TabBar.css';

/* Figma node 159:141 (component set Tab Bar, property Active).
   Five tabs, each an Icon instance (Size lg, the node's size/icon/lg) in a
   pill above a Tagline/12 label. The active tab's pill is filled. */

export type TabBarActive = 'Home' | 'Search' | 'Report' | 'Activity' | 'Profile';

type Tab = { label: TabBarActive; icon: IconName };

/* The node's tabs and icons, in the node's order. */
const TABS: Tab[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Search', icon: 'search' },
  { label: 'Report', icon: 'plus' },
  { label: 'Activity', icon: 'list' },
  { label: 'Profile', icon: 'user' },
];

export type TabBarProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** The tab for the current screen. Marked aria-current="page". */
  Active?: TabBarActive;
  /** Where each tab links to. Defaults to an in-page hash per tab. */
  hrefs?: Partial<Record<TabBarActive, string>>;
  /** Called when a tab is activated by click, Enter or touch. */
  onTabSelect?: (tab: TabBarActive, event: MouseEvent<HTMLAnchorElement>) => void;
};

export function TabBar({
  Active = 'Home',
  hrefs,
  onTabSelect,
  className,
  ...rest
}: TabBarProps) {
  const classes = ['tab-bar', className].filter(Boolean).join(' ');

  return (
    <nav aria-label="Main" {...rest} className={classes}>
      <ul className="tab-bar__tabs">
        {TABS.map((tab) => {
          const isActive = tab.label === Active;
          return (
            <li key={tab.label} className="tab-bar__item">
              <a
                className={'tab-bar__tab' + (isActive ? ' tab-bar__tab--active' : '')}
                href={hrefs?.[tab.label] ?? '#' + tab.label.toLowerCase()}
                aria-current={isActive ? 'page' : undefined}
                onClick={onTabSelect ? (event) => onTabSelect(tab.label, event) : undefined}
              >
                <span className="tab-bar__pill">
                  {/* Decorative: the label names the tab. */}
                  <Icon Name={tab.icon} Size="lg" />
                </span>
                <span className="tab-bar__label">{tab.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TabBar;
