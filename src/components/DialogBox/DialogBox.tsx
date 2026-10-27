import { useEffect, useId, useRef } from 'react';
import type { HTMLAttributes, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button/Button';
import { Callout } from '../Callout/Callout';
import type { CalloutProps } from '../Callout/Callout';

export type DialogBoxType = 'Default' | 'Danger';

export type DialogBoxProps = Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'children' | 'title'> & {
  /** Figma property "Type". Danger renders role="alertdialog" and the negative confirm fill. */
  Type?: DialogBoxType;
  /** Figma property "Show callout". Hides the nested Callout when false. */
  ShowCallout?: boolean;
  /** Title text. A question that names the action. */
  Title?: string;
  /** Body text. One or two sentences on what happens next. */
  Body?: string;
  /** Props for the nested Callout (Privacy by default). */
  CalloutProps?: CalloutProps;
  /** Cancel button label. */
  CancelLabel?: string;
  /** Confirm button label. The same action as the title. */
  ConfirmLabel?: string;
  /** Whether the dialog is open. When false nothing renders. */
  open?: boolean;
  /** Called by Cancel and by Escape. */
  onCancel?: () => void;
  /** Called by Confirm. */
  onConfirm?: () => void;
};

const DEFAULT_TEXT: Record<DialogBoxType, { Title: string; Body: string; ConfirmLabel: string }> = {
  Default: {
    Title: 'Approve this claim?',
    Body: 'The owner will be notified and can arrange a handover.',
    ConfirmLabel: 'Approve claim',
  },
  Danger: {
    Title: 'Reject this claim?',
    Body: 'The owner will be told the claim was not approved. This cannot be undone.',
    ConfirmLabel: 'Reject claim',
  },
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusables(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
}

export function DialogBox({
  Type = 'Default',
  ShowCallout = true,
  Title,
  Body,
  CalloutProps,
  CancelLabel = 'Cancel',
  ConfirmLabel,
  open = true,
  onCancel,
  onConfirm,
  className,
  ...rest
}: DialogBoxProps) {
  const titleId = useId();
  const bodyId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;

  const text = DEFAULT_TEXT[Type];
  const title = Title ?? text.Title;
  const body = Body ?? text.Body;
  const confirmLabel = ConfirmLabel ?? text.ConfirmLabel;

  /* Open: remember the trigger, move focus to Cancel (the safe choice, first
     in the reading order), and keep focus inside while open.
     Close or unmount: return focus to the trigger. */
  useEffect(() => {
    if (!open) return undefined;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusCancel = () =>
      panelRef.current?.querySelector<HTMLButtonElement>('.dialog-box__cancel')?.focus();
    focusCancel();

    const keepFocusInside = (event: FocusEvent) => {
      const panel = panelRef.current;
      if (panel && event.target instanceof Node && !panel.contains(event.target)) {
        focusCancel();
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancelRef.current?.();
      }
    };
    document.addEventListener('focusin', keepFocusInside);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('focusin', keepFocusInside);
      document.removeEventListener('keydown', closeOnEscape);
      if (trigger && trigger.isConnected && trigger !== document.body) {
        trigger.focus();
      }
    };
  }, [open]);

  /* Tab and Shift+Tab wrap between the first and last focusable element. */
  const trapTab = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;
    const items = focusables(panelRef.current);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  const classes = ['dialog-box', className].filter(Boolean).join(' ');

  /* Rendered at the end of <body>, so it paints over the page without a
     z-index value. The scrim (color/bg/scrim) dims the page behind it. */
  return createPortal(
    <div
      className="dialog-box__scrim"
      onMouseDown={(event) => {
        /* A press on the scrim does nothing and must not take focus out of
           the dialog. Closing on a scrim click is not specified by the node. */
        if (event.target === event.currentTarget) event.preventDefault();
      }}
    >
      <div
        {...rest}
        ref={panelRef}
        tabIndex={-1}
        className={classes}
        data-type={Type}
        role={Type === 'Danger' ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        onKeyDown={trapTab}
      >
        <h2 id={titleId} className="dialog-box__title">
          {title}
        </h2>
        <p id={bodyId} className="dialog-box__body">
          {body}
        </p>
        {ShowCallout ? <Callout {...CalloutProps} className="dialog-box__callout" /> : null}
        <div className="dialog-box__actions">
          <Button Style="Outline" Label={CancelLabel} onClick={onCancel} className="dialog-box__cancel" />
          <Button Style="Primary" Label={confirmLabel} onClick={onConfirm} className="dialog-box__confirm" />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default DialogBox;
