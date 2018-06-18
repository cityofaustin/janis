import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageHeader = ({ title, description }) => (
  <div className="coa-PageHeader">
    <h1>{title}</h1>
    {description && (
      <p className="coa-PageHeader__description">{description}</p>
    )}
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default PageHeader;
