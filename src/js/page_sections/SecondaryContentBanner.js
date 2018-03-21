import React from 'react';

const SecondaryContentBanner = ({ children }) => (
  <div className="coa-SecondaryContentBanner">
    <div className="container-fluid wrapper">
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default SecondaryContentBanner;
