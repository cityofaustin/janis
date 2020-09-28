import { date as i18n1 } from 'js/i18n/definitions';

export const SUPPORTED_LANGUAGES = [
  {
    // Default: English
    title: 'English',
    abbr: 'en',
    code: 'en',
    direction: 'ltr',
  },
  {
    // Spanish
    title: 'Español',
    abbr: 'es',
    code: 'es',
    direction: 'ltr',
    pending: true,
  },
  // {
  //   // Vietnamese
  //   title: 'Tiếng Việt',
  //   abbr: 'vi',
  //   code: 'vi',
  //   direction: 'ltr',
  // },
  // {
  //   // Arabic
  //   title: 'العربية',
  //   abbr: 'ar',
  //   code: 'ar',
  //   direction: 'rtl',
  // },
  //   // Simplified Chinese
  //   title: '简体中文',
  //   abbr: 'zh',
  //   code: 'zh-cn',
  // }, {
  //   // Traditional Chinese
  //   title: '繁體中文',
  //   abbr: 'zh',
  //   code: 'zh-tw',
  // }, {
  // {
  //   // Korean
  //   title: '한국어',
  //   abbr: 'ko',
  //   code: 'ko',
  // }, {
  //   // Urdu
  //   title: 'اردو',
  //   abbr: 'ur',
  //   code: 'ur',
  // }, {
  //   // Burmese
  //   title: 'မြန်မာ',
  //   abbr: 'my',
  //   code: 'my',
  // },
];

export const SUPPORTED_LANG_CODES = SUPPORTED_LANGUAGES.map(lang => lang.code);

/* regex to find 2 character lang code (if present) */
export const LANG_URL_REGEX = '(/)?:lang([a-z]{2})?/';

export const LANG_COOKIE_NAME = 'lang';

export const LANG_COOKIE_EXPIRES = 10 * 365; //days

export const DEFAULT_LANG = 'en';

export const i18nalizeLinkTo = (to, langCode = DEFAULT_LANG) => {
  let location;
  if (!to) return null;
  if (typeof to !== 'string') location = to.pathname;
  else location = to;
  if (location.charAt(0) !== '/') location = location;
  else
    location = langCode !== DEFAULT_LANG ? `/${langCode}${location}` : location;
  return location;
};

/**
  @param intl (Object): the output from the useIntl() hook in your component
**/
export const months = (intl) => (
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map(month=>intl.formatMessage(i18n1[month]))
)

/**
  @param intl (Object): the output from the useIntl() hook in your component
**/
export const weekdaysLong = (intl) => (
  [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].map(weekday=>intl.formatMessage(i18n1[`weekday${weekday}`]))
)

/**
  @param intl (Object): the output from the useIntl() hook in your component
**/
export const weekdaysShort = (intl) => (
  [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].map(weekday=>intl.formatMessage(i18n1[`weekday${weekday}Short`]))
)
