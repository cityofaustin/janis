import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n } from 'js/i18n/definitions';

import SectionHeader from 'components/SectionHeader';
import Phone from 'components/Contact/Phone';
import Email from 'components/Contact/Email';
import Address from 'components/Contact/Address';
import Hours from 'components/Contact/Hours';

const ContactDetails = ({
  contact: { phone, email, location, hours },
  intl,
}) => (
  <div className="coa-ContactDetails">
    <SectionHeader isSerif={true}>
      {intl.formatMessage(i18n.questionsTitle)}
    </SectionHeader>
    {phone && <Phone phone={phone} />}

    {email && <Email email={email} />}

    {location && <Address location={location} />}

    {hours && <Hours hours={hours} />}
  </div>
);

ContactDetails.propTypes = {
  contact: PropTypes.shape(
    Object.assign(
      {},
      Phone.propTypes,
      Email.propTypes,
      Address.propTypes,
      Hours.propTypes,
    ),
  ).isRequired,
};

export default injectIntl(ContactDetails);
