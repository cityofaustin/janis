import React from 'react';
import { storiesOf } from '@storybook/react';

import ContactDetails from 'js/modules/Contact/ContactDetails';
import ContactPhone from 'js/modules/Contact/Phone';
import ContactHours from 'js/modules/Contact/Hours';
import ContactEmail from 'js/modules/Contact/Email';
import ContactAddress from 'js/modules/Contact/Address';

import contactData from 'stories/static_data/contactData';

storiesOf('Contact', module)
  .add('All Contact Details', () => (
    <div className="wrapper container-fluid">
      <ContactDetails
        contact={contactData}
      />
    </div>
  ))
  .add('Phone', () => (
    <div className="wrapper container-fluid">
      <ContactPhone
        className="coa-ContactDetails__item"
        phone={contactData.phone.default}
        ttyphone={contactData.phone.tty}
      />
    </div>
  ))
  .add('Hours', () => (
    <div className="wrapper container-fluid">
      <ContactHours
        className="coa-ContactDetails__item"
        hours={contactData.hours}
      />
    </div>
  ))
  .add('Email', () => (
    <div className="wrapper container-fluid">
      <ContactEmail
        className="coa-ContactDetails__item"
        email={contactData.email}
      />
    </div>
  ))
  .add('Address', () => (
    <div className="wrapper container-fluid">
      <ContactAddress
        className="coa-ContactDetails__item"
        name={contactData.name}
        location={contactData.location}
      />
    </div>
  ))
