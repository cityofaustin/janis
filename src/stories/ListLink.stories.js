import React from 'react';
import { storiesOf } from '@storybook/react';

import ListLink from 'js/modules/ListLink';

storiesOf('ListLink', module)
  .add('light theme (default)', () => (
    <div className="wrapper container-fluid">
      <ListLink
        url={'https://austintexas.gov'}
        text={'Current City of Austin website'}
      />
    </div>
  ))
  .add('dark theme', () => (
    <div className="coa-ThreeOneOne wrapper container-fluid">
      <div className="coa-ThreeOneOne__listlinks">
        <div className="coa-ListLink">
          <ListLink
            url={'https://austintexas.gov'}
            text={'Current City of Austin website'}
          />
        </div>
      </div>
    </div>
  ))
