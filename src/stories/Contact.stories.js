import React from 'react';
import { storiesOf } from '@storybook/react';

import ContactMap from 'js/modules/Contact/ContactMap';
import ContactDetails from 'js/modules/Contact/ContactDetails';
import ContactPhone from 'js/modules/Contact/Phone';
import ContactHours from 'js/modules/Contact/Hours';
import ContactEmail from 'js/modules/Contact/Email';
import ContactAddress from 'js/modules/Contact/Address';

import contactData from 'stories/static_data/contactData';

storiesOf('Contact', module)
  .add('Contact Details', () => (
    <div className="wrapper container-fluid">
      <ContactDetails
        contact={contactData}
      />
    </div>
  ))
  .add('Contact Map', () => (
    <div className="wrapper container-fluid">
      <ContactMap
        contact={contactData}
      />
    </div>
  ))
  .add('Phone', () => (
    <div className="wrapper container-fluid">
      <ContactPhone
        phone={contactData.phone}
      />
    </div>
  ))
  .add('Hours', () => (
    <div className="wrapper container-fluid">
      <ContactHours
        hours={contactData.hours}
      />
    </div>
  ))
  .add('Email', () => (
    <div className="wrapper container-fluid">
      <ContactEmail
        email={contactData.email}
      />
    </div>
  ))
  .add('Address', () => (
    <div className="wrapper container-fluid">
      <ContactAddress
        location={contactData.location}
      />
    </div>
  ))
