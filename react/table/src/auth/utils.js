// eslint-disable-next-line import/prefer-default-export
export const getAuthMethod = () =>
  ((process && process.env && process.env.REACT_APP_AUTH_TYPE) || '').toUpperCase();
