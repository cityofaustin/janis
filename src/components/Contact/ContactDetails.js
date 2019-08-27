import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n } from 'js/i18n/definitions';

import SectionHeader from 'components/SectionHeader';
import PhonesList from './Phones';
import Email from './Email';
import Address from './Address';
import Hours from './Hours';
import SocialMediaLink from './SocialMediaLink';
import ExternalLink from 'components/ExternalLink';
import ExternalLinkSVG from 'components/SVGs/ExternalLink';

import {
  addressPropTypes,
  emailPropTypes,
  hoursPropTypes,
  phonePropTypes,
} from './proptypes';

const ContactDetails = ({
  contact: { phoneNumber, email, location, hours, socialMedia },
  intl,
}) => (
  <div className="coa-ContactDetails">
    <SectionHeader isSerif={true}>
      {intl.formatMessage(i18n.questionsTitle)}
    </SectionHeader>
    {email && <Email email={email} />}
    {location && <Address location={location} />}
    {/*phone list should probably be a list for semantics but it affects styling atm */}
    {phoneNumber && <PhonesList phoneNumbers={phoneNumber} />}
    {hours && !!hours.length && <Hours hours={hours} />}
    {socialMedia && socialMedia.map(url => <SocialMediaLink url={url.value} />)}
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
