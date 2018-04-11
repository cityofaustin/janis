import React from 'react';
import PropTypes from 'prop-types';

const HtmlFromAdmin = ({ title, content }) => (
  <div className="coa-HtmlFromAdmin">
    <h2 className="coa-HtmlFromAdmin__title">{title}</h2>
    <div className="coa-HtmlFromAdmin__content" dangerouslySetInnerHTML={{__html: content}} />
  </div>
);

HtmlFromAdmin.contextTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default HtmlFromAdmin;
