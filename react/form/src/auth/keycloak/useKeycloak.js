const useKeycloak =
  ((process && process.env && process.env.REACT_APP_AUTH_TYPE) || '').toUpperCase() === 'KEYCLOAK';

export default useKeycloak;
