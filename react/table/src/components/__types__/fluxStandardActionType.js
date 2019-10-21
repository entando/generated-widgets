import { shape, string, bool } from 'prop-types';

export default shape({
  type: string.isRequired,
  payload: shape({}),
  error: bool,
  meta: shape({}),
});
