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
        type: 'number',
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
      'ui:placeholder': '_ _ _ - _ _ _ - _ _ _ _',
      'ui:description': 'Enter a 10 digit phone number',
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
      canPickUpMedications: {
        type: 'boolean',
        title:
          'If necessary, can you come to the Austin Animal Center once a month to pick up heartworm and parasite prevention medications?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      isFosteringFromOtherOrg: {
        type: 'boolean',
        title:
          'Are you currently fostering an animal from another organization?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      fosteringExperience: {
        type: 'array',
        title: 'Do you have experience with any of the following:',
        items: {
          type: 'string',
          enum: [
            'Bottle-feeding infant kittens or puppies',
            'Administering medications (for example, oral, topical, injections, or eye drops)',
            'Behavior issues, basic obedience training, or socialization',
            'None of the above',
          ],
        },
        uniqueItems: true,
      },
      hasInterestInAvailableAnimal: {
        type: 'boolean',
        title:
          'Is there already an Austin Animal Center animal you are interested in fostering?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      infoAboutAnimalOfInterest: {
        type: 'string',
        title: 'Which animal is it or where did you hear about it?',
      },
    },
  },
  ui: {
    isOver18: {
      'ui:autofocus': true,
      'ui:widget': props => {
        return (
          <Radio
            html={
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
            type="danger"
            displayMessageOnValue={false}
            {...props}
          />
        );
      },
    },
    hasReliableTransportation: {
      'ui:widget': 'coaRadio',
      'ui:description':
        'Note that city buses only allow service animals on board, and taxi and ride share drivers do not always allow animals. There may be pet transportation companies in your area.',
      'ui:options': {
        html: (
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
              help in other ways, please visit
              <a href="http://www.austintexas.gov/department/volunteer">
                our volunteer page
              </a>.
            </p>
          </div>
        ),
        type: 'warning',
        displayMessageOnValue: false,
      },
    },
    canPickUpMedications: {
      'ui:widget': 'coaRadio',
      'ui:description': 'We provide all medications at no cost to you.',
      'ui:options': {
        html: (
          <div>
            <p>
              You may continue with the application, but if you cannot go get
              medications, you should consider only doing short term foster
              periods of two weeks or less.
            </p>
            <p>
              It is vital that foster animals receive their medication for their
              health and the health of animals around them.
            </p>
          </div>
        ),
        type: 'warning',
        displayMessageOnValue: false,
      },
    },
    isFosteringFromOtherOrg: {
      'ui:widget': 'coaRadio',
      'ui:options': {
        html: (
          <div>
            <p>
              Fostering with other organizations does not disqualify you from
              fostering, but we do require that when you have one of the Austin
              Animal Center’s animals in your home, that you do not have foster
              animals from other organizations at the same time.
            </p>
            <p>
              This is to protect the health, safety, and overall well-being of
              the animals. If you feel that you have a special circumstance that
              you would like for us to consider, please let us know.
            </p>
          </div>
        ),
        type: 'warning',
        displayMessageOnValue: true,
      },
    },
    fosteringExperience: {
      'ui:widget': 'checkboxes',
      'ui:description':
        'You will not be disqualified for not having a certain experience.',
    },
    hasInterestInAvailableAnimal: {
      'ui:widget': 'coaRadio',
      'ui:description':
        'For example, if you saw one on a Facebook post. This does not guarantee that the animal will be placed with you, but we will take you into consideration.',
    },
    infoAboutAnimalOfInterest: {
      condition: 'hasInterestInAvailableAnimal=true',
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
      'ui:description': `"Alone" means without people to monitor eating, behavior, and going to the bathroom. For example, if you work in an office from 9am-5pm but come home from 12-1pm, then the longest time period alone would be 4 hours.`,
      'ui:options': {
        messages: [
          {
            displayMessageOnValue: '8-12 hours',
            type: 'info',
            html: (
              <div>
                <b>
                  While we won’t limit your foster choices, you’d be a great
                  candidate for healthy adult or senior dogs or cats.
                </b>
                <p>
                  The dogs can generally be alone 8-12 hours at a time, and the
                  cats can usually go 10 hours or more as long as they have
                  access to everything that they need.
                </p>
              </div>
            ),
          },
          {
            displayMessageOnValue: '12+ hours',
            type: 'info',
            html: (
              <div>
                <b>
                  Being gone for several hours is okay! While we won’t limit
                  your foster choices, you’d be a great candidate for healthy
                  adult and senior cats.
                </b>
                <p>
                  They can usually go 12 hours or more as long as they have
                  access to everything that they need.
                </p>
                <p>
                  You may also be a good candidate for animal outings or
                  overnight stays.
                </p>
              </div>
            ),
          },
        ],
      },
    },
    canYouMeet: {
      'ui:widget': 'coaRadio',
      'ui:description':
        'These meetings would be scheduled by you, at times and locations of your choice.',
      'ui:options': {
        html: (
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
        type: 'warning',
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
        enum: ['Yes', 'No', 'Maybe'],
        uniqueItems: true,
      },
      hasChildrenUnder18: {
        type: 'boolean',
        title: 'Do any children under 18 live in your home or visit often?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      listOfChildrensAges: {
        type: 'string',
        title:
          'Please list the ages of all children under 18 living in or often visiting your home.',
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
      'ui:widget': 'coaRadio',
      'ui:description':
        'These meetings would be scheduled by you, at times and locations of your choice.',
      'ui:options': {
        html: (
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
        type: 'warning',
        displayMessageOnValue: ['No', 'Maybe'],
      },
    },
    hasChildrenUnder18: {
      'ui:widget': 'coaRadio',
      'ui:emptyValue': false,
    },
    listOfChildrensAges: {
      condition: 'hasChildrenUnder18=true',
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
      areAllDogsSpayedOrNeutered: {
        type: 'boolean',
        title: 'Are all of the above dogs spayed or neutered?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      areAllDogsVaccinated: {
        type: 'boolean',
        title: 'Do all of the above dogs have current rabies vaccinations?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      hasCatAtHome: {
        type: 'boolean',
        title: 'Do any cats live in your home or visit often?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      cats: {
        type: 'array',
        title: 'Cats',
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
      areAllCatsSpayedOrNeutered: {
        type: 'boolean',
        title: 'Are all of the above cats spayed or neutered?',
        enum: [true, false],
        enumNames: ['Yes', 'No'],
      },
      areAllCatsVaccinated: {
        type: 'boolean',
        title: 'Do all of the above cats have current rabies vaccinations?',
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
      otherAnimals: {
        type: 'string',
        title: 'Please list the other types of animals.',
      },
      isAbleToSeperateFosterAnimals: {
        type: 'string',
        title:
          'Inside your home, are you able to separate your foster animals from your own animals or the animals that often visit if needed?',
        help: `Until your animals and foster animals get used to each other or in case one gets sick, they may need to be separated for each other's safety and well-being.`,
        enum: ['Yes', 'No', 'Maybe'],
      },
    },
  },
  ui: {
    'ui:order': [
      'hasAnimals',
      'hasDogAtHome',
      'dogs',
      'areAllDogsSpayedOrNeutered',
      'areAllDogsVaccinated',
      'hasCatAtHome',
      'cats',
      'areAllCatsSpayedOrNeutered',
      'areAllCatsVaccinated',
      'hasOtherAnimalsAtHome',
      'otherAnimals',
      'isAbleToSeperateFosterAnimals',
    ],
    hasAnimals: {
      'ui:autofocus': true,
      'ui:widget': 'coaRadio',
    },
    hasDogAtHome: {
      'ui:widget': 'coaRadio',
      condition: 'hasAnimals=true',
    },
    dogs: {
      condition: 'hasDogAtHome=true',
      'ui:options': {
        orderable: false,
      },
    },
    areAllDogsSpayedOrNeutered: {
      'ui:widget': 'coaRadio',
      condition: 'hasDogAtHome=true',
    },
    areAllDogsVaccinated: {
      'ui:widget': 'coaRadio',
      condition: 'hasDogAtHome=true',
      'ui:options': {
        html: (
          <div>
            <p>
              You may still continue the application, but please vaccinate your
              dogs or make sure any dogs visiting your home often get vaccinated
              by their owners before bringing home a foster animal.
            </p>
            <p>
              By law in the State of Texas, all dogs must be vaccinated for
              rabies.
            </p>
          </div>
        ),
        type: 'warning',
        displayMessageOnValue: false,
      },
    },
    hasCatAtHome: {
      'ui:widget': 'coaRadio',
      condition: 'hasAnimals=true',
    },
    cats: {
      condition: 'hasCatAtHome=true',
      'ui:options': {
        orderable: false,
      },
    },
    areAllCatsSpayedOrNeutered: {
      'ui:widget': 'coaRadio',
      condition: 'hasCatAtHome=true',
    },
    areAllCatsVaccinated: {
      'ui:widget': 'coaRadio',
      condition: 'hasCatAtHome=true',
      'ui:options': {
        html: (
          <div>
            <p>
              You may still continue the application, but please vaccinate your
              cats or make sure any cats coming into your home often get
              vaccinated by their owners before bringing home a foster animal.
            </p>
            <p>
              By law in the State of Texas, all cats must be vaccinated for
              rabies.
            </p>
          </div>
        ),
        type: 'warning',
        displayMessageOnValue: false,
      },
    },
    hasOtherAnimalsAtHome: {
      'ui:widget': 'coaRadio',
      condition: 'hasAnimals=true',
    },
    otherAnimals: {
      'ui:widget': 'textarea',
      condition: 'hasOtherAnimalsAtHome=true',
    },
    isAbleToSeperateFosterAnimals: {
      'ui:widget': 'coaRadio',
      condition: 'hasAnimals=true',
      'ui:description': `Until your animals and foster animals get used to each other or in case one gets sick, they may need to be separated for each other's safety and well-being.`,
      'ui:options': {
        html: (
          <div>
            <p>
              You may continue the application, but before taking home a foster
              animal, please consider your options and determine how you could
              separate the animals if needed.
            </p>
            <p>
              It is important that you have a plan in place to separate foster
              pets from the other pets in your home for their safety and
              well-being. It can be as simple as keeping them in separate rooms,
              crates, or using a baby gate as a barrier.
            </p>
          </div>
        ),
        type: 'warning',
        displayMessageOnValue: ['No', 'Maybe'],
      },
    },
  },
};

const step6 = {
  schema: {
    title: 'Tell us how we can help you foster',
    type: 'object',
    properties: {
      concerns: {
        title:
          'Do you have any other questions or concerns not covered in this form or is there anything else you would like us to know?',
        type: 'string',
      },
    },
  },
  ui: {
    concerns: {
      'ui:widget': 'textarea',
      'ui:description': 'Optional',
      'ui:autofocus': true,
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
  6: step6,
  widgets,
};
