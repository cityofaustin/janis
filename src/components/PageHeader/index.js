import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageHeader = ({ title, description, hasBorder }) => (
  <div
    className={classNames('coa-PageHeader', {
      'coa-PageHeader--hasBorder': hasBorder,
    })}
  >
    <h1>{title}</h1>
    {description && (
      <p className="coa-PageHeader__description">{description}</p>
    )}
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  hasBorder: PropTypes.bool,
};

export default PageHeader;
