import { useId } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import type { StatusBadgeStatus } from '../StatusBadge/StatusBadge';

export type ItemCardLayout = 'Grid' | 'List' | 'Grid Large';
export type ItemCardState = 'Default' | 'Hover';

export type ItemCardProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'style' | 'children' | 'title'
> & {
  Layout?: ItemCardLayout;
  /** Pins the hover look for stories. A real pointer shows it on its own. */
  State?: ItemCardState;
  /** Figma boolean "Show status". Turns the nested Status Badge off. */
  'Show status'?: boolean;
  /** Figma text property. Also the card's accessible name. */
  Title?: string;
  /** Figma text property: the place and time, such as Central Station · 2h ago. */
  Meta?: string;
  /** The nested Status Badge's Status property. Found by default. */
  Status?: StatusBadgeStatus;
  /** Photo URL. The placeholder icon shows until one is given. */
  Photo?: string;
  /** Describes the item, such as "Black leather wallet". Needed with Photo. */
  PhotoAlt?: string;
  /** The whole card is one link to the item page. */
  href?: string;
};

export function ItemCard({
  Layout = 'Grid',
  State = 'Default',
  'Show status': showStatus = true,
  Title = 'Black leather wallet',
  Meta = 'Central Station · 2h ago',
  Status = 'Found',
  Photo,
  PhotoAlt = '',
  href = '#',
  className,
  ...rest
}: ItemCardProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const metaId = `${id}-meta`;
  const statusId = `${id}-status`;
  const classes = ['item-card', className].filter(Boolean).join(' ');

  return (
    <a
      {...rest}
      href={href}
      className={classes}
      data-card-layout={Layout}
      data-state={State}
      aria-labelledby={titleId}
      aria-describedby={showStatus ? `${statusId} ${metaId}` : metaId}
    >
      <span className="item-card__photo">
        {Photo ? (
          <img className="item-card__image" src={Photo} alt={PhotoAlt} />
        ) : (
          <Icon Name="box" Size="xl" className="item-card__placeholder" />
        )}
      </span>
      <span className="item-card__body">
        {showStatus ? <StatusBadge id={statusId} Status={Status} /> : null}
        <span id={titleId} className="item-card__title">
          {Title}
        </span>
        <span id={metaId} className="item-card__meta">
          {Meta}
        </span>
      </span>
    </a>
  );
}

export default ItemCard;
