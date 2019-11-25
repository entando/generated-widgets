import { INPUT_EVENT_TYPES } from 'custom-elements/widgetEventTypes';
import { CHANGE_ITEMS_PER_PAGE, CHANGE_PAGE, LOAD_MORE } from 'state/pagination.types';
import { ADD_FILTER, UPDATE_FILTER, DELETE_FILTER, CLEAR_FILTERS } from 'state/filter.types';
import {
  READ_ALL,
  ERROR_FETCH,
  CLEAR_ERRORS,
  CREATE,
  UPDATE,
  DELETE,
} from 'state/conference.types';

export const initialState = {
  pagination: {
    page: 0,
    itemCount: 0,
    rowsPerPage: 25,
  },
  filters: [],
  items: [],
  errorMessage: null,
  errorStatus: null,
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ITEMS_PER_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          rowsPerPage: parseInt(action.payload, 10),
          page: 0,
        },
      };
    case CHANGE_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
      };
    case LOAD_MORE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: state.pagination.page + 1,
        },
      };
    case ADD_FILTER:
      return {
        ...state,
        filters: [...state.filters, { field: '', operator: '', value: '' }],
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filters: state.filters.map((filter, index) =>
          index === action.payload.filterId ? { ...filter, ...action.payload.values } : filter
        ),
      };
    case DELETE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((f, index) => index !== action.payload.filterId),
        pagination: {
          ...state.pagination,
          page: 0,
        },
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        pagination: {
          ...state.pagination,
          page: 0,
        },
      };
    case READ_ALL:
      return {
        ...state,
        items: action.payload.items,
        pagination: { ...state.pagination, itemCount: action.payload.count },
      };
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
