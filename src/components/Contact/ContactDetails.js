import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n, locations as i18n2 } from 'js/i18n/definitions';

import SectionHeader from 'components/SectionHeader';
import PhonesList from './Phones';
import Email from './Email';
import Address from './Address';
import Hours from './Hours';
import SocialMediaLink from './SocialMediaLink';

import {
  addressPropTypes,
  emailPropTypes,
  hoursPropTypes,
  phonePropTypes,
} from './proptypes';

const ContactDetails = ({ contact, intl }) => (
  <div className="coa-ContactDetails">
    <SectionHeader isSerif={true}>
      {intl.formatMessage(i18n.questionsTitle)}
    </SectionHeader>
    <ContactDetailsEntry contact={contact} intl={intl} />
  </div>
);

const ContactDetailsEntry = ({
  contact: {
    name,
    phoneNumbers,
    email,
    location,
    hours,
    socialMedia,
    locationPageSlug,
  },
  intl,
}) => (
  <React.Fragment>
    {/* We want to keep this component easy to read and streamlined, so we are
      avoiding complicated functions in this return.
      Consider breaking into another component and calling that here*/}
    {!!phoneNumbers && !!phoneNumbers.edges.length && (
      <PhonesList phoneNumbers={phoneNumbers} />
    )}
    {email && <Email email={email} />}
    {location && <Address location={location} />}
    {hours && !!hours.length && <Hours hours={hours} />}
    {/*Each social media link is it's own contact item with it's own icon,
    so it makes sense to have the map here*/}
    {socialMedia && socialMedia.map(url => <SocialMediaLink url={url.value} />)}

    {locationPageSlug ? (
      <a
        href={`/${intl.locale}/location/${locationPageSlug}/`}
        className="coa-ContactDetails__location-link"
      >
        <div className="coa-ContactDetails__location-link-text">
          {intl.formatMessage(i18n2.locationInformation)}
        </div>
        <div className="coa-ContactDetails__location-link-arrow">
          <i class="material-icons">arrow_forward</i>
        </div>
      </a>
    ) : (
      <div className="coa-ContactDetails__locationless" />
    )}
  </React.Fragment>
);

ContactDetailsEntry.propTypes = {
  contact: PropTypes.shape({
    location: addressPropTypes,
    email: emailPropTypes,
    hours: hoursPropTypes,
    phoneNumber: phonePropTypes,
  }),
};

export default injectIntl(ContactDetails);
