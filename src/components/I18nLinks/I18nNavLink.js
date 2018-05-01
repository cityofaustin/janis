import React from 'react';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-static';
import PropTypes from 'prop-types';
import { i18nalizeLinkTo } from 'js/i18n/constants';

const I18nNavLink = ({ intl, to, ...rest }) => (
  <NavLink to={i18nalizeLinkTo(to, intl.locale)} {...rest} />
);

export default injectIntl(I18nNavLink);
