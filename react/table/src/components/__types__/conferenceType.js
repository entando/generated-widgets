import { shape, string } from 'prop-types';

export default shape({
  name: string.isRequired,
  summary: string,
  start: string,
  end: string,
});
