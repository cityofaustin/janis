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
import citySealImg from 'images/coa_seal_white.png';

import ThreeOneOne from 'components/PageSections/ThreeOneOne';
import { threeoneonePropTypes } from 'components/PageSections/ThreeOneOne/proptypes';

const Footer = ({ threeoneone, intl }) => (
  <footer>
    <div className="coa-Footer">
      <div className="container-fluid wrapper">

        <div className="coa-Footer__city-seal-wrapper">
          <img src={citySealImg} alt={intl.formatMessage(i18n.citySeal)} />
        </div>

        <div className="coa-Footer__work-in-progress">
          <WorkInProgress isClipped={true} />
        </div>
        <div className="coa-Footer__more_text_boxes">
          <div className="coa-Footer__more_text_box">
            For the full City of Austin website visit <ExternalLink to={"https://www.austintexas.gov/"}>
              austintexas.gov.
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  threeoneone: threeoneonePropTypes.isRequired,
};

export default injectIntl(Footer);
