import React from 'react';

const RowContainer = ({formUrl, ErrorMessage}) => (
  <div className="wrapper container-fluid">
    <div className="row">
      <div id="coa-LockedIframeRequestMessage" className="col-xs-12 col-md-8">

        <ErrorMessage formUrl={formUrl}/>

      </div>
    </div>
  </div>
);

export default RowContainer;
