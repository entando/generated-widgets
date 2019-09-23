function apiCall(
  method,
  url,
  options = {
    headers: new Headers({
      Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
      'Content-Type': 'application/json',
    }),
  }
) {
  return fetch(url, { method, ...options });
}

const API = {
  get: apiCall.bind(undefined, 'GET'),
  post: apiCall.bind(undefined, 'POST'),
};

export default API;
