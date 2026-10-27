import type { HTMLAttributes, ReactNode } from 'react';
import { TableRow } from '../TableRow/TableRow';

export type TableProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * Names what the table lists, such as "Recent reports". The node has no
   * caption, so the name is given as aria-label on the table element.
   */
  'aria-label'?: string;
  /**
   * Body rows: Table Row instances in Body type. The node holds five; when no
   * rows are passed, the table renders the node's five default Body rows.
   */
  children?: ReactNode;
};

const DEFAULT_BODY_ROWS = 5;

/**
 * Table (Figma node 141:8). The container draws the fill, outer border and
 * rounded corners and clips the rows. Rows come from Table Row (node 112:32):
 * one Header row in thead, Body rows in tbody. The node has no variant
 * properties, so the component has no variant props.
 */
export function Table({
  'aria-label': ariaLabel = 'Recent reports',
  children,
  className,
  ...rest
}: TableProps) {
  const classes = ['table', className].filter(Boolean).join(' ');
  const bodyRows =
    children ??
    Array.from({ length: DEFAULT_BODY_ROWS }, (_, i) => <TableRow key={i} Type="Body" />);

  return (
    <div {...rest} className={classes}>
      <table className="table__table" aria-label={ariaLabel}>
        <thead>
          <TableRow Type="Header" />
        </thead>
        <tbody>{bodyRows}</tbody>
      </table>
    </div>
  );
}

export default Table;
