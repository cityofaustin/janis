import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n } from 'js/i18n/definitions';

import SectionHeader from 'components/SectionHeader';
import Phone from './Phone';
import Email from './Email';
import Address from './Address';
import Hours from './Hours';
import Facebook from './Facebook';
import Twitter from './Twitter';

import {
  addressPropTypes,
  emailPropTypes,
  hoursPropTypes,
  phonePropTypes,
} from './proptypes';

const ContactDetails = ({
  contact: { phone, email, location, hours },
  intl,
}) => (
  <div className="coa-ContactDetails">
    <SectionHeader isSerif={true}>
      {intl.formatMessage(i18n.questionsTitle)}
    </SectionHeader>

    {email && <Email email={email} />}

    {location && <Address location={location} />}

    {phone && <Phone phone={phone} />}

    {hours && <Hours hours={hours} />}

    <Twitter />

    <Facebook />
  </div>
);

ContactDetails.propTypes = {
  contact: PropTypes.shape({
    location: addressPropTypes,
    email: emailPropTypes,
    hours: hoursPropTypes,
    phone: phonePropTypes,
  }).isRequired,
};

export default injectIntl(ContactDetails);
