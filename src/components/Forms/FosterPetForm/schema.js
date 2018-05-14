import React from 'react';
import RadioWithConditionalMessage from 'components/Forms/FormElements/RadioWithConditionalMessage';

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
      type: 'boolean',
      title: 'Are you age 18 or older?',
      enum: [true, false],
      enumNames: ['Yes', 'No'],
      uniqueItems: true,
    },
    hasReliableTransportation: {
      type: 'boolean',
      title:
        'Do you have reliable transportation, such as your own car or access to a car whenever you need it, to bring your foster animal to the Austin Animal Center for free foster animal veterinary care or in the event of an emergency?',
      enum: [true, false],
      enumNames: ['Yes', 'No'],
      uniqueItems: true,
    },
  },
};

const uiSchemaStep2 = {
  isOver18: {
    'ui:autofocus': true,
    'ui:widget': props => {
      return (
        <RadioWithConditionalMessage
          message={
            <div>
              <p>
                Unfortunately, we cannot accept your application at this time.
              </p>
              <p>
                Please ask a member of your household who is over 18 to apply.
              </p>
              <p>
                If you are applying to fulfill volunteer hours, you can still
                foster and receive credit even though someone else filled out
                the application.
              </p>
            </div>
          }
          messageType="danger"
          displayMessageOnValue={false}
          {...props}
        />
      );
    },
  },
  hasReliableTransportation: {
    'ui:widget': props => {
      return (
        <RadioWithConditionalMessage
          message={
            <div>
              <p>
                You may continue the application, but you must have a reliable
                transportation plan in place before fostering.
              </p>
              <p>
                Foster animals must receive veterinary care immediately,
                especially in the event of an emergency.
              </p>
              <p>
                If you cannot get a reliable plan in place, but you would like
                to help in other ways, please visit{' '}
                <a href="http://www.austintexas.gov/department/volunteer">
                  our volunteer page
                </a>.
              </p>
            </div>
          }
          messageType="warning"
          displayMessageOnValue={false}
          {...props}
        />
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
