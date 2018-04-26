import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-static'
import PropTypes from 'prop-types'
import { i18nalizeLinkTo } from 'js/i18n/constants'

const I18nLink = ({ intl, to, ...rest }) => (
  <Link to={i18nalizeLinkTo(to, intl.locale)} {...rest} />
)

export default injectIntl(I18nLink);
