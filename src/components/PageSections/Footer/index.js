import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { misc as i18n } from 'js/i18n/definitions';

import FormFeedback from 'components/FormFeedback';
import ExternalLink from 'components/ExternalLink';
import WorkInProgress from 'components/WorkInProgress';

import TwitterSVG from 'components/SVGs/Twitter';
import FacebookSVG from 'components/SVGs/Facebook';
import GithubSVG from 'components/SVGs/Github';
// import CitySealSVG from 'components/SVGs/CitySeal';
import citySealImg from 'images/coa_seal_color.png';

import ThreeOneOne from 'components/PageSections/ThreeOneOne';
import { threeoneonePropTypes } from 'components/PageSections/ThreeOneOne/proptypes';

import FooterSiteMap from 'components/PageSections/Footer/FooterSiteMap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { Link } from 'react-static';

const Footer = ({ threeoneone, intl }) => (
  <footer>
    <div className="coa-Footer">
      <FooterSiteMap />
      <div className="coa-Footer__city-seal-wrapper">
        <img src={citySealImg} alt={intl.formatMessage(i18n.citySeal)} />
      </div>
      <div className="coa-Footer__work-in-progress">
        <WorkInProgress isClipped={true} />
      </div>
      <div className="coa-Footer__social-links">
        <a href="https://www.facebook.com/austintexasgov">
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </a>
        <a href="https://www.instagram.com/austintexasgov/">
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>
        <a href="https://www.linkedin.com/company/city-of-austin/">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
        <a href="https://twitter.com/austintexasgov">
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
        <a href="https://www.youtube.com/user/austintexasgov">
          <FontAwesomeIcon icon={faYoutube} size="lg" />
        </a>
      </div>
      <div className="coa-Footer__links">
        <Link to={'/privacy-policy/'}>
          {intl.formatMessage(i18n.privacyPolicy)}
        </Link>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  threeoneone: threeoneonePropTypes.isRequired,
};

export default injectIntl(Footer);

// <img src={citySealImg} alt={intl.formatMessage(i18n.citySeal)} />
