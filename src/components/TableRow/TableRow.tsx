import type { HTMLAttributes } from 'react';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import type { StatusBadgeStatus } from '../StatusBadge/StatusBadge';
import { LinkButton } from '../LinkButton/LinkButton';

export type TableRowType = 'Header' | 'Body' | 'Body Hover';

export type TableRowProps = Omit<HTMLAttributes<HTMLTableRowElement>, 'style' | 'children'> & {
  /** Body Hover pins the hover look for display. A real pointer over a Body row shows it too. */
  Type?: TableRowType;
  /** Cell text. In a Header row these are the column labels. */
  Reference?: string;
  Item?: string;
  Owner?: string;
  Location?: string;
  /** Body rows: the nested Status Badge. Header rows: the column label. */
  Status?: StatusBadgeStatus | string;
  /** Body rows: the nested Link Button label. Header rows: the column label. */
  Action?: string;
};

const HEADER_LABELS = {
  Reference: 'Reference',
  Item: 'Item',
  Owner: 'Owner',
  Location: 'Location',
  Status: 'Status',
  Action: 'Action',
};

const BODY_VALUES = {
  Reference: 'LF-2041',
  Item: 'Black leather wallet',
  Owner: 'Aye Chan',
  Location: 'Central Station',
  Status: 'Verified',
  Action: 'Review',
};

export function TableRow({
  Type = 'Header',
  Reference,
  Item,
  Owner,
  Location,
  Status,
  Action,
  className,
  ...rest
}: TableRowProps) {
  const classes = ['table-row', className].filter(Boolean).join(' ');
  const isHeader = Type === 'Header';
  const defaults = isHeader ? HEADER_LABELS : BODY_VALUES;
  const reference = Reference ?? defaults.Reference;
  const item = Item ?? defaults.Item;
  const owner = Owner ?? defaults.Owner;
  const location = Location ?? defaults.Location;
  const status = Status ?? defaults.Status;
  const action = Action ?? defaults.Action;

  if (isHeader) {
    const labels = [reference, item, owner, location, status, action];
    return (
      <tr {...rest} className={classes} data-type={Type}>
        {labels.map((label, i) => (
          <th key={i} scope="col" className="table-row__cell">
            <span className="table-row__text">{label}</span>
          </th>
        ))}
      </tr>
    );
  }

  return (
    <tr {...rest} className={classes} data-type={Type}>
      <td className="table-row__cell">
        <span className="table-row__text" title={reference}>{reference}</span>
      </td>
      <td className="table-row__cell">
        <span className="table-row__text" title={item}>{item}</span>
      </td>
      <td className="table-row__cell">
        <span className="table-row__text" title={owner}>{owner}</span>
      </td>
      <td className="table-row__cell">
        <span className="table-row__text" title={location}>{location}</span>
      </td>
      <td className="table-row__cell">
        <StatusBadge Status={status as StatusBadgeStatus} />
      </td>
      <td className="table-row__cell">
        <LinkButton Label={action} aria-label={`${action} ${reference}`} />
      </td>
    </tr>
  );
}

export default TableRow;
