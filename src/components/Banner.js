import React, { Component } from 'react';

class Banner extends Component {

  // TODO: Add controls for "here's how you know"

  render() {
    return (
      <div className="usa-banner">
        <div className="usa-accordion">
          <header className="usa-banner-header">
            <div className="usa-grid usa-banner-inner">
              {/* <img src="/assets/img/favicons/favicon-57.png" alt="U.S. flag" /> */}
              <p>An official website of the City of Austin government</p>
              <button className="usa-accordion-button usa-banner-button" aria-expanded="false" aria-controls="gov-banner">
                <span className="usa-banner-button-text">Here's how you know</span>
              </button>
            </div>
          </header>
          <div className="usa-banner-content usa-grid usa-accordion-content" id="gov-banner" aria-hidden="true">
            <div className="usa-banner-guidance-gov usa-width-one-half">
              <img className="usa-banner-icon usa-media_block-img" src="/assets/img/icon-dot-gov.svg" alt="Dot gov" />
              <div className="usa-media_block-body">
                <p>
                  <strong>The .gov means it’s official.</strong>
                  <br />
                  Federal government websites often end in .gov or .mil. Before sharing sensitive information, make sure you're on a federal government site.
                </p>
              </div>
            </div>
            <div className="usa-banner-guidance-ssl usa-width-one-half">
              <img className="usa-banner-icon usa-media_block-img" src="/assets/img/icon-https.svg" alt="Https" />
              <div className="usa-media_block-body">
                <p>
                  <strong>The site is secure.</strong>
                  <br />
                  The <strong>https://</strong> ensures that you are connecting to the official website and that any information you provide is encrypted and transmitted securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Banner;
