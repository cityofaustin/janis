import React, { Component } from 'react';
import { Routes } from 'react-static';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import ReactGA from 'react-ga';
import { logPageView } from 'js/helpers/googleAnalytics';

const CMSLive = ({ intl }) => {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS, { titleCase: false });
  logPageView();
  return <Routes />;
};

CMSLive.propTypes = {};

export default injectIntl(CMSLive);
