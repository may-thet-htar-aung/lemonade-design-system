import type { HTMLAttributes } from 'react';

export type LogoSymbolColor = 'Brand' | 'Black' | 'White';
export type LogoSymbolSize = 'Small' | 'Medium' | 'Large';

export type LogoSymbolProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style' | 'children' | 'role'> & {
  Color?: LogoSymbolColor;
  Size?: LogoSymbolSize;
};

/** The node's accessibility note: the symbol carries the alt text "Lemonade Found" when it stands alone. */
const BRAND_NAME = 'Lemonade Found';

/*
 * Artwork: path data copied verbatim from the Figma export of
 * Logo/Symbol, Color=Brand, Size=Large (node 23:1477, 64 x 64).
 * The Small (32) and Medium (48) exports are the same geometry scaled by
 * 0.5 and 0.75, including the 25% corner radius, so one viewBox serves
 * every size. Fills come from CSS tokens.
 */
const TILE_PATH =
  'M0 16C0 7.163 7.163 0 16 0H48C56.837 0 64 7.163 64 16V48C64 56.837 56.837 64 48 64H16C7.163 64 0 56.837 0 48V16Z';
const MONOGRAM_PATH =
  'M48 11C50.2091 11 52 12.7909 52 15C52 17.2091 50.2091 19 48 19H37V28H44C46.2091 28 48 29.7909 48 32C48 34.2091 46.2091 36 44 36H37V49C37 51.2091 35.2091 53 33 53H18C15.7909 53 14 51.2091 14 49V15C14 12.7909 15.7909 11 18 11C20.2091 11 22 12.7909 22 15V45H29V15C29 12.7909 30.7909 11 33 11H48Z';

/**
 * Logo/Symbol: the Lemonade Found letter-mark (Figma node 23:1470).
 *
 * Stands alone by default, with the accessible name "Lemonade Found".
 * Pass `aria-hidden` when it sits next to text that already names the brand,
 * and it becomes decorative.
 */
export function LogoSymbol({
  Color = 'Brand',
  Size = 'Small',
  className,
  'aria-label': ariaLabel = BRAND_NAME,
  'aria-hidden': ariaHidden,
  ...rest
}: LogoSymbolProps) {
  const classes = ['logo-symbol', className].filter(Boolean).join(' ');
  const decorative = ariaHidden === true || ariaHidden === 'true';

  return (
    <span
      {...rest}
      className={classes}
      data-logo-symbol-color={Color}
      data-logo-symbol-size={Size}
      {...(decorative
        ? { 'aria-hidden': true }
        : { role: 'img', 'aria-label': ariaLabel })}
    >
      <svg className="logo-symbol__svg" viewBox="0 0 64 64" focusable="false" aria-hidden="true">
        <path className="logo-symbol__tile" d={TILE_PATH} />
        <path className="logo-symbol__monogram" d={MONOGRAM_PATH} />
      </svg>
    </span>
  );
}

export default LogoSymbol;
