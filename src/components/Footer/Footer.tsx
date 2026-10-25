import type { HTMLAttributes } from 'react';
import { Logo } from '../Logo/Logo';
import './Footer.css';

/* Figma node 162:69. The node is a single component with no properties, so
   the Footer takes only native footer attributes. Text is the node's text. */

export type FooterProps = Omit<HTMLAttributes<HTMLElement>, 'children'>;

type FooterColumn = { heading: string; links: string[] };

const COLUMNS: FooterColumn[] = [
  { heading: 'Product', links: ['Browse items', 'Report an item', 'Track a case'] },
  { heading: 'Company', links: ['About', 'Venues & partners', 'Contact'] },
  { heading: 'Trust', links: ['Privacy', 'Safe handover guide', 'Terms'] },
];

export function Footer({ className, ...rest }: FooterProps) {
  const classes = ['footer', className].filter(Boolean).join(' ');

  return (
    <footer {...rest} className={classes}>
      <div className="footer__top">
        <div className="footer__brand">
          {/* Logo instance 162:72: Theme Light, Size Medium (mark 40, no
              plate), wordmark overridden to color/text/static/light. */}
          <Logo className="footer__logo" Theme="Light" Size="Medium" />
          <p className="footer__tagline">
            A smarter way to reunite people with the things they have lost,
            through trusted venues and verified claims.
          </p>
        </div>
        <nav className="footer__columns" aria-label="Footer">
          {COLUMNS.map((column) => {
            const headingId = `footer-heading-${column.heading.toLowerCase()}`;
            return (
              <div className="footer__column" key={column.heading}>
                <h2 className="footer__heading" id={headingId}>
                  {column.heading}
                </h2>
                <ul className="footer__links" aria-labelledby={headingId}>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a className="footer__link" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="footer__bottom">
        <p className="footer__copyright">© 2026 Lemonade Found</p>
        <p className="footer__note">
          Private ownership details are never shown publicly.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
