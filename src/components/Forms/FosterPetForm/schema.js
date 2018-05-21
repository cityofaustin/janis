import React from 'react';
import Radio from 'components/Forms/FormElements/Radio';

const step1 = {
  schema: {
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
  },
  ui: {
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
  },
};

const step2 = {
  schema: {
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
  },
  ui: {
    isOver18: {
      'ui:autofocus': true,
      'ui:widget': props => {
        return (
          <Radio
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
        return <Radio {...props} />;
      },
      'ui:options': {
        message: (
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
              If you cannot get a reliable plan in place, but you would like to
              help in other ways, please visit{' '}
              <a href="http://www.austintexas.gov/department/volunteer">
                our volunteer page
              </a>.
            </p>
          </div>
        ),
        messageType: 'warning',
        displayMessageOnValue: false,
      },
    },
  },
};

const step3 = {
  schema: {
    title: 'Tell us your availability',
    type: 'object',
    properties: {
      longestTimeAlone: {
        type: 'string',
        title:
          'On an average day, what is the longest period of time foster animals will be left alone in the home?',
        enum: ['0-4 hours', '4-8 hours', '8-12 hours', '12+ hours'],
        // enumNames: ['Yes', 'No'],
        uniqueItems: true,
      },
      canYouMeet: {
        type: 'boolean',
        title:
          'Can you meet with and show the foster animal to people who might want to adopt it?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
        uniqueItems: true,
      },
    },
  },
  ui: {
    longestTimeAlone: {
      'ui:autofocus': true,
      'ui:widget': 'coaRadio',
      'ui:help':
        '"Alone" means without people to monitor eating, behavior, and going to the bathroom. For example, if you work in an office from 9am-5pm but come home from 12-1pm, then the longest time period alone would be 4 hours.',
    },
    canYouMeet: {
      'ui:widget': props => {
        return <Radio {...props} />;
      },
      'ui:help':
        'These meetings would be scheduled by you, at times and locations of your choice.',
      'ui:options': {
        message: (
          <div>
            <p>
              Promoting the foster animal and meeting with potential adopters is
              an important part of our program.
            </p>
            <p>
              When fostering an animal for AAC, you can be the animal’s number
              one advocate!
            </p>
          </div>
        ),
        messageType: 'warning',
        displayMessageOnValue: false,
      },
    },
  },
};

const step4 = {
  schema: {
    title: 'Tell us about your home',
    type: 'object',
    properties: {
      ownsHome: {
        type: 'boolean',
        title: 'Do you own your home?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
        uniqueItems: true,
      },
      hasPermissionFromLandlord: {
        type: 'boolean',
        title:
          'Do you have permission from your landlord or property manager to have an animal in your home?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
        uniqueItems: true,
      },
      willHaveAnimalIndoors: {
        type: 'string',
        title: 'Are you planning to have your foster animal live indoors?',
        enum: ['yes', 'no', 'maybe'],
        enumNames: ['Yes', 'No', 'Maybe'],
        uniqueItems: true,
      },
      hasChildrenUnder18: {
        type: 'boolean',
        title: 'Do any children under 18 live in your home or visit often?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
        uniqueItems: true,
      },
      listOfChildrensAges: {
        type: 'array',
        title:
          'Please list the ages of all children under 18 living in or often visiting your home.',
        items: {
          type: 'string',
        },
        uniqueItems: true,
      },
    },
  },
  ui: {
    ownsHome: {
      'ui:autofocus': true,
      'ui:widget': 'coaRadio',
    },
    hasPermissionFromLandlord: {
      'ui:widget': 'coaRadio',
    },
    willHaveAnimalIndoors: {
      'ui:widget': props => {
        return <Radio {...props} />;
      },
      'ui:help':
        'These meetings would be scheduled by you, at times and locations of your choice.',
      'ui:options': {
        message: (
          <div>
            <p>
              You may continue the application, but before bringing home a
              foster animal, make sure it can reside indoors:
            </p>
            <ul>
              <li>
                Kittens and cats should only be kept indoors, because there’s a
                high risk of them running away.
              </li>
              <li>
                Puppies and dogs should be kept primarily indoors, but can go
                outside for potty breaks, play time, and exercise.
              </li>
            </ul>
            <p>
              If you don't think you'll be able to have your foster animal live
              indoors, please let us know and we may be able to help you figure
              out a solution.
            </p>
          </div>
        ),
        messageType: 'warning',
        displayMessageOnValue: false,
      },
    },
    hasChildrenUnder18: {
      'ui:widget': 'coaRadio',
    },
    listOfChildrensAges: {
      'ui:options': {
        orderable: false,
      },
    },
  },
};

const step5 = {
  schema: {
    title: 'Tell us about your animals',
    type: 'object',
    properties: {
      hasAnimals: {
        type: 'boolean',
        title:
          'Do you currently have any animals that live in your home or visit often?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
        uniqueItems: true,
      },
      hasDogAtHome: {
        type: 'boolean',
        title: 'Do any dogs live in your home or visit often?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      dogs: {
        type: 'array',
        title: 'Dogs',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              title: `Your dog's name`,
            },
            age: {
              type: 'integer',
              title: `Your dog's age`,
            },
            weight: {
              type: 'string',
              title: `Your dog's weight`,
              enum: [
                `Small (Under 20 lbs)`,
                `Medium (20-40 lbs)`,
                `Large (40 lbs and higher)`,
              ],
            },
            sex: {
              type: 'string',
              title: `Your dog's sex`,
              enum: [`Female`, `Male`],
            },
          },
        },
      },
      hasCatAtHome: {
        type: 'boolean',
        title: 'Do any cats live in your home or visit often?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      hasOtherAnimalsAtHome: {
        type: 'boolean',
        title:
          'Do any other types of animals live in your home or visit often?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      isAbleToSeperateFosterAnimals: {
        type: 'string',
        title:
          'Inside your home, are you able to separate your foster animals from your own animals or the animals that often visit if needed?',
        help: `Until your animals and foster animals get used to each other or in case one gets sick, they may need to be separated for each other's safety and well-being.`,
        enum: ['yes', 'no', 'maybe'],
        enumNames: ['Yes', 'No', 'Maybe'],
      },
    },
  },
  ui: {
    'ui:order': [
      'hasAnimals',
      'hasDogAtHome',
      'dogs',
      'hasCatAtHome',
      'hasOtherAnimalsAtHome',
      'isAbleToSeperateFosterAnimals',
    ],
    hasAnimals: {
      'ui:widget': 'coaRadio',
    },
    hasDogAtHome: {
      'ui:widget': 'coaRadio',
      condition: 'hasAnimals=true',
    },
    dogs: {
      condition: 'hasDogAtHome=true',
      items: {},
      'ui:options': {
        orderable: false,
      },
    },
    hasCatAtHome: {
      'ui:widget': 'coaRadio',
      condition: 'hasAnimals=true',
    },
    hasOtherAnimalsAtHome: {
      'ui:widget': 'coaRadio',
      condition: 'hasAnimals=true',
    },
    isAbleToSeperateFosterAnimals: {
      'ui:widget': 'coaRadio',
      condition: 'hasAnimals=true',
    },
  },
};

const widgets = {
  coaRadio: Radio,
};

export const multiStepSchema = {
  1: step1,
  2: step2,
  3: step3,
  4: step4,
  5: step5,
  widgets,
};
