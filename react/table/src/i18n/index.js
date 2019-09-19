import en from 'i18n/locales/en.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  fallbackLng: 'en',
  resources: {
    en,
  },
});
