import 'date-fns';
import dateFnsLocales from 'i18n/dateFnsLocales';
import DateFnsUtils from '@date-io/date-fns';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formValues, formTouched, formErrors } from 'components/__types__/conferenceTypes';
import { withFormik } from 'formik';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const styles = theme => ({
  root: {
    margin: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
});

class ConferenceForm extends PureComponent {
  render() {
    const {
      classes,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit: formikHandleSubmit,
      isSubmitting,
      setFieldValue,
      t,
      i18n,
    } = this.props;

    const handleDateChange = field => value => {
      setFieldValue(field, value);
    };

    const dateLabelFn = date => (date ? new Date(date).toLocaleString(i18n.language) : '');

    const getHelperText = field => (errors[field] && touched[field] ? errors[field] : '');

    const handleSubmit = e => {
      e.stopPropagation(); // avoids double submission caused by react-shadow-dom-retarget-events
      formikHandleSubmit(e);
    };

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateFnsLocales[i18n.language]}>
        <form onSubmit={handleSubmit} className={classes.root} data-testid="conference-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-name"
                error={errors.name && touched.name}
                helperText={getHelperText('name')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
                label={t('entities.conference.name')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-summary"
                multiline
                error={errors.summary && touched.summary}
                helperText={getHelperText('summary')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.summary}
                name="summary"
                label={t('entities.conference.summary')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                id="conference-start"
                error={errors.start && touched.start}
                helperText={getHelperText('start')}
                className={classes.textField}
                onChange={handleDateChange('start')}
                value={values.start}
                labelFunc={dateLabelFn}
                name="start"
                label={t('entities.conference.start')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                id="conference-end"
                error={errors.end && touched.end}
                helperText={getHelperText('end')}
                className={classes.textField}
                onChange={handleDateChange('end')}
                value={values.end}
                labelFunc={dateLabelFn}
                name="end"
                label={t('entities.conference.end')}
              />
            </Grid>
            <Button type="submit" color="primary" disabled={isSubmitting} data-testid="submit-btn">
              {t('common.save')}
            </Button>
          </Grid>
        </form>
      </MuiPickersUtilsProvider>
    );
  }
}

ConferenceForm.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    textField: PropTypes.string,
    submitButton: PropTypes.string,
  }),
  values: formValues,
  touched: formTouched,
  errors: formErrors,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
};

ConferenceForm.defaultProps = {
  classes: {},
  values: {},
  touched: {},
  errors: {},
};

const emptyConference = {
  name: '',
  summary: '',
  start: null,
  end: null,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  summary: Yup.string(),
  start: Yup.date().nullable(),
  end: Yup.date().nullable(),
});

const formikBag = {
  mapPropsToValues: ({ conference }) => conference || emptyConference,

  enableReinitialize: true,

  validationSchema,

  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values);
    setSubmitting(false);
  },

  displayName: 'ConferenceForm',
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withTranslation(),
  withFormik(formikBag)
)(ConferenceForm);
