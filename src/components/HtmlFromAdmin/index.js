import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from 'components/SectionHeader';

const HtmlFromAdmin = ({ title, content }) => (
  <div className="coa-HtmlFromAdmin">
    <SectionHeader>{title}</SectionHeader>
    <div className="coa-HtmlFromAdmin__content" dangerouslySetInnerHTML={{__html: content}} />
  </div>
);

HtmlFromAdmin.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default HtmlFromAdmin;
