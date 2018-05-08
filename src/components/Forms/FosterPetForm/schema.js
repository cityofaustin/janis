import React from 'react';

const schemaStep1 = {
  title: 'Tell us how to contact you',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    email: {
      type: 'string',
      title: 'Email',
      format: 'email',
    },
    telephone: {
      type: 'integer',
      title: 'Phone Number',
      minLength: 10,
    },
    address1: {
      type: 'string',
      title: 'Street Address 1',
    },
    address2: {
      type: 'string',
      title: 'Street Address 2',
    },
    city: {
      type: 'string',
      title: 'City',
    },
    state: {
      type: 'string',
      title: 'State',
    },
    zip: {
      type: 'string',
      title: 'ZIP',
    },
  },
};

const uiSchemaStep1 = {
  firstName: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
  },
  email: {
    'ui:widget': 'email',
    'ui:title': 'Email',
  },
  telephone: {
    'ui:options': {
      inputType: 'tel',
    },
    'ui:help': 'Enter a 10 digit phone number',
  },
};

const schemaStep2 = {
  title: 'Tell us about yourself',
  type: 'object',
  properties: {
    isOver18: {
      type: 'string',
      title: 'Are you age 18 or older?',
      enum: ['Yes', 'No'],
      enumNames: ['Yes', 'No'],
      uniqueItems: true,
    },
  },
};

const uiSchemaStep2 = {
  isOver18: {
    'ui:autofocus': true,
    'ui:widget': 'radio',
  },
  isNotOver18Warning: {
    'ui:widget': props => {
      return (
        <div className="alert alert-danger alert-body">
          <p>Unfortunately, we cannot accept your application at this time.</p>
          <p>Please ask a member of your household who is over 18 to apply.</p>
          <p>
            If you are applying to fulfill volunteer hours, you can still foster
            and receive credit even though someone else filled out the
            application.
          </p>
        </div>
      );
    },
  },
};

export const multiStepSchema = {
  1: {
    schema: schemaStep1,
    ui: uiSchemaStep1,
  },
  2: {
    schema: schemaStep2,
    ui: uiSchemaStep2,
  },
};
