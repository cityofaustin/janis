import React from 'react';
import { Link } from 'react-static'
import PropTypes from 'prop-types'
import { i18nalizeLinkTo } from 'js/constants/languages'

const I18nLink = (props, context) => {
  const { to, ...rest } = props;
  const { langCode } = context;
  return <Link to={i18nalizeLinkTo({to, langCode})} {...rest} />
}

I18nLink.contextTypes = {
  langCode: PropTypes.string,
}

export default I18nLink;
