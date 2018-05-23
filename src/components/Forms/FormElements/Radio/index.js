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
  const messages = props.messages || options.messages;
  const html = props.html || options.html;
  const type = props.type || options.type;
  const displayMessageOnValue =
    props.displayMessageOnValue || options.displayMessageOnValue || false;

  const renderConditionalMessage = () => {
    // Allow ui schema users to pass more than one message for different radio selections.
    if (messages) {
      return messages.map((message, i) => {
        if (message.html && value === message.displayMessageOnValue) {
          return (
            <FormAlert key={i} type={message.type}>
              {message.html}
            </FormAlert>
          );
        }
      });
    }

    // Allow ui schema users to pass in an array of values that display the conditional message.
    if (
      Array.isArray(displayMessageOnValue) &&
      displayMessageOnValue.length > 1
    ) {
      return (
        html &&
        includes(displayMessageOnValue, value) && (
          <FormAlert type={type}>{html}</FormAlert>
        )
      );
    }

    // Most basic display of conditional alert
    return (
      html &&
      value === displayMessageOnValue && (
        <FormAlert type={type}>{html}</FormAlert>
      )
    );
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

      {renderConditionalMessage()}
    </fieldset>
  );
};

export default Radio;

const FormAlert = ({ type, children }) => (
  <div className={`alert alert-${type} alert-body`}>{children}</div>
);
