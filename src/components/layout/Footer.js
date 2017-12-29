import React, { Component } from 'react';
import TwitterSVG from 'components/svg/Twitter';
import FacebookSVG from 'components/svg/Facebook';
import GithubSVG from 'components/svg/Github';
import ExternalLinkSVG from 'components/svg/ExternalLink';

class Footer extends Component {

  render() {
    return (
      <footer className="coa-Footer">
        <div className="wrapper">
          <div className="coa-section">
            <div className="row">
              <div className="col-xs-12">
                <h3>AUSTIN.GOV</h3>
              </div>
              <div className="col-xs-12 col-md-6 last-md">
                <p className="coa-Footer__body-text">
                  Austin.gov is a new website and a work in progress. For the full City of Austin website, visit <a href="http://austintexas.gov" target="_blank" aria-label="Opens in new window">austintexas.gov <ExternalLinkSVG size="13"/></a>. Learn more about the new website at <a href="http://projects.austintexas.io/projects/austin-digital-services-discovery/about/what-we-are-doing/" target="_blank" aria-label="Opens in new window">projects.austintexas.io <ExternalLinkSVG size="13"/></a>.
                </p>
              </div>
              <div className="col-xs-12 col-md-6">
                <p>
                  Request <a href="http://311.austintexas.gov/reports/list_services" target="_blank" aria-label="Opens in new window">311 service</a> or call <a href="tel:1-512-974-2000">512-974-2000</a>
                </p>
                <div className="coa-Footer__icon_row">
                  <a href="https://twitter.com/austintexasgov" target="_blank" aria-label="Opens in new window">
                    <TwitterSVG size="20" />
                  </a>
                  <a href="https://www.facebook.com/austintexasgov" target="_blank" aria-label="Opens in new window">
                    <FacebookSVG size="20" />
                  </a>
                  <a href="https://github.com/cityofaustin" target="_blank" aria-label="Opens in new window">
                    <GithubSVG size="20" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

}

export default Footer;
