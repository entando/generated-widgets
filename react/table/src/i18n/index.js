import en from 'i18n/locales/en.json';
import it from 'i18n/locales/it.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const defaultNs = 'translation';

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  ns: [defaultNs],
});

i18next.addResourceBundle('en', defaultNs, en);
i18next.addResourceBundle('it', defaultNs, it);
