import type { HTMLAttributes } from 'react';

export type LogoTheme = 'Light' | 'Dark' | 'Black' | 'White';
export type LogoSize = 'Small' | 'Medium' | 'Large';

export type LogoProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style' | 'children' | 'role'> & {
  Theme?: LogoTheme;
  Size?: LogoSize;
};

/** The brand name. It is the logo's accessible name; the mark and the visible wordmark are aria-hidden. */
const BRAND_NAME = 'Lemonade Found';

/*
 * Mark artwork: the Logo/Symbol tile and LF monogram, path data exported from
 * the Figma node (Logo/Symbol, 64 x 64 export). The same geometry is used at
 * every size and scaled through the viewBox. Fills come from CSS tokens.
 */
const TILE_PATH =
  'M0 16C0 7.163 7.163 0 16 0H48C56.837 0 64 7.163 64 16V48C64 56.837 56.837 64 48 64H16C7.163 64 0 56.837 0 48V16Z';
const MONOGRAM_PATH =
  'M48 11C50.2091 11 52 12.7909 52 15C52 17.2091 50.2091 19 48 19H37V28H44C46.2091 28 48 29.7909 48 32C48 34.2091 46.2091 36 44 36H37V49C37 51.2091 35.2091 53 33 53H18C15.7909 53 14 51.2091 14 49V15C14 12.7909 15.7909 11 18 11C20.2091 11 22 12.7909 22 15V45H29V15C29 12.7909 30.7909 11 33 11H48Z';

export function Logo({
  Theme = 'Light',
  Size = 'Medium',
  className,
  'aria-label': ariaLabel = BRAND_NAME,
  ...rest
}: LogoProps) {
  const classes = ['logo', className].filter(Boolean).join(' ');

  return (
    <span
      {...rest}
      role="img"
      aria-label={ariaLabel}
      className={classes}
      data-logo-theme={Theme}
      data-logo-size={Size}
    >
      <span className="logo__mark" aria-hidden="true">
        <svg className="logo__symbol" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
          <path className="logo__tile" d={TILE_PATH} />
          <path className="logo__monogram" d={MONOGRAM_PATH} />
        </svg>
      </span>
      <span className="logo__wordmark" aria-hidden="true">
        <span className="logo__wordmark-lemonade">Lemonade</span>
        <span className="logo__wordmark-found"> Found</span>
      </span>
    </span>
  );
}

export default Logo;
