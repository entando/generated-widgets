import 'date-fns';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formValues, formTouched, formErrors } from 'components/__types__/conference';
import { withFormik } from 'formik';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import dateFnsLocales from 'i18n/dateFnsLocales';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

    const dateTimeLabelFn = date => (date ? new Date(date).toLocaleString(i18n.language) : '');
    const dateLabelFn = date => (date ? new Date(date).toLocaleDateString(i18n.language) : '');
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
              <DatePicker
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
              <DatePicker
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
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-conferencePrice"
                error={errors.conferencePrice && touched.conferencePrice}
                helperText={getHelperText('conferencePrice')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.conferencePrice}
                name="conferencePrice"
                label={t('entities.conference.conferencePrice')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-conferenceId"
                error={errors.conferenceId && touched.conferenceId}
                helperText={getHelperText('conferenceId')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.conferenceId}
                name="conferenceId"
                label={t('entities.conference.conferenceId')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                id="conference-registration"
                error={errors.registration && touched.registration}
                helperText={getHelperText('registration')}
                className={classes.textField}
                onChange={handleDateChange('registration')}
                value={values.registration}
                labelFunc={dateTimeLabelFn}
                name="registration"
                label={t('entities.conference.registration')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-attendeeCount"
                error={errors.attendeeCount && touched.attendeeCount}
                helperText={getHelperText('attendeeCount')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.attendeeCount}
                name="attendeeCount"
                label={t('entities.conference.attendeeCount')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-venueName"
                error={errors.venueName && touched.venueName}
                helperText={getHelperText('venueName')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.venueName}
                name="venueName"
                label={t('entities.conference.venueName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-venueLat"
                error={errors.venueLat && touched.venueLat}
                helperText={getHelperText('venueLat')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.venueLat}
                name="venueLat"
                label={t('entities.conference.venueLat')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-venueLong"
                error={errors.venueLong && touched.venueLong}
                helperText={getHelperText('venueLong')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.venueLong}
                name="venueLong"
                label={t('entities.conference.venueLong')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-venueId"
                error={errors.venueId && touched.venueId}
                helperText={getHelperText('venueId')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.venueId}
                name="venueId"
                label={t('entities.conference.venueId')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                id="conference-saleStartDate"
                error={errors.saleStartDate && touched.saleStartDate}
                helperText={getHelperText('saleStartDate')}
                className={classes.textField}
                onChange={handleDateChange('saleStartDate')}
                value={values.saleStartDate}
                labelFunc={dateTimeLabelFn}
                name="saleStartDate"
                label={t('entities.conference.saleStartDate')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="conference-earlyBirdActive"
                    name="earlyBirdActive"
                    onChange={handleChange}
                    checked={values.earlyBirdActive}
                    value="conference-earlyBirdActive"
                    color="primary"
                  />
                }
                label={t('entities.conference.earlyBirdActive')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="conference-region">
                {t('entities.conference.region')}
              </InputLabel>
              <Select
                id="conference-region"
                error={errors.region && touched.region}
                className={classes.textField}
                onBlur={handleBlur}
                value={values.region}
                name="region"
                onChange={handleChange}
              >
                <MenuItem value="NA">NA</MenuItem>
                <MenuItem value="SA">SA</MenuItem>
                <MenuItem value="ASIA">ASIA</MenuItem>
                <MenuItem value="EUROPE">EUROPE</MenuItem>
                <MenuItem value="OCEANIA">OCEANIA</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="conference-signature"
                error={errors.signature && touched.signature}
                helperText={getHelperText('signature')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.signature}
                name="signature"
                label={t('entities.conference.signature')}
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
  conferencePrice: '',
  conferenceId: '',
  registration: null,
  attendeeCount: '',
  venueName: '',
  venueLat: '',
  venueLong: '',
  venueId: '',
  saleStartDate: null,
  earlyBirdActive: false,
  region: '',
  signature: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  summary: Yup.string(),
  start: Yup.date().nullable().required(),
  end: Yup.date().nullable(),
  conferencePrice: Yup.number(),
  conferenceId: Yup.number().required(),
  registration: Yup.date().nullable().required(),
  attendeeCount: Yup.number().required(),
  venueName: Yup.string().required(),
  venueLat: Yup.number().required(),
  venueLong: Yup.number().required(),
  venueId: Yup.number().required(),
  saleStartDate: Yup.date().nullable().required(),
  earlyBirdActive: Yup.boolean().required(),
  region: Yup.string().required(),
  signature: Yup.string(),
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
