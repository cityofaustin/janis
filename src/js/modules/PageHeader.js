import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ title, description, hasBorder }) => (
  <div className={`coa-PageHeader ${hasBorder ? 'coa-PageHeader--hasBorder' : ''}`}>
    <h1>{title}</h1>
    { description && (
      <p className="coa-PageHeader__description">
        {description}
      </p>
    )}

  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  hasBorder: PropTypes.bool,
};

export default PageHeader;
