import React from 'react';
import { Link, withRouteData } from 'react-static'
import { i18nalizeLinkTo } from 'js/constants/languages'

const I18nLink = (props) => {
  const {langCode, to, ...rest} = props;
  //TO DO -- only pass Link props, not all remaining ...rest
  return <Link to={i18nalizeLinkTo({to, langCode})} {...rest} />
}

export default withRouteData(I18nLink);
