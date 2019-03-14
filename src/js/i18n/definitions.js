import { defineMessages } from 'react-intl';

export const callToAction = defineMessages({
  enterAddress: 'Type your street address in the box below',
  submitOnlineRequest: 'Submit an Online Request',
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
  slightlySmiling: 'Slightly Smiling',
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
  forFullVisit: 'For the full City of Austin website, visit ',
  overview: 'Overview',
  privacy: 'Read About Privacy',
  steps: 'Steps',
  welcomeTo: 'Welcome to',
  whatElse: 'What else do I need to know?',
  opoName: 'Office of Police Oversight',
  opoDeptUrl: 'https://alpha.austin.gov/police-oversight',
  coaOfficialWeb: 'An official website of the City of Austin',
  officialHowYouKnow: 'Here’s how you know.',
  services: 'Services',
  info: 'Information',
  projectsSiteLinkText: 'project site.',
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
});

export const themes = defineMessages({
  theme: 'theme',
});

export const threeoneone = defineMessages({
  all311: 'All 311 Services',
  call311: 'Call 311',
});

export const topics = defineMessages({
  topic: 'topic',
});

export const curbsideServices = defineMessages({
  textiles: 'Clothing & Housewares Recycling',
  recycling: 'Recycling',
  yardtrimmings: 'Yard Trimmings',
  trash: 'Trash',
  compost: 'Compost',
  brushcollection: 'Large Brush Collection',
  bulkitemcollection: 'Bulk Item Collection',
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
  yourDataUrl:
    'http://alpha.austin.gov/police-oversight/how-we-store-and-use-your-data',
  investigationProcessLinkText: 'Complaint Investigation Process',
  investigationProcessUrl:
    'http://alpha.austin.gov/police-oversight/complaint-investigation-process',
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
    text: 'Permits & Tickets',
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
        text: 'Business permits & licenses',
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
    text: 'Housing & Utilities',
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
        text: 'Water & electric service',
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
        text: 'Lots & found pets',
        description: '',
        services: [],
      },
    ],
  },
  {
    url: '/themes/health-safety',
    text: 'Health & Safety',
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
        text: 'Healthcare & prevention',
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
        text: 'Child & senior safety',
        description: '',
        services: [],
      },
      {
        url: '/topics/disaster-safety-relief',
        text: 'Disaster safety & relief',
        description: '',
        services: [],
      },
      {
        url: '/topics/police-reports-records',
        text: 'Police reports & records',
        description: '',
        services: [],
      },
    ],
  },
  {
    url: '/themes/explore-visit',
    text: 'Explore & Visit',
    id: 'VGhlbWVOb2RlOjU=',
    description: '',
    topics: [
      {
        url: '/topics/events-classes',
        text: 'Events & classes',
        description: '',
        services: [],
      },
      {
        url: '/topics/hike-bike-swim-play',
        text: 'Hike, bike, swim, & play',
        description: '',
        services: [],
      },
      {
        url: '/topics/arts-culture',
        text: 'Arts & culture',
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
        text: 'Transportation & parking',
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
    text: 'Government & Business',
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
        text: 'Court dates & times',
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
        text: 'City code & ordinance',
        description: '',
        services: [],
      },
      {
        url: '/topics/budget-performance-open-records',
        text: 'Budget, performance, & open records',
        description: '',
        services: [],
      },
      {
        url: '/topics/funding-grants-rebates',
        text: 'Fudning, grants, & rebates',
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
        text: 'Mayor & Council',
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
        text: 'City job titles & pay',
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
