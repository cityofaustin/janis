import React from 'react';
import { FormattedMessage } from 'react-intl';
import TwitterSVG from 'js/svg/Twitter';
import FacebookSVG from 'js/svg/Facebook';
import GithubSVG from 'js/svg/Github';
import ExternalLink from 'js/modules/ExternalLink';

const Footer = (props) => (
  <footer className="coa-Footer">
    <div className="container-fluid wrapper">
      <div className="coa-section">
        <div className="row">
          <div className="col-xs-12">
            <h3>AUSTIN.GOV</h3>
          </div>
          <div className="col-xs-12 col-md-6 last-md">
            <p className="coa-Footer__body-text">
              <FormattedMessage
                id="Footer.bodytext"
                defaultMessage="Austin.gov is a new website and a work in progress. For the full City of Austin website, visit {citySiteLink}. Learn more about the new website at {projectsSiteLink}."
                values ={{
                  citySiteLink: <ExternalLink to="http://austintexas.gov" iconSize="small">austintexas.gov</ExternalLink>,
                  projectsSiteLink: <ExternalLink to="http://projects.austintexas.io/projects/austin-digital-services-discovery/about/what-we-are-doing/" iconSize="small">projects.austintexas.io</ExternalLink>
                }}
              />
            </p>
          </div>
          <div className="col-xs-12 col-md-6">
            <p>
              <FormattedMessage
                id="Footer.311text"
                defaultMessage="Request services at {servicesLink} or call {phoneLink}."
                values = {{
                  servicesLink: <ExternalLink to="http://311.austintexas.gov/reports/list_services" iconSize="small">311.austintexas.gov</ExternalLink>,
                  phoneLink: <a href="tel:1-512-974-2000">512-974-2000</a>
                }}
              />
            </p>
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

export default Footer;
