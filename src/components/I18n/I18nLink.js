import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { i18nalizeLinkTo } from 'js/i18n/constants';

const I18nLink = ({ intl, to, ...rest }) => (
  <a href={i18nalizeLinkTo(to, intl.locale)} {...rest} />
);

I18nLink.propTypes = {
  to: PropTypes.string.isRequired,
};

export default injectIntl(I18nLink);
