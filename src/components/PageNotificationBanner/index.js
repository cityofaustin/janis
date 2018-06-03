import React from 'react';
import PropTypes from 'prop-types';

const PageNotificationBanner = ({ children }) => (
  <div className="coa-PageNotificationBanner">
    <div className="container-fluid wrapper wrapper--sm">
      <p className="coa-isEditable">{children}</p>
    </div>
  </div>
);

PageNotificationBanner.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageNotificationBanner;
