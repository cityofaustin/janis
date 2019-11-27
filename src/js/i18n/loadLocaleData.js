// Support locales on older browsers
// https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-to-using-native-intl-apis
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/en');
  require('@formatjs/intl-pluralrules/dist/locale-data/es');
  require('@formatjs/intl-pluralrules/dist/locale-data/vi');
  require('@formatjs/intl-pluralrules/dist/locale-data/ar');
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/es');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/vi');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/ar');
}

import messages_en from 'js/i18n/locales/en.json';
import messages_es from 'js/i18n/locales/es.json';
import messages_vi from 'js/i18n/locales/vi.json';
import messages_ar from 'js/i18n/locales/ar.json';

const localeMessages = {
  en: messages_en,
  es: messages_es,
  vi: messages_vi,
  ar: messages_ar,
};

export default localeMessages;
