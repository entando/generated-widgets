import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './translations/en/common.json';
import entityBookEn from './translations/en/entity-book.json';
import entityAuthorEn from './translations/en/entity-author.json';
import entityCommentEn from './translations/en/entity-comment.json';
import entityLibrariesEn from './translations/en/entity-library.json';

import commonLt from './translations/lt/common.json';
import entityBookLt from './translations/lt/entity-book.json';
import entityAuthorLt from './translations/lt/entity-author.json';
import entityCommentLt from './translations/lt/entity-comment.json';
import entityLibrariesLt from './translations/lt/entity-library.json';

i18n.use(initReactI18next).init({
  lng: 'lt',
  fallbackLng: 'en',
  debug: true,

  resources: {
    en: {
      common: commonEn,
      'entity-books': entityBookEn,
      'entity-authors': entityAuthorEn,
      'entity-comments': entityCommentEn,
      'entity-libraries': entityLibrariesEn,
    },
    lt: {
      common: commonLt,
      'entity-books': entityBookLt,
      'entity-authors': entityAuthorLt,
      'entity-comments': entityCommentLt,
      'entity-libraries': entityLibrariesLt,
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
