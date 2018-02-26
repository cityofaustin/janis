export const SUPPORTED_LANGUAGES = [
  { // Default: English
    title: 'English',
    abbr: 'en',
    code: 'en',
  },
  { // Spanish
    title: 'Español',
    abbr: 'es',
    code: 'es',
  },
  { // Vietnamese
    title: 'Tiếng Việt',
    abbr: 'vi',
    code: 'vi',
  },
  { // Arabic
    title: 'عربى',
    abbr: 'ar',
    code: 'ar',
  },
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
]

export const SUPPORTED_LANG_CODES = SUPPORTED_LANGUAGES.map(lang => lang.code);

export const LANG_COOKIE_NAME = 'lang';

export const LANG_COOKIE_EXPIRES = 10 * 365; //days

export const DEFAULT_LANG = 'en';
