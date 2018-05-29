import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { misc as i18n } from 'js/i18n/definitions';

import ExternalLink from 'components/ExternalLink';
import WorkInProgress from 'components/WorkInProgress';

import TwitterSVG from 'components/SVGs/Twitter';
import FacebookSVG from 'components/SVGs/Facebook';
import GithubSVG from 'components/SVGs/Github';
import citySealImg from 'images/coa_seal_white.png';

import ThreeOneOne from 'components/PageSections/ThreeOneOne';
import { threeoneonePropTypes } from 'components/PageSections/ThreeOneOne/proptypes';

const Footer = ({ threeoneone, intl }) => (
  <footer className="coa-Footer">
    <ThreeOneOne threeoneone={threeoneone} />
    <div className="container-fluid wrapper">
      <div className="row">
        <div className="col-xs-12 col-md-2">
          <div className="coa-Footer__city-seal-wrapper">
            <img src={citySealImg} alt={intl.formatMessage(i18n.citySeal)} />
          </div>
        </div>
        <div className="col-xs-12 col-md-4">
          <p className="coa-Footer__work-in-progress">
            <WorkInProgress />
          </p>
        </div>
        <div className="col-xs-12 col-md-3 col-md-offset-3">
          <div className="coa-Footer__icons">
            <ExternalLink to="https://twitter.com/austintexasgov" noIcon={true}>
              <TwitterSVG />
            </ExternalLink>
            <ExternalLink
              to="https://www.facebook.com/austintexasgov"
              noIcon={true}
            >
              <FacebookSVG />
            </ExternalLink>
            <ExternalLink to="https://github.com/cityofaustin" noIcon={true}>
              <GithubSVG />
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
