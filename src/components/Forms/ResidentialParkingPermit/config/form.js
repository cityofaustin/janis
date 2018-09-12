import Introduction from '../Introduction.jsx';
import { phoneConfig } from 'us-forms-system/lib/js/definitions/phone';

const formConfig = {
  title: 'Apply for a Residential Parking Permit',
  //subTitle: 'This is a test.',
  formId: '',
  urlPrefix: '/',
  trackingPrefix: 'form-',
  transformForSubmit: '',
  submitUrl: '',
  introduction: Introduction,
  confirmation: '',
  defaultDefinitions: {},
  chapters: {
    firstChapter: {
      title: 'Contact information',
      pages: {
        page1: {
          path: 'contact-information',
          title: 'Contact information',
          schema: {
            type: 'object',
            properties: {
              'view:textObject': {
                type: 'object',
                properties: {},
              },
              firstName: {
                type: 'string',
              },
              lastName: {
                type: 'string',
              },
              email: {
                type: 'string',
                format: 'email',
              },
              // TODO: Figure out why the phone definition is breaking stuff; see https://github.com/usds/us-forms-system/blob/44bf861a0fe641f7d566c70cffb5d3ffd44ba9af/docs/building-a-form/common-definitions.md#phone
              //phone: phoneConfig.schema(),
              phone: {
                type: 'string',
                minLength: '10',
              },
              street: {
                type: 'string',
              },
              city: {
                type: 'string',
              },
              state: {
                type: 'string',
                enum: ['AK', 'IL', 'MA', 'TX', 'WY'],
              },
              zip: {
                type: 'string',
                pattern: '^[0-9]{5}$',
              },
            },
          },
          uiSchema: {
            'view:textObject': {
              'ui:description': 'Tell us how to contact you.',
            },
            firstName: {
              'ui:title': 'First name',
            },
            lastName: {
              'ui:title': 'Last name',
            },
            email: {
              'ui:title': 'Email address',
            },
            // phone: phoneConfig.uiSchema('Phone number'),
            phone: {
              'ui:title': 'Phone number',
              'ui:description': 'Enter a 10 digit phone number',
              'ui:errorMessages': {
                minLength: 'Please enter a valid 10 digit phone number',
              },
            },
            street: {
              'ui:title': 'Street',
            },
            city: {
              'ui:title': 'City',
            },
            state: {
              'ui:title': 'State',
              'ui:options': {
                labels: {
                  AK: 'Alaska',
                  IL: 'Illinois',
                  MA: 'Massachusetts',
                  TX: 'Texas',
                  WY: 'Wyoming',
                },
              },
            },
            zip: {
              'ui:title': 'ZIP code',
              'ui:errorMessages': {
                pattern: 'Please enter a valid 5 digit US ZIP code.',
              },
            },
          },
        },
      },
    },
    secondChapter: {
      title: 'Proof of residency',
      pages: {
        page2: {
          path: 'proof-of-residency',
          title: 'Proof of residency',
          schema: {
            type: 'object',
            properties: {
              proofOptions: {
                type: 'string',
                enum: ['license', 'lease', 'bill', 'accountNumber'],
              },
              // There is currently no file upload capability in USFS, see https://github.com/usds/us-forms-system/issues/52, so this is Mozilla RJSF implmentation via https://github.com/mozilla-services/react-jsonschema-form#file-widgets
              licenseUpload: {
                type: 'string',
                format: 'data-url',
              },
              leaseUpload: {
                type: 'string',
                format: 'data-url',
              },
              billUpload: {
                type: 'string',
                format: 'data-url',
              },
              accountNumberEntry: {
                type: 'string',
                pattern: '^[0-9]{10}$',
              },
            },
          },
          uiSchema: {
            proofOptions: {
              'ui:title':
                'Which options would you like to submit for your proof of residency?',
              'ui:widget': 'radio',
              'ui:options': {
                labels: {
                  license: "your driver's license or identification card",
                  lease: 'your current lease or mortgage agreement',
                  bill: 'your utility bill issued within the last 30 days',
                  accountNumber: 'your utility bill account number',
                },
              },
            },
            //TODO: Make the ___Upload fields appear under the selected option — maybe? (There might be a simpler pattern UX pattern...)
            licenseUpload: {
              'ui:title':
                "Upload an image of your driver's license or identification card.",
              'ui:options': {
                expandUnder: 'proofOptions',
                expandUnderCondition: 'license',
              },
            },
            leaseUpload: {
              'ui:title':
                'Upload an image of your current lease or mortgage agreement.',
              'ui:options': {
                expandUnder: 'proofOptions',
                expandUnderCondition: 'lease',
              },
            },
            billUpload: {
              'ui:title':
                'Upload an image of a utility bill issued to you in the last 30 days.',
              'ui:options': {
                expandUnder: 'proofOptions',
                expandUnderCondition: 'bill',
              },
            },
            accountNumberEntry: {
              'ui:title': 'Enter your City of Austin Utilities account number.',
              'ui:description':
                'Your account number may be found on the upper righthand corner of your utility bill.',
              'ui:options': {
                expandUnder: 'proofOptions',
                expandUnderCondition: 'accountNumber',
              },
              'ui:errorMessages': {
                pattern: 'Please enter a valid 10 digit number.',
              },
            },
          },
        },
      },
    },
  },
};

export default formConfig;
