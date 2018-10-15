import React, { Component } from 'react';
import Script from 'react-load-script';

class ResidentialParkingPermit extends Component {
  constructor(props) {
    super(props);

    window.app_id = '59d6d719ca658c3c38ba7191';
    window.distribution_key = 'dist_3';
  }

  handleScriptLoad = () => {
    console.log('Knack.js loaded');
  };

  render() {
    return (
      <section className="wrapper wrapper--sm">
        <h1>🅿️ Residential Parking Permit</h1>️
        <Script
          url="https://loader.knack.com/59d6d719ca658c3c38ba7191/dist_3/knack.js"
          onLoad={this.handleScriptLoad}
        />
        <div id="knack-dist_3">Loading...</div>
      </section>
    );
  }
}

export default ResidentialParkingPermit;
