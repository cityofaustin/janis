import React from 'react';
import { storiesOf } from '@storybook/react';

import ContactMap from 'components/Contact/ContactMap';
import ContactDetails from 'components/Contact/ContactDetails';
import PhonesList from 'components/Contact/Phones';
import ContactHours from 'components/Contact/Hours';
import ContactEmail from 'components/Contact/Email';
import ContactAddress from 'components/Contact/Address';

import contactData from 'stories/static_data/contactData';

storiesOf('Contact', module)
  .add('Contact Details', () => (
    <div className="wrapper container-fluid">
      <ContactDetails contacts={contactData} />
    </div>
  ))
  .add('Contact Map', () => (
    <div className="wrapper container-fluid">
      <ContactMap location={contactData[0].location} />
    </div>
  ))
  .add('Phone', () => (
    <div className="wrapper container-fluid">
      <PhonesList phoneNumbers={contactData[0].phone} />
    </div>
  ))
  .add('Hours', () => (
    <div className="wrapper container-fluid">
      <ContactHours hours={contactData[0].hours} />
    </div>
  ))
  .add('Email', () => (
    <div className="wrapper container-fluid">
      <ContactEmail email={contactData[0].email} />
    </div>
  ))
  .add('Address', () => (
    <div className="wrapper container-fluid">
      <ContactAddress location={contactData[0].location} />
    </div>
  ));
