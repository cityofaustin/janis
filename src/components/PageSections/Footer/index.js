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
import CitySealSVG from 'components/SVGs/CitySeal';
import citySealImg from 'images/coa_seal_white.png';

import ThreeOneOne from 'components/PageSections/ThreeOneOne';
import { threeoneonePropTypes } from 'components/PageSections/ThreeOneOne/proptypes';

import FooterSiteMap from 'components/PageSections/Footer/FooterSiteMap';

const Footer = ({ threeoneone, intl }) => (
  <footer className="coa-FooterContainer">
    <div className="container-fluid wrapper">
      {/*
        Commenting out until we finalize IA and FooterSiteMap menu data + sections
      <FooterSiteMap />
      */}
      <div className="coa-Footer">
        <div className="row">
          <div className="col-xs-12">
            <div className="coa-Footer__city-seal-wrapper">
              <CitySealSVG />
            </div>

            <div className="coa-Footer__work-in-progress">
              <WorkInProgress isClipped={true} />
            </div>
            <div className="coa-Footer__more_text_boxes">
              <div className="coa-Footer__more_text_box">
                {intl.formatMessage(i18n.forFullVisit)}{' '}
                <ExternalLink to={'https://www.austintexas.gov/'}>
                  austintexas.gov.
                </ExternalLink>
              </div>
            </div>
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

// <img src={citySealImg} alt={intl.formatMessage(i18n.citySeal)} />
