import { INPUT_EVENT_TYPES } from 'custom-elements/widgetEventTypes';
import {
  READ_ALL,
  ERROR_FETCH,
  CLEAR_ERRORS,
  CREATE,
  UPDATE,
  DELETE,
} from 'state/conference.types';

export const initialState = {
  items: [],
  errorMessage: null,
  errorStatus: null,
  loading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case READ_ALL:
      return { ...state, items: action.payload };
    case ERROR_FETCH:
      return { ...state, errorMessage: action.payload.message, errorStatus: action.payload.status };
    case CLEAR_ERRORS:
      return { ...state, errorMessage: null, errorStatus: null };
    case CREATE:
    case INPUT_EVENT_TYPES.formCreate:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE:
    case INPUT_EVENT_TYPES.formUpdate: {
      const i = state.items.findIndex(item => {
        return item.id === action.payload.id;
      });
      const items = [...state.items];
      items[i] = action.payload;
      return { ...state, items };
    }
    case DELETE:
    case INPUT_EVENT_TYPES.formDelete:
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    default:
      return state;
  }
};
