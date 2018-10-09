import React, { Component } from 'react';
import Script from 'react-load-script';

class ResidentialParkingPermit extends Component {
  constructor(props) {
    super(props);

    window.app_id = '59d6d719ca658c3c38ba7191';
    window.distribution_key = 'dist_2';
  }

  handleScriptLoad = () => {
    console.log('Knack.js loaded');
  };

  render() {
    return (
      <section className="wrapper wrapper--sm">
        <h1>🅿️ Residential Parking Permit Page</h1>️
        <Script
          url="https://loader.knack.com/59d6d719ca658c3c38ba7191/dist_2/knack.js"
          onLoad={this.handleScriptLoad}
        />
        {/* <script type="text/javascript">
          app_id="59d6d719ca658c3c38ba7191";distribution_key="dist_2";
        </script>
        <script
          type="text/javascript"
          src="https://loader.knack.com/59d6d719ca658c3c38ba7191/dist_2/knack.js"
        /> */}
        <div id="knack-dist_2">Loading...</div>
      </section>
    );
  }
}

export default ResidentialParkingPermit;
