import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageHeader = ({ description, children }) => (
  <div className="coa-PageHeader">
    <h1>{children}</h1>
    {description && (
      <p className="coa-PageHeader__description">{description}</p>
    )}
  </div>
);

PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
};

export default PageHeader;
