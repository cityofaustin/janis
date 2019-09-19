import { defineMessages } from 'react-intl';

export const callToAction = defineMessages({
  enterAddress: 'Type your street address in the box below',
  submitOnlineRequest: 'Submit an online request',
  whatDoIDoWith:
    'Check the "What do I do with" tool below to find out what items are accepted.',
});

export const contact = defineMessages({
  questionsTitle: 'Still have questions? Contact:',
  closed: 'Closed',
  map: 'Map',
  phoneTTD: 'TDD/TTY',
});

export const date = defineMessages({
  weekdaySunday: 'Sunday',
  weekdayMonday: 'Monday',
  weekdayTuesday: 'Tuesday',
  weekdayWednesday: 'Wednesday',
  weekdayThursday: 'Thursday',
  weekdayFriday: 'Friday',
  weekdaySaturday: 'Saturday',
});

export const emoji = defineMessages({
  disappointed: 'Disappointed',
  grinning: 'Grinning',
  neutral: 'Neutral',
  sad: 'Sad',
  slightlySmiling: 'Slightly smiling',
});

export const form = defineMessages({
  error:
    'Oh no, something went wrong! Please, try submitting your information again.',
  loading: 'Loading...',
});

export const formFeedback = defineMessages({
  giveMore: 'Give more feedback',
  howSatisfied: 'How satisfied are you with this page?',
  improvePage: 'How can we make this page better?',
  send: 'Send feedback',
  thankYouForSharing: 'Thank you for sharing feedback!',
});

export const misc = defineMessages({
  airport: 'Airport',
  citySeal: 'City of Austin Seal',
  workInProgress:
    '{alphaSiteLink} is a new website and a work in progress. For the full City of Austin website, visit {citySiteLink}. Learn more about the new website at {projectsSiteLink}.',
  workInProgressClipped:
    '{alphaSiteLink} is a work in progress.\nLearn more on our {projectsSiteLink}',
  workInProgressTiny: 'alpha.austin.gov is a work in progress.',
  forFullVisit: 'For the full City of Austin website, visit ',
  currentSite: 'Visit austintexas.gov for the current city website.',
  overview: 'Overview',
  privacy: 'Read about privacy',
  steps: 'Steps',
  welcomeTo: 'Welcome to',
  whatElse: 'What else do I need to know?',
  opoName: 'Office of Police Oversight',
  opoDeptUrl: '/police-oversight',
  coaOfficialWeb: 'An official website of the City of Austin',
  officialHowYouKnow: 'Here’s how you know.',
  services: 'Services',
  info: 'Information',
  projectsSiteLinkText: 'project site.',
  comingSoon: 'Coming soon',
  moreAboutProject: 'More about the alpha.austin.gov project.',
  learnMore: 'Learn more',
  relatedTo: 'Related to',
  offeredBy: 'Offered by',
  relatedInfo: 'Related information',
  sorry404: "Sorry, this isn't the page you were hoping to find.",
  homeIntro404: 'You can browse from the ',
  homeLink404: 'home page',
  or404: ', or ',
  contactUs404: 'contact us',
  privacyPolicy: 'Privacy policy',
});

export const navigation = defineMessages({
  home: 'Home',
  menu: 'Menu',
  openInNewWindow: 'Opens in new window',
  search: 'Search',
  skipToMain: 'Skip to main content',
});

export const processes = defineMessages({
  checkOutRelatedProcesses: 'Check out related processes',
  process: 'Process',
});

export const services = defineMessages({
  checkOutRelatedServices: 'Related services',
  checkOutServices: 'Check out City of Austin Services',
  service: 'Service',
  topServices: 'Top services',
  allServices: 'All services',
});

export const themes = defineMessages({
  theme: 'theme',
});

export const departments = defineMessages({
  departments: 'Departments',
});

export const threeoneone = defineMessages({
  all311: 'All 311 Services',
  call311: 'Call 311',
});

export const topics = defineMessages({
  topic: 'topic',
});

export const curbsideServices = defineMessages({
  textiles: 'Clothing and housewares recycling',
  recycling: 'Recycling',
  yardtrimmings: 'Yard trimmings',
  trash: 'Trash',
  compost: 'Compost',
  brushcollection: 'Large brush collection',
  bulkitemcollection: 'Bulk item collection',
  pickupschedule: "Here's the pickup schedule for {address}",
});

export const departmentPage = defineMessages({
  complaintFormButtonText: 'File a complaint against an Austin Police Officer',
  complaintFormUrl: 'https://forms.austin.gov/police-oversight/complaint',
  thankFormButtonText: 'Thank the Austin Police Department',
  thankFormButtonUrl: 'https://forms.austin.gov/police-oversight/complaint',
  thankFormButtonText: 'Thank an Austin Police Officer',
  thankFormUrl: 'https://forms.austin.gov/police-oversight/thank',
  yourDataLinkText: 'How we store and use your data',
  yourDataUrl: '/police-oversight/how-we-store-and-use-your-data',
  investigationProcessLinkText: 'Complaint investigation process',
  investigationProcessUrl: '/police-oversight/complaint-investigation-process',
  directorTitle: 'Director, Office of Police Oversight',
  coa: 'City of Austin',
  mission: 'Our mission',
  whatWeDo: 'What we do',
  meetDirector: 'Meet our director',
  meetDirectors: 'Meet our directors',
  topServices: 'Top services',
});

export const howYouKnowMenu = defineMessages({
  dotGovHeader: 'The .gov means it’s official.',
  dotGovText:
    'Government websites often end in .gov. Before sharing sensitive information, make sure you’re on a federal government site.',
  httpsHeader: 'The site is secure.',
  httpsText:
    'The https:// ensures that you are connecting to the official website and that any information you provide is encrypted and transmitted securely.',
});

export const footerSiteMapMenu = defineMessages([
  {
    url: '/themes/permits-tickets',
    text: 'Permits and tickets',
    id: 'VGhlbWVOb2RlOjE=',
    description: '',
    topics: [
      {
        url: '/topics/building-permits',
        text: 'Building permits',
        description: '',
        services: [],
      },
      {
        url: '/topics/business-permits-licenses',
        text: 'Business permits and licenses',
        description: '',
        services: [],
      },
      {
        url: '/topics/event-permits',
        text: 'Event permits',
        description: '',
        services: [],
      },
      {
        url: '/topics/pay-tickets',
        text: 'Pay tickets',
        description: '',
        services: [],
      },
    ],
  },
  {
    url: '/themes/housing-utilities',
    text: 'Housing and utilities',
    id: 'VGhlbWVOb2RlOjI=',
    description:
      'Find the resources to keep your home, apartment, or condo running smoothly.',
    topics: [
      {
        url: '/topics/pay-utility-bills',
        text: 'Pay utility bills',
        description: '',
        services: [],
      },
      {
        url: '/topics/water-electric-service',
        text: 'Water and electric service',
        description: '',
        services: [],
      },
      {
        url: '/topics/recycling-trash-compost',
        text: 'Recycling, trash, and compost',
        description:
          'The City of Austin provides hundreds of services to residents to help them manage things like recycling, trash, energy, and water. This is a short list of services that will grow over time.',
        services: [
          {
            url: '/services/bulk-item-pickup',
            text: 'Get ready for curbside bulk item pickup',
            id: 'U2VydmljZVBhZ2VOb2RlOjQ=',
          },
          {
            url: '/services/compost-pickup',
            text: 'Get ready for curbside compost pickup',
            id: 'U2VydmljZVBhZ2VOb2RlOjU=',
          },
          {
            url: '/services/hazardous-waste-dropoff',
            text: 'Drop off household hazardous waste and other recyclables',
            id: 'U2VydmljZVBhZ2VOb2RlOjY=',
          },
          {
            url: '/services/pickup-free-paint',
            text: 'Pick up free paint and other household items',
            id: 'U2VydmljZVBhZ2VOb2RlOjc=',
          },
        ],
      },
      {
        url: '/topics/housing-assistance',
        text: 'Housing assistance',
        description: '',
        services: [],
      },
    ],
  },
  {
    url: '/themes/pets',
    text: 'Pets',
    id: 'VGhlbWVOb2RlOjM=',
    description: '',
    topics: [
      {
        url: '/topics/pet-adoption',
        text: 'Pet adoption',
        description: '',
        services: [],
      },
      {
        url: '/topics/foster-animal',
        text: 'Foster an animal',
        description: '',
        services: [],
      },
      {
        url: '/topics/report-loose-animal',
        text: 'Report a loose animal',
        description: '',
        services: [],
      },
      {
        url: '/topics/lost-found-pets',
        text: 'Lost and found pets',
        description: '',
        services: [],
      },
    ],
  },
  {
    url: '/themes/health-safety',
    text: 'Health and safety',
    id: 'VGhlbWVOb2RlOjQ=',
    description: '',
    topics: [
      {
        url: '/topics/birth-certificates',
        text: 'Birth certificates',
        description: '',
        services: [],
      },
      {
        url: '/topics/healthcare-prevention',
        text: 'Healthcare and prevention',
        description: '',
        services: [],
      },
      {
        url: '/topics/find-childcare',
        text: 'Find childcare',
        description: '',
        services: [],
      },
      {
        url: '/topics/child-senior-safety',
        text: 'Child and senior safety',
        description: '',
        services: [],
      },
      {
        url: '/topics/disaster-safety-relief',
        text: 'Disaster safety and relief',
        description: '',
        services: [],
      },
      {
        url: '/topics/police-reports-records',
        text: 'Police reports and records',
        description: '',
        services: [],
      },
    ],
  },
  {
    url: '/themes/explore-visit',
    text: 'Explore and visit',
    id: 'VGhlbWVOb2RlOjU=',
    description: '',
    topics: [
      {
        url: '/topics/events-classes',
        text: 'Events and classes',
        description: '',
        services: [],
      },
      {
        url: '/topics/hike-bike-swim-play',
        text: 'Hike, bike, swim, and play',
        description: '',
        services: [],
      },
      {
        url: '/topics/arts-culture',
        text: 'Arts and culture',
        description: '',
        services: [],
      },
      {
        url: '/topics/libraries',
        text: 'Libraries',
        description: '',
        services: [],
      },
      {
        url: '/topics/transportation-parking',
        text: 'Transportation and parking',
        description: '',
        services: [],
      },
      {
        url: '/topics/airport',
        text: 'Airport',
        description: '',
        services: [],
      },
    ],
  },
  {
    url: '/themes/government-business',
    text: 'Government and business',
    id: 'VGhlbWVOb2RlOjY=',
    description: '',
    topics: [
      {
        url: '/topics/departments',
        text: 'Departments',
        description: '',
        services: [],
      },
      {
        url: '/topics/court-dates',
        text: 'Court dates and times',
        description: '',
        services: [],
      },
      {
        url: '/topics/business-development',
        text: 'Business development',
        description: '',
        services: [],
      },
      {
        url: '/topics/city-code',
        text: 'City code and ordinance',
        description: '',
        services: [],
      },
      {
        url: '/topics/budget-performance-open-records',
        text: 'Budget, performance, and open records',
        description: '',
        services: [],
      },
      {
        url: '/topics/funding-grants-rebates',
        text: 'Fudning, grants, and rebates',
        description: '',
        services: [],
      },
      {
        url: '/topics/resident-participation',
        text: 'Resident participation',
        description: '',
        services: [],
      },
      {
        url: '/topics/mayor-council',
        text: 'Mayor and Council',
        description: '',
        services: [],
      },
    ],
  },
  {
    url: '/themes/jobs',
    text: 'Jobs',
    id: 'VGhlbWVOb2RlOjc=',
    description: '',
    topics: [
      {
        url: '/topics/job-titles-pay',
        text: 'City job titles and pay',
        description: '',
        services: [],
      },
      {
        url: '/topics/benefits',
        text: 'City benefits',
        description: '',
        services: [],
      },
      {
        url: '/topics/rando-job-1',
        text: '[Job type 1]',
        description: '',
        services: [],
      },
      {
        url: '/topics/rando-job-2',
        text: '[Job type 2]',
        description: '',
        services: [],
      },
      {
        url: '/topics/all-jobs',
        text: 'All jobs',
        description: '',
        services: [],
      },
    ],
  },
]);

export const officialdocuments = defineMessages({
  author: 'Author',
  document: 'Document',
});

export const guides = defineMessages({
  pageLink: 'View this page on alpha.austin.gov',
});
