import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
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
      <h2 className="coa-ContactDetails__title">{intl.formatMessage(i18nMessages.contactDetailsTitle)}</h2>
      <div className="coa-ContactDetails__items">
        { phone && (
          <Phone
            className="coa-ContactDetails__item"
            phone={phone.default}
            ttyphone={phone.tty}
          />
        )}

        { email && (
          <Email className="coa-ContactDetails__item" email={email} />
        )}

        { location && (
          <Address
            className="coa-ContactDetails__item"
            name={name}
            location={location}
          />
        )}

        { hours && (
          <Hours className="coa-ContactDetails__item" hours={hours} />
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
