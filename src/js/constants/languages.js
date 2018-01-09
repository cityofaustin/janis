export const SUPPORTED_LANGUAGES = [
  {
    title: 'English',
    abbr: 'en',
    code: 'en',
  }, {
    title: 'Español',
    abbr: 'es',
    code: 'es',
  }, {
    title: 'Tiếng Việt',
    abbr: 'vi',
    code: 'vi',
  }, {
    title: '中文',
    abbr: 'zh',
    code: 'zh-hans',
  }, {
    title: 'Chinese (Traditional)',
    abbr: 'zh',
    code: 'zh-hant',
  }, {
    title: 'عربى',
    abbr: 'ar',
    code: 'ar',
  }, {
    title: '한국어',
    abbr: 'ko',
    code: 'ko',
  }, {
    title: 'اردو',
    abbr: 'ur',
    code: 'ur',
  }, {
    title: 'မြန်မာ',
    abbr: 'my',
    code: 'my',
  },
]

export const SUPPORTED_LANG_CODES = SUPPORTED_LANGUAGES.map(lang => lang.code);
