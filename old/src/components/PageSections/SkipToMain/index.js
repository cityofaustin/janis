import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { navigation as i18n } from 'js/i18n/definitions';

const SkipToMain = ({ intl }) => (
  <a href="#main" className="usa-skipnav">
    {intl.formatMessage(i18n.skipToMain)}
  </a>
);

SkipToMain.propTypes = {};

export default injectIntl(SkipToMain);
