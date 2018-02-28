import React from 'react'
import { NavLink, withRouteData } from 'react-static'
import { i18nalizeLinkTo } from 'js/constants/languages'

const I18nNavLink = (props) => {
  const {langCode, to, ...rest} = props;
  //TO DO -- only pass NavLink props, not all remaining ...rest
  return <NavLink to={i18nalizeLinkTo({to, langCode})} {...rest} />
}

export default withRouteData(I18nNavLink);
