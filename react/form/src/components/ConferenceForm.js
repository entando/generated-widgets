import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import { formValues, formTouched, formErrors } from 'types/conferenceTypes';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withTranslation } from 'react-i18next';
import { compose } from 'recompose';

const ConferenceForm = props => {
  const {
    classes,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    t,
  } = props;

  const handleDateChange = field => value => setFieldValue(field, value);

  const translateHelperText = field => (errors[field] && touched[field] ? errors[field] : '');

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          error={errors.name && touched.name}
          helperText={translateHelperText('name')}
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          name="name"
          label={t('entities.conference.name')}
        />
        <TextField
          multiline
          error={errors.summary && touched.summary}
          helperText={translateHelperText('summary')}
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.summary}
          name="summary"
          label={t('entities.conference.summary')}
        />
        <DateTimePicker
          error={errors.start && touched.start}
          helperText={translateHelperText('start')}
          className={classes.textField}
          onChange={handleDateChange('start')}
          value={values.start}
          name="start"
          label={t('entities.conference.start')}
        />
        <DateTimePicker
          error={errors.end && touched.end}
          helperText={translateHelperText('end')}
          className={classes.textField}
          onChange={handleDateChange('end')}
          value={values.end}
          name="end"
          label={t('entities.conference.end')}
        />
        <Button type="submit" color="primary">
          {t('common.save')}
        </Button>
      </form>
    </MuiPickersUtilsProvider>
  );
};

ConferenceForm.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    textField: PropTypes.string,
  }),
  values: formValues,
  touched: formTouched,
  errors: formErrors,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

ConferenceForm.defaultProps = {
  classes: {},
  values: {},
  touched: {},
  errors: {},
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

const emptyConference = {
  name: '',
  summary: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  summary: Yup.string().required(),
  start: Yup.date().required(),
  end: Yup.date().required(),
});

const formikBag = {
  mapPropsToValues: ({ conference }) => conference || emptyConference,

  enableReinitialize: true,

  validationSchema,

  handleSubmit: (values, { props: { onSubmit } }) => {
    onSubmit(values);
  },

  displayName: 'ConferenceForm',
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withTranslation(),
  withFormik(formikBag)
)(ConferenceForm);
