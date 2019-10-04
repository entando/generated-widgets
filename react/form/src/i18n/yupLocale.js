import i18next from 'i18next';

export default {
  mixed: {
    required: ({ path }) =>
      i18next.t('validation.required', { field: i18next.t(`entities.conference.${path}`) }),
  },
};
