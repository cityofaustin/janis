import React from 'react';
import { storiesOf } from '@storybook/react';
import ContextualNav from '../components/PageSections/ContextualNav';

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

storiesOf('ContextualNav', module).add('ContextualNav', () => (
  <ContextualNav
    parent={tempTopicData}
    related={tempTopicsData}
    dept={'Department'}
  />
));
