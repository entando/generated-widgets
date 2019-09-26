import { shape, string } from 'prop-types';

export default shape({
  name: string.isRequired,
  summary: string.isRequired,
  start: string.isRequired,
  end: string.isRequired,
});
