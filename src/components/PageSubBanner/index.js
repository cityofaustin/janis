import React from 'react';
import PropTypes from 'prop-types';

const PageSubBanner = ({ children }) => (
  <div className="coa-PageSubBanner">
    <div className="container-fluid wrapper wrapper--sm">
      <p>{children}</p>
    </div>
  </div>
);

PageSubBanner.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageSubBanner;
