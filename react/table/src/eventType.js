import { shape, string, instanceOf } from 'prop-types';

export default shape({
  name: string.isRequired,
  summary: string.isRequired,
  start: instanceOf(Date).isRequired,
  end: instanceOf(Date).isRequired,
});
