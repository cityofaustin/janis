import React from 'react';

const RadioWithConditionalMessage = props => {
  const {
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    message,
    messageType,
    displayMessageOnValue,
  } = props;
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions } = options;

  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <fieldset className="field-radio-group">
      {enumOptions.map((option, i) => {
        const checked = option.value === value;
        const disabledCls = disabled || readonly ? 'disabled' : '';
        const radio = (
          <span className="radio" onClick={_ => onChange(option.value)}>
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

      {value === displayMessageOnValue && (
        <FormAlert type={messageType}>{message}</FormAlert>
      )}
    </fieldset>
  );
};

export default RadioWithConditionalMessage;

const FormAlert = ({ type, children }) => (
  <div className={`alert alert-${type} alert-body`}>{children}</div>
);
