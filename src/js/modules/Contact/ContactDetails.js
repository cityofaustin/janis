import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import SectionHeader from 'js/modules/SectionHeader';
import Phone from 'js/modules/Contact/Phone';
import Email from 'js/modules/Contact/Email';
import Address from 'js/modules/Contact/Address';
import Hours from 'js/modules/Contact/Hours';

const i18nMessages = defineMessages({
  contactDetailsTitle: {
    id: 'ContactDetails.title',
    defaultMessage: 'Still have questions? Contact:',
  }
});

const ContactDetails = ({ contact, intl }) => {
  const {name, phone, email, location, hours} = contact;

  return (
    <div className="coa-ContactDetails">
      <SectionHeader isSerif={true}>{intl.formatMessage(i18nMessages.contactDetailsTitle)}</SectionHeader>
      <div className="coa-ContactDetails__items">
        { phone && (
          <Phone
            phone={phone.default}
            ttyphone={phone.tty}
          />
        )}

        { email && (
          <Email email={email} />
        )}

        { location && (
          <Address
            name={name}
            location={location}
          />
        )}

        { hours && (
          <Hours hours={hours} />
        )}

      </div>
    </div>
  );
}

ContactDetails.propTypes = {
  contact: PropTypes.shape({
    phone: PropTypes.object,
    email: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.object,
    hours: PropTypes.array,
  }).isRequired,
};

export default injectIntl(ContactDetails);
