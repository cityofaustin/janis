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
  const facebookMatch = url.match(facebookRegex);
  if(facebookMatch !== null) {
    return <Facebook url={url} />
  }

  const twitterRegex = /http(s)?:\/\/(.*\.)?twitter\.com\/[A-z0-9_]+\/?/g;
  const twitterMatch = url.match(twitterRegex);
  if(twitterMatch !== null) {
    return <Twitter url={url} />
  }

  return(
    <div className="coa-ContactItem coa-ContactTwitter">
      <div className="coa-ContactItem__svg">
        <ExternalLinkSVG />
      </div>
      <div className="coa-ContactItem_content">
        <ExternalLink to={url}>{url}</ExternalLink>
      </div>
  </div>
  );
};

const ContactDetails = ({
  contact: { phone, email, location, hours, socialMedia },
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

    {socialMedia.map(url => <ContactSocialMediaLink url={url.value} />)}

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
