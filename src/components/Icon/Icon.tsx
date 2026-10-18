import './Icon.css';

const files = import.meta.glob<string>('./svg/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const ICON_NAMES = [
  'arrow-right',
  'bell',
  'box',
  'building',
  'camera',
  'check',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'clock',
  'collapse',
  'dashboard',
  'expand',
  'eye',
  'eye-off',
  'file',
  'filter',
  'flag',
  'handover',
  'home',
  'key',
  'list',
  'lock',
  'maximize',
  'menu',
  'pin',
  'plus',
  'search',
  'shield',
  'sparkle',
  'user',
  'users',
  'x',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

/* The exported artwork carries one fixed fill. Swap it for currentColor so a
   parent can set the colour with an icon token, and let the CSS set the size. */
const markup = Object.fromEntries(
  Object.entries(files).map(([path, raw]) => [
    path.replace('./svg/', '').replace('.svg', ''),
    raw
      .replace(/ width="\d+" height="\d+"/, ' width="100%" height="100%"')
      .replace(/ style="[^"]*"/, '')
      .replace(/ preserveAspectRatio="[^"]*"/, '')
      .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"'),
  ]),
) as Record<IconName, string>;

export type IconProps = {
  Name: IconName;
  /** Maps to --size-icon-sm/md/lg/xl/2xl/3xl, the documented range on Figma 76:12. */
  Size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  /** Decorative by default. Set a Label when the icon is the only thing that names an action. */
  Label?: string;
  className?: string;
};

export function Icon({ Name, Size = 'lg', Label, className }: IconProps) {
  const classes = ['icon', 'icon--' + Size, className].filter(Boolean).join(' ');
  return (
    <span
      className={classes}
      role={Label ? 'img' : undefined}
      aria-label={Label}
      aria-hidden={Label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: markup[Name] }}
    />
  );
}

export default Icon;
