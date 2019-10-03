export default {
  mixed: {
    required: ({ path }) => ({ key: 'validation.required', options: { field: path } }),
  },
};
