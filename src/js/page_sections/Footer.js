import React from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import TwitterSVG from 'js/svg/Twitter';
import FacebookSVG from 'js/svg/Facebook';
import GithubSVG from 'js/svg/Github';
import ExternalLink from 'js/modules/ExternalLink';
import citySealImg from 'images/coa_seal_white.png';

const i18nMessages = defineMessages({
  sealAltText: {
    id: 'Footer.sealAltText',
    defaultMessage: 'City of Austin Seal',
  },
});

const Footer = ({ intl }) => (
  <footer className="coa-Footer">
    <div className="container-fluid wrapper">
      <div className="coa-section">
        <div className="row">
          <div className="col-xs-12 col-md-2">
            <div className="coa-Footer__city-seal-wrapper">
              <img src={citySealImg} alt={intl.formatMessage(i18nMessages.sealAltText)} />
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <p className="coa-Footer__body-text">
              <FormattedMessage
                id="Footer.bodytext"
                defaultMessage="Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit {citySiteLink}. Learn more about the new website at {projectsSiteLink}."
                values ={{
                  citySiteLink: <ExternalLink to="http://austintexas.gov">austintexas.gov</ExternalLink>,
                  projectsSiteLink: <ExternalLink to="http://projects.austintexas.io/projects/austin-digital-services-discovery/about/what-we-are-doing/">projects.austintexas.io</ExternalLink>
                }}
              />
            </p>
          </div>
          <div className="col-xs-12 col-md-3 col-md-offset-3">
            <div className="coa-Footer__icons">
              <ExternalLink to="https://twitter.com/austintexasgov" noIcon={true}>
                <TwitterSVG size="20" />
              </ExternalLink>
              <ExternalLink to="https://www.facebook.com/austintexasgov" noIcon={true}>
                <FacebookSVG size="20" />
              </ExternalLink>
              <ExternalLink to="https://github.com/cityofaustin" noIcon={true}>
                <GithubSVG size="20" />
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default injectIntl(Footer);
