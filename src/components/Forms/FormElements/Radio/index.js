import React from 'react';
import { includes } from 'lodash';

const Radio = props => {
  const {
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
  } = props;
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions } = options;

  // compare props vs ui:options
  const message = props.message || options.message;
  const messageType = props.messageType || options.messageType;
  const displayMessageOnValue =
    props.displayMessageOnValue || options.displayMessageOnValue || false;

  const shouldDisplayMessage = () => {
    // Allow ui schema users to pass in an array of values that display a warning message.
    if (
      Array.isArray(displayMessageOnValue) &&
      displayMessageOnValue.length > 1
    ) {
      return message && includes(displayMessageOnValue, value);
    }
    return message && value === displayMessageOnValue;
  };

  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <fieldset className="field-radio-group">
      {enumOptions.map((option, i) => {
        const checked = option.value === value;
        const disabledCls = disabled || readonly ? 'disabled' : '';
        const radio = (
          <span
            className="radio"
            onClick={_ => onChange(option.value)}
            key={`${name}-${i}`}
          >
            <input
              className="coa-Radio"
              type="radio"
              checked={checked}
              name={name}
              required={required}
              value={option.value}
              disabled={disabled || readonly}
              autoFocus={autofocus && i === 0}
              onChange={_ => onChange(option.value)}
            />
            <label>{option.label}</label>
          </span>
        );

        return radio;
      })}

      {shouldDisplayMessage() && (
        <FormAlert type={messageType}>{message}</FormAlert>
      )}
    </fieldset>
  );
};

export default Radio;

const FormAlert = ({ type, children }) => (
  <div className={`alert alert-${type} alert-body`}>{children}</div>
);
