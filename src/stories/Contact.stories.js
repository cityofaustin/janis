import React from 'react';

import ContactMap from 'components/Contact/ContactMap';
import ContactDetails from 'components/Contact/ContactDetails';
import PhonesList from 'components/Contact/Phones';
import ContactHours from 'components/Contact/Hours';
import ContactEmail from 'components/Contact/Email';
import ContactAddress from 'components/Contact/Address';

import contactData from 'stories/static_data/contactData';

export default {
  title: 'Contact',
};

export const contactDetails = () => (
  <div className="wrapper container-fluid">
    <ContactDetails contacts={contactData} />
  </div>
);

export const contactMap = () => (
  <div className="wrapper container-fluid">
    <ContactMap location={contactData[0].location} />
  </div>
);

export const phoneStory = () => (
  <div className="wrapper container-fluid">
    <PhonesList phoneNumbers={contactData[0].phone} />
  </div>
);

phoneStory.story = {
  name: 'Phone',
};

export const hoursStory = () => (
  <div className="wrapper container-fluid">
    <ContactHours hours={contactData[0].hours} />
  </div>
);

hoursStory.story = {
  name: 'Hours',
};

export const emailStory = () => (
  <div className="wrapper container-fluid">
    <ContactEmail email={contactData[0].email} />
  </div>
);

emailStory.story = {
  name: 'Email',
};

export const address = () => (
  <div className="wrapper container-fluid">
    <ContactAddress location={contactData[0].location} />
  </div>
);
