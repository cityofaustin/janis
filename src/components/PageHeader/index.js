import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SectionHeader from 'components/SectionHeader';

const PageHeader = ({ description, children, contentType }) => (
  <div
    className={
      'coa-PageHeader ' + (contentType ? `coa-PageHeader--${contentType}` : '')
    }
  >
    <div className="wrapper container-fluid">
      <h1>{children}</h1>
      {description && (
        <p className="coa-PageHeader__description">{description}</p>
      )}

      {contentType && contentType === 'information' ? <SectionHeader /> : null}
    </div>
  </div>
);

PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
};

export default PageHeader;
