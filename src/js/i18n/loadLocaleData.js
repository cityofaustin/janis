import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import vi from 'react-intl/locale-data/vi';
import ar from 'react-intl/locale-data/ar';
import messages_en from 'js/i18n/locales/en.json';
import messages_es from 'js/i18n/locales/es.json';
import messages_vi from 'js/i18n/locales/vi.json';
import messages_ar from 'js/i18n/locales/ar.json';
addLocaleData([...en, ...es, ...vi, ...ar]);

const localeMessages = {
  en: messages_en,
  es: messages_es,
  vi: messages_vi,
  ar: messages_ar,
};

export default localeMessages;