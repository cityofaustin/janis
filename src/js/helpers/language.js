import Cookies from 'js-cookie';

const getPathWithLangCode = (linkTo, lang) => {
  let linkWithLangCode = linkTo;
  let cookieLang = Cookies.get('lang');

  if (lang) {
    linkWithLangCode = `/${lang}${linkTo}`;
  } else if (cookieLang) {
    linkWithLangCode = `/${cookieLang}${linkTo}`
  }

  return linkWithLangCode;
}

export default getPathWithLangCode;
