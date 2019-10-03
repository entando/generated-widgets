import { shape, string, bool, oneOfType } from 'prop-types';

export default shape({
  name: string.isRequired,
  summary: string.isRequired,
  start: string.isRequired,
  end: string.isRequired,
});

export const formValues = shape({
  name: string,
  summary: string,
  start: string,
  end: string,
});

export const formTouched = shape({
  name: bool,
  summary: bool,
  start: bool,
  end: bool,
});

export const formErrors = shape({
  name: oneOfType([string, shape({})]),
  summary: oneOfType([string, shape({})]),
  start: oneOfType([string, shape({})]),
  end: oneOfType([string, shape({})]),
});
