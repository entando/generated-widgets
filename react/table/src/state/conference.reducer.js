export const initialState = {
  items: [],
  errorMessage: null,
  loading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'readAll':
      return { ...state, items: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    case 'clearErrors':
      return { ...state, errorMessage: null };
    case 'conference.form.create':
      return { ...state, items: [...state.items, action.payload] };
    case 'conference.form.update': {
      const i = state.items.findIndex(item => {
        return item.id === action.payload.id;
      });
      const items = [...state.items];
      items[i] = action.payload;
      return { ...state, items };
    }
    case 'conference.form.delete':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    default:
      return state;
  }
};
