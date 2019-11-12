import React from 'react';
import { storiesOf } from '@storybook/react';

import PageHeader from 'components/PageHeader';

storiesOf('PageHeader', module)
  .add('PageHeader', () => (
    <PageHeader
      description={""}
      children={"Disaster and safety relief"}
      contentType={"topic-collection"}
    />
  ))
  .add('PageHeader with description', () => (
    <div className="wrapper container-fluid">
      <PageHeader 
        description="Lorem ipsum dolor sit amet, ne vim partem nominati consectetuer. Id quo nisl munere, ne mel legendos iracundia, qui ei stet qualisque. Dico aliquando cu ius. Paulo nostro delectus ei vel, ei homero mnesarchum percipitur mei. Facilisis disputationi signiferumque id qui."
        children={"Disaster and safety relief"}
        contentType={"topic-collection"}
      />
    </div>
  ));
