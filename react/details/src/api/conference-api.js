const generateApiHelpers = method => {
  const defaultOptions = {
    headers: new Headers({
      // TODO: Token should be passed or auth process should be changed
      Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
      'Content-Type': 'application/json',
    }),
  };

  // returning functions
  return (params = {}) => {
    const { options, data, id } = params;
    const entityEndpoint = 'conferences'; // lowercase plural

    const url = `${process.env.REACT_APP_DOMAIN}${entityEndpoint}${id ? `/${id}` : ''}`;

    return fetch(url, {
      method,
      ...defaultOptions,
      ...options,
      ...(data ? { body: JSON.stringify(data) } : {}),
    })
      .then(response =>
        // making sure unsuccessful responses (e.g., 404) are treated as rejected requests
        response.status >= 200 && response.status < 300
          ? Promise.resolve(response)
          : Promise.reject(new Error(response.statusText || response.status))
      )
      .then(response => response.json());
  };
};

const API = {
  get: generateApiHelpers('GET'),
  post: generateApiHelpers('POST'),
  put: generateApiHelpers('PUT'),
  delete: generateApiHelpers('DELETE'),
};

export default API;
