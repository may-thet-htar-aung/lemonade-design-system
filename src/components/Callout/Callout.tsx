import type { HTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import './Callout.css';

export type CalloutType = 'Privacy' | 'AI Match';

export type CalloutProps = Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'children' | 'title'> & {
  Type?: CalloutType;
  /** Figma property "Show body". Hides the body line when false. */
  ShowBody?: boolean;
  /** Title text. One short statement. */
  Title?: string;
  /** Body text. One sentence of detail. */
  Body?: string;
};

const DEFAULT_TEXT: Record<CalloutType, { Title: string; Body: string }> = {
  Privacy: {
    Title: 'Ownership details stay private',
    Body: 'Only you and verified staff can see them.',
  },
  'AI Match': {
    Title: 'We found a possible match',
    Body: 'Check the details before you claim it.',
  },
};

export function Callout({
  Type = 'Privacy',
  ShowBody = true,
  Title,
  Body,
  className,
  ...rest
}: CalloutProps) {
  const classes = ['callout', className].filter(Boolean).join(' ');
  const title = Title ?? DEFAULT_TEXT[Type].Title;
  const body = Body ?? DEFAULT_TEXT[Type].Body;

  /* Plain text, not role="alert": callouts are not urgent. The icon is
     decorative (Icon is aria-hidden without a Label); the title carries the meaning. */
  return (
    <div {...rest} className={classes} data-type={Type}>
      <Icon Name={Type === 'Privacy' ? 'lock' : 'sparkle'} Size="md" className="callout__icon" />
      <div className="callout__text">
        <p className="callout__title">{title}</p>
        {ShowBody ? <p className="callout__body">{body}</p> : null}
      </div>
    </div>
  );
}

export default Callout;
