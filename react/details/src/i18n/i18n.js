import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import locales from 'i18n/locales';

// function getResources(translations) {
//   return Object.keys(translations).reduce(
//     (acc, lang) => ({ ...acc, [lang]: { translation: translations[lang] } }),
//     {}
//   );
// }

i18next.use(initReactI18next).init({
  keySeparator: '.',
  resources: locales,
  ns: Object.keys(locales[Object.keys(locales)[0]]),
  nsSeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});
