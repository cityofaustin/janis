import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import Phone from 'js/modules/ContactPhone';
import Email from 'js/modules/ContactEmail';
import Address from 'js/modules/ContactAddress';
import Hours from 'js/modules/ContactHours';
import StaticMap from 'js/modules/StaticMap';

//TODO: import correct svg
import AirplaneSVG from 'js/svg/Airplane';

const i18nMessages = defineMessages({
  contactDetailsTitle: {
    id: 'ContactDetails.title',
    defaultMessage: 'Still have questions? Contact:',
  }
});

const Contact = ({ contact, intl }) => {

  const {name, phone, email, location, hours} = contact;

  return (
  <div className="coa-ContactDetails">
    <h2 className="coa-ContactDetails__title">{intl.formatMessage(i18nMessages.contactDetailsTitle)}</h2>
    <div className="coa-ContactDetails__items">
      { phone && (
        <Phone className="coa-ContactDetails__item" phone={phone} tddphone={phone} />
      )}

      { email && (
        <Email className="coa-ContactDetails__item" email={email} />
      )}

      { location && (
        <Address className="coa-ContactDetails__item" name={name} location={location} />
      )}

      { hours && (
        <Hours className="coa-ContactDetails__item" hours={hours} />
      )}

    </div>
  </div>
);
}

export default injectIntl(Contact);
