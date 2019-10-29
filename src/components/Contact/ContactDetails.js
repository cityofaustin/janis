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

const ContactDetails = ({ contacts, intl }) => (
  <div className="coa-ContactDetails">
    <SectionHeader isSerif={true}>
      {intl.formatMessage(i18n.questionsTitle)}
    </SectionHeader>
    {contacts.map(c => (
      <ContactDetailsEntry contact={c} />
    ))}
  </div>
);

const ContactDetailsEntry = ({
  contact: { name, phoneNumber, email, location, hours, socialMedia },
}) => (
  <React.Fragment>
    {/* We want to keep this component easy to read and streamlined, so we are
      avoiding complicated functions in this return.
      Consider breaking into another component and calling that here*/}
    <h3 className="coa-ContactDetails__name">{name}</h3>
    {location && <Address location={location} />}
    {hours && !!hours.length && <Hours hours={hours} />}
    {phoneNumber && <PhonesList phoneNumbers={phoneNumber} />}
    {email && <Email email={email} />}
    {/*Each social media link is it's own contact item with it's own icon,
    so it makes sense to have the map here*/}
    {socialMedia && socialMedia.map(url => <SocialMediaLink url={url.value} />)}
  </React.Fragment>
);

ContactDetailsEntry.propTypes = {
  contact: PropTypes.shape({
    location: addressPropTypes,
    email: emailPropTypes,
    hours: hoursPropTypes,
    phoneNumber: phonePropTypes,
  }).isRequired,
};

export default injectIntl(ContactDetails);
