import React from 'react';
import { storiesOf } from '@storybook/react';

import PageHeader from 'components/PageHeader';

storiesOf('PageHeader', module)
  .add('PageHeader', () => (
    <div className="wrapper container-fluid">
      <PageHeader
        title="Page Header"
        description="Lorem ipsum dolor sit amet, cum summo iudicabit te, ne vim partem nominati consectetuer. Id quo nisl munere, ne mel legendos iracundia, qui ei stet qualisque. Dico aliquando cu ius. Paulo nostro delectus ei vel, ei homero mnesarchum percipitur mei. Facilisis disputationi signiferumque id qui."
      />
    </div>
  ))
  .add('PageHeader with border', () => (
    <div className="wrapper container-fluid">
      <PageHeader
        title="Page Header"
        description="Lorem ipsum dolor sit amet, cum summo iudicabit te, ne vim partem nominati consectetuer. Id quo nisl munere, ne mel legendos iracundia, qui ei stet qualisque. Dico aliquando cu ius. Paulo nostro delectus ei vel, ei homero mnesarchum percipitur mei. Facilisis disputationi signiferumque id qui."
        hasBorder={true}
      />
    </div>
  ))
