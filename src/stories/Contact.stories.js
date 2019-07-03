import React from 'react';
import { storiesOf } from '@storybook/react';

import ContactMap from 'components/Contact/ContactMap';
import ContactDetails from 'components/Contact/ContactDetails';
import ContactPhone from 'components/Contact/Phone';
import ContactHours from 'components/Contact/Hours';
import ContactEmail from 'components/Contact/Email';
import ContactAddress from 'components/Contact/Address';

import contactData from 'stories/static_data/contactData';

storiesOf('Contact', module)
  .add('Contact Details', () => (
    <div className="wrapper container-fluid">
      <ContactDetails contact={contactData} />
    </div>
  ))
  .add('Contact Map', () => (
    <div className="wrapper container-fluid">
      <ContactMap location={contactData.location} />
    </div>
  ))
  .add('Phone', () => (
    <div className="wrapper container-fluid">
      <ContactPhone phone={contactData.phone} />
    </div>
  ))
  .add('Hours', () => (
    <div className="wrapper container-fluid">
      <ContactHours hours={contactData.hours} />
    </div>
  ))
  .add('Email', () => (
    <div className="wrapper container-fluid">
      <ContactEmail email={contactData.email} />
    </div>
  ))
  .add('Address', () => (
    <div className="wrapper container-fluid">
      <ContactAddress location={contactData.location} />
    </div>
  ));
