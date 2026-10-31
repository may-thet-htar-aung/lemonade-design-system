import { useEffect, useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';

export type InputType = 'Single' | 'Multi' | 'Password Hidden' | 'Password Shown';
export type InputState = 'Default' | 'Focused' | 'Error' | 'Disabled';

export type InputProps = {
  Type?: InputType;
  State?: InputState;
  /** Figma property "Show label". Do not hide the label in real forms. */
  'Show label'?: boolean;
  /** Figma property "Show helper". Turn off when there is no hint and no error. */
  'Show helper'?: boolean;
  /** Figma property "Icon Right". Shows the right icon, chevron-down by default. */
  'Icon Right'?: boolean;
  /** Figma slot "Icon Right swap". Replaces the default chevron-down. */
  'Icon Right swap'?: ReactNode;
  Label?: string;
  Placeholder?: string;
  /** Hint text. On Error it carries the message that says how to fix the answer. */
  Helper?: string;
  /** Initial value. The field is uncontrolled. */
  defaultValue?: string;
  name?: string;
  className?: string;
  /** Called when the eye toggle switches a password between hidden and shown. */
  onTypeChange?: (type: 'Password Hidden' | 'Password Shown') => void;
};

export function Input({
  Type = 'Single',
  State = 'Default',
  'Show label': showLabel = true,
  'Show helper': showHelper = true,
  'Icon Right': iconRight = false,
  'Icon Right swap': iconRightSwap = null,
  Label = 'Label',
  Placeholder = 'Placeholder',
  Helper = 'Helper text',
  defaultValue,
  name,
  className,
  onTypeChange,
}: InputProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const [type, setType] = useState<InputType>(Type);
  useEffect(() => setType(Type), [Type]);

  const isMulti = type === 'Multi';
  const isPassword = type === 'Password Hidden' || type === 'Password Shown';
  const isShown = type === 'Password Shown';
  const isDisabled = State === 'Disabled';
  const isError = State === 'Error';
  const hasHelper = showHelper && Helper !== '';

  const toggle = () => {
    const next = isShown ? 'Password Hidden' : 'Password Shown';
    setType(next);
    onTypeChange?.(next);
  };

  const common = {
    id,
    name,
    className: 'input__control',
    placeholder: Placeholder,
    defaultValue,
    disabled: isDisabled,
    'aria-invalid': isError ? true : undefined,
    'aria-describedby': hasHelper ? helperId : undefined,
  };

  const classes = ['input', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-type={type} data-state={State}>
      {showLabel ? (
        <label className="input__label" htmlFor={id}>
          {Label}
        </label>
      ) : null}
      <div className="input__field">
        {isMulti ? (
          <textarea {...common} />
        ) : (
          <input {...common} type={isPassword && !isShown ? 'password' : 'text'} />
        )}
        {iconRight
          ? (iconRightSwap != null ? <span className="input__icon" aria-hidden="true">{iconRightSwap}</span> : <Icon Name="chevron-down" Size="md" className="input__icon" />)
          : null}
        {isPassword ? (
          <button
            type="button"
            className="input__toggle"
            aria-label={isShown ? 'Hide password' : 'Show password'}
            aria-pressed={isShown}
            disabled={isDisabled}
            onClick={toggle}
          >
            <Icon Name={isShown ? 'eye-off' : 'eye'} Size="md" />
          </button>
        ) : null}
      </div>
      {hasHelper ? (
        <p className="input__helper" id={helperId}>
          {Helper}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
