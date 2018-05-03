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

const schemaStep2 = {
  title: 'something new',
  type: 'object',
  properties: {
    hi: {
      type: 'string',
      title: 'yo',
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

const uiSchemaStep2 = {
  hi: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
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
