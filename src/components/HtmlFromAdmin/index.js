import React from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';

const HtmlFromAdmin = ({ content }) => Parser(content);

HtmlFromAdmin.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HtmlFromAdmin;
