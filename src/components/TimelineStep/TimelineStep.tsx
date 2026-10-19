import { Icon } from '../Icon/Icon';
import './TimelineStep.css';

export type TimelineStepProps = {
  State?: 'Upcoming' | 'Current' | 'Done' | 'Event';
  /** Figma "Show line". Turn it off on the last step. */
  ShowLine?: boolean;
  Title?: string;
  Subtitle?: string;
  className?: string;
};

const STATE_WORDS: Record<NonNullable<TimelineStepProps['State']>, string | null> = {
  Done: 'Completed',
  Current: 'Current step',
  Upcoming: 'Not started',
  Event: null,
};

/** One step in a timeline. Render it inside an <ol>: it is the <li>. */
export function TimelineStep({
  State = 'Upcoming',
  ShowLine = true,
  Title = 'Report received',
  Subtitle = 'Today, 09:12',
  className,
}: TimelineStepProps) {
  const classes = ['timeline-step', className].filter(Boolean).join(' ');
  const stateWord = STATE_WORDS[State];
  return (
    <li className={classes} data-state={State} aria-current={State === 'Current' ? 'step' : undefined}>
      <div className="timeline-step__marker" aria-hidden="true">
        <span className="timeline-step__dot">
          {State === 'Done' && <Icon Name="check" Size="sm" />}
        </span>
        {ShowLine && <span className="timeline-step__line" />}
      </div>
      <div className="timeline-step__text">
        <p className="timeline-step__title">
          {stateWord && <span className="timeline-step__state-word">{stateWord}: </span>}
          {Title}
        </p>
        <p className="timeline-step__subtitle">{Subtitle}</p>
      </div>
    </li>
  );
}

export default TimelineStep;
