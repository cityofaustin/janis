import React from 'react'
import { NavLink } from 'react-static'
import PropTypes from 'prop-types'
import { i18nalizeLinkTo } from 'js/constants/languages'

const I18nNavLink = (props, context) => {
  const { to, ...rest } = props;
  const { langCode } = context;
  return <NavLink to={i18nalizeLinkTo({to, langCode})} {...rest} />
}

I18nNavLink.contextTypes = {
  langCode: PropTypes.string,
}

export default I18nNavLink;
