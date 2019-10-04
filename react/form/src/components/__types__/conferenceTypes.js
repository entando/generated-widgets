import { shape, string, bool, oneOfType, instanceOf } from 'prop-types';

export default shape({
  name: string.isRequired,
  summary: string.isRequired,
  start: string.isRequired,
  end: string.isRequired,
});

export const formValues = shape({
  name: string,
  summary: string,
  start: oneOfType([string, instanceOf(Date)]),
  end: oneOfType([string, instanceOf(Date)]),
});

export const formTouched = shape({
  name: bool,
  summary: bool,
  start: oneOfType([bool, shape({})]),
  end: oneOfType([bool, shape({})]),
});

export const formErrors = shape({
  name: oneOfType([string, shape({})]),
  summary: oneOfType([string, shape({})]),
  start: oneOfType([string, shape({})]),
  end: oneOfType([string, shape({})]),
});
