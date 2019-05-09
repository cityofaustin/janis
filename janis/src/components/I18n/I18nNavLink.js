import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-static';
import { i18nalizeLinkTo } from 'js/i18n/constants';

const I18nNavLink = ({ intl, to, ...rest }) => (
  <NavLink to={i18nalizeLinkTo(to, intl.locale)} {...rest} />
);

I18nNavLink.propTypes = {
  to: PropTypes.string.isRequired,
};

export default injectIntl(I18nNavLink);
