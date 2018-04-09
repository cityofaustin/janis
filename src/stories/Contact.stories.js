import React from 'react';
import { IntlProvider } from 'react-intl';

import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

import ContactDetails from 'js/modules/Contact/ContactDetails';
import ContactPhone from 'js/modules/Contact/Phone';
import ContactHours from 'js/modules/Contact/Hours';
import ContactEmail from 'js/modules/Contact/Email';
import ContactAddress from 'js/modules/Contact/Address';

import contactData from 'stories/static_data/contactData';

storiesOf('Contact', module)
  .addDecorator(checkA11y)
  .add('All Contact Details', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <ContactDetails
          contact={contactData}
        />
      </div>
    </IntlProvider>
  ))
  .add('Phone', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <ContactPhone
          className="coa-ContactDetails__item"
          phone={contactData.phone.default}
          ttyphone={contactData.phone.tty}
        />
      </div>
    </IntlProvider>
  ))
  .add('Hours', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <ContactHours
          className="coa-ContactDetails__item"
          hours={contactData.hours}
        />
      </div>
    </IntlProvider>
  ))
  .add('Email', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <ContactEmail
          className="coa-ContactDetails__item"
          email={contactData.email}
        />
      </div>
    </IntlProvider>
  ))
  .add('Address', () => (
    <IntlProvider locale="en">
      <div className="wrapper container-fluid">
        <ContactAddress
          className="coa-ContactDetails__item"
          name={contactData.name}
          location={contactData.location}
        />
      </div>
    </IntlProvider>
  ))
