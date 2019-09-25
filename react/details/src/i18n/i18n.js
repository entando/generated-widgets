import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import locales from 'i18n/locales';

i18next.use(initReactI18next).init({
  lng: 'en', // TODO: Handle this with changeLanguage (?)

  keySeparator: '.',
  resources: locales,
  interpolation: {
    escapeValue: false,
  },
});
