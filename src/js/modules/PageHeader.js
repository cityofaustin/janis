import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ title, description }) => (
  <div>
    <h1 className="coa-PageHeader">{title}</h1>
    { description && (
      <p className="coa-PageHeader__description">
        {description}
      </p>
    )}

  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};


export default PageHeader;
