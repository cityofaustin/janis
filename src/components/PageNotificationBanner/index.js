import React from 'react';
import PropTypes from 'prop-types';

const PageNotificationBanner = ({ children }) => (
  <div className="coa-PageNotificationBanner">
    <div className="container-fluid wrapper wrapper--sm">
      <p>{children}</p>
    </div>
  </div>
);

PageNotificationBanner.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageNotificationBanner;
