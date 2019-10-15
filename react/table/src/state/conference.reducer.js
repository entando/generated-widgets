export const initialState = {
  items: [],
  errorMessage: null,
  loading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'readAll':
      return { ...state, items: action.payload };
    case 'create':
      return { ...state, items: [...state.items, action.payload] };
    case 'update': {
      const i = state.items.findIndex(item => {
        return item.id === action.payload.id;
      });
      const items = [...state.items];
      items[i] = action.payload;
      return { ...state, items };
    }
    case 'delete':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    case 'error':
      return { ...state, errorMessage: action.payload };
    case 'clearErrors':
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};
