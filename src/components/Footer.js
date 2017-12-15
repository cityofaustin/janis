import React, { Component } from 'react';

import '../css/components/Footer.css';

class Footer extends Component {

  render() {
    return (
      <footer className="coa-Footer">
        <div className="coa-section row">
          <div className="col-xs-12">
            <h3>AUSTIN.GOV</h3>
          </div>
          <div className="col-xs-12 col-md-6 last-md">
            <p>
              Austin.gov is a new website and a work in progress. For the full City of Austin website, visit austintexas.gov. Learn more about the new website at services.austin.gov.
            </p>
          </div>
          <div className="col-xs-12 col-md-6">
            <p>
              Request 311 service or call 512-974-2000
            </p>
            <div>row of icons</div>
          </div>
        </div>
      </footer>
    );
  }

}

export default Footer;
