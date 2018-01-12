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
    // Vietnamese
    title: 'Tiếng Việt',
    abbr: 'vi',
    code: 'vi',
  }, {
    // Simplified Chinese
    title: '简体中文',
    abbr: 'zh',
    code: 'zh-hans',
  }, {
    // Traditional Chinese
    title: '繁體中文',
    abbr: 'zh',
    code: 'zh-hant',
  }, {
    // Arabic
    title: 'عربى',
    abbr: 'ar',
    code: 'ar',
  }, {
    // Korean
    title: '한국어',
    abbr: 'ko',
    code: 'ko',
  }, {
    // Urdu
    title: 'اردو',
    abbr: 'ur',
    code: 'ur',
  }, {
    // Burmese
    title: 'မြန်မာ',
    abbr: 'my',
    code: 'my',
  },
]

export const SUPPORTED_LANG_CODES = SUPPORTED_LANGUAGES.map(lang => lang.code);
