import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { contact as i18n } from 'js/i18n/definitions';

import SectionHeader from 'components/SectionHeader';
import Phone from './Phone';
import Phones from './Phones';
import Email from './Email';
import Address from './Address';
import Hours from './Hours';
import Facebook from './Facebook';
import Twitter from './Twitter';
import ExternalLink from 'components/ExternalLink';
import ExternalLinkSVG from 'components/SVGs/ExternalLink';

import {
  addressPropTypes,
  emailPropTypes,
  hoursPropTypes,
  phonePropTypes,
} from './proptypes';

const ContactSocialMediaLink = ({ url }) => {
  const facebookRegex = /http(s)?:\/\/(www\.)?(facebook|fb)\.com\/[A-z0-9_\-\.]+\/?/g;
  if (facebookRegex.test(url)) {
    return <Facebook url={url} />;
  }

  const twitterRegex = /http(s)?:\/\/(.*\.)?twitter\.com\/[A-z0-9_]+\/?/g;
  if (twitterRegex.test(url)) {
    return <Twitter url={url} />;
  }

  return (
    <div className="coa-ContactItem">
      <i className="material-icons">public</i>
      <div className="coa-ContactItem_content">
        <ExternalLink to={url}>{url}</ExternalLink>
      </div>
    </div>
  );
};

const ContactDetails = ({
  contact: { phone, phoneNumber, email, location, hours, socialMedia },
  intl,
}) => (
  <div className="coa-ContactDetails">
    <SectionHeader isSerif={true}>
      {intl.formatMessage(i18n.questionsTitle)}
    </SectionHeader>
    {email && <Email email={email} />}
    {location && <Address location={location} />}
    {phone && <Phones phone={phone} />}
    {phoneNumber &&
      !!phoneNumber.edges.length && (
          phoneNumber.edges.map(phone =>
          <Phones phone={phone.node} />)
      )}
    {hours && !!hours.length && <Hours hours={hours} />}
    {socialMedia &&
      socialMedia.map(url => <ContactSocialMediaLink url={url.value} />)}
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
