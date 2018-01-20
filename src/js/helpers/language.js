import Cookies from 'js-cookie';
import { SUPPORTED_LANG_CODES } from 'js/constants/languages';

export const getPathWithLangCode = (linkTo, lang) => {
  let linkWithLangCode = linkTo;
  let cookieLang = Cookies.get('lang');

  if (lang) {
    linkWithLangCode = `/${lang}${linkTo}`;
  } else if (cookieLang) {
    linkWithLangCode = `/${cookieLang}${linkTo}`
  }

  return linkWithLangCode;
}

export const getPathnameWithoutLangCode = (pathname) => {
  let pathArray = pathname.split('/').filter(n => n);
  if (SUPPORTED_LANG_CODES.includes(pathArray[0])){
    pathArray.splice(0, 1)
  }
  return pathArray.join('/');
}
