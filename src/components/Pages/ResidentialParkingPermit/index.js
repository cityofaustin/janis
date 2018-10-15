import React, { Component } from 'react';
import Script from 'react-load-script';
import PageBanner from 'components/PageBanner';
import PageHeader from 'components/PageHeader';
import stockImg from 'images/temp/clem-onojeghuo-102750-unsplash.jpg';
import path from 'path';

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
      <div>
        <img
          src={stockImg}
          alt={'Parked Car at residential curb'}
          className="coa-PageBanner"
        />
        <section className="wrapper wrapper--sm container-fluid">
          <PageHeader>Residential Parking Permit Application</PageHeader>
          <Script
            url="https://loader.knack.com/59d6d719ca658c3c38ba7191/dist_3/knack.js"
            onLoad={this.handleScriptLoad}
          />
          <div id="knack-dist_3" className="coa-knack-rrp">
            Loading...
          </div>
        </section>
      </div>
    );
  }
}

export default ResidentialParkingPermit;
