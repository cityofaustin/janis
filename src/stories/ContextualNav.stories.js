import React from 'react';
import ContextualNav from '../components/PageSections/ContextualNav';

const parent = {
  id: 'VG9waWNOb2RlOjUz',
  title: 'Disease prevention',
  url: '/health-safety/healthcare-prevention/disease-prevention/',
};
const relatedTo = [
  {
    id: 'VG9waWNOb2RlOjU3',
    title: 'Household waste',
    url: '/housing-utilities/recycling-trash-and-compost/household-waste/',
  },
  {
    id: 'VG9waWNOb2RlOjU5',
    title: 'Recycling and reuse',
    url: '/housing-utilities/recycling-trash-and-compost/recycling-reuse/',
  },
];
const offeredBy = [
  {
    id: 'RGVwYXJ0bWVudFBhZ2VOb2RlOjExNw==',
    title: 'Austin Public Health',
    url: '/austin-public-health/',
  },
];

const tempTopicData = {
  id: 'VG9waWNOb2RlOjQz',
  slug: 'healthcare-prevention',
  theme: {
    id: 'VGhlbWVOb2RlOjQ=',
    slug: 'health-safety',
    text: 'Health and safety',
  },
  title: 'Healthcare and prevention',
};

const tempTopicsData = {
  edges: [
    {
      node: {
        topic: {
          id: 'asdasd',
          slug: 'healthcare-prevention',
          theme: {
            id: 'VGhlbWVOb2RlOjQ=',
            slug: 'health-safety',
            text: 'Health and safety',
          },
          title: 'Healthcare and prevention',
        },
      },
    },
  ],
};

export default {
  title: 'ContextualNav',
};

export const contextualNav = () => (
  <ContextualNav parent={parent} relatedTo={relatedTo} offeredBy={offeredBy} />
);

contextualNav.story = {
  name: 'ContextualNav',
};
