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
import Select from '@material-ui/core/Select';
import ConfirmationDialogTrigger from 'components/common/ConfirmationDialogTrigger';

const styles = theme => ({
  root: {
    margin: theme.spacing(3),
  },
  button: {
    marginBottom: '10px',
  },
  downloadAnchor: {
    color: 'inherit',
    textDecoration: 'inherit',
    fontWeight: 'inherit',
    '&:link, &:visited, &:hover, &:active': {
      color: 'inherit',
      textDecoration: 'inherit',
      fontWeight: 'inherit',
    },
  },
  textField: {
    width: '100%',
  },
});

class ConferenceForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleConfirmationDialogAction = this.handleConfirmationDialogAction.bind(this);
  }

  handleConfirmationDialogAction(action) {
    const { onDelete, values } = this.props;
    switch (action) {
      case ConfirmationDialogTrigger.CONFIRM: {
        onDelete(values);
        break;
      }
      default:
        break;
    }
  }

  render() {
    const {
      classes,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit: formikHandleSubmit,
      onDelete,
      onCancelEditing,
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
    const getFormattedTime = () => {
      const today = new Date();
      return `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
    };

    const handleFiles = field => event => {
      const uploadedFile = event.target;
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        const imageData = dataURL.match(/data:([^;]*);base64,(.*)$/);
        if (imageData && imageData[1] && imageData[2]) {
          setFieldValue(field, imageData[2]);
          setFieldValue(`${field}ContentType`, imageData[1]);
        }
      };
      reader.readAsDataURL(uploadedFile.files[0]);
    };

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
                  // eslint-disable-next-line react/jsx-wrap-multilines
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
              <InputLabel htmlFor="conference-region">{t('entities.conference.region')}</InputLabel>
              <Select
                native
                id="conference-region"
                error={errors.region && touched.region}
                className={classes.textField}
                value={values.region}
                name="region"
                onChange={handleChange}
              >
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <option value="" />
                <option value="NA">NA</option>
                <option value="SA">SA</option>
                <option value="ASIA">ASIA</option>
                <option value="EUROPE">EUROPE</option>
                <option value="OCEANIA">OCEANIA</option>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>{t('entities.conference.logo')}</InputLabel>
              <div>
                <input
                  style={{ display: 'none' }}
                  id="logo-upload-file-button"
                  accept="image/*"
                  type="file"
                  onChange={handleFiles('logo')}
                />
                <label htmlFor="logo-upload-file-button">
                  <Button className={classes.button} component="span">
                    {t('common.selectImageFile')}
                  </Button>
                </label>
              </div>
              {values.logo && (
                <div>
                  <img src={`data:${values.logoContentType};base64, ${values.logo}`} alt="" />
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>{t('entities.conference.content')}</InputLabel>
              {values.content && (
                <a
                  className={classes.downloadAnchor}
                  download={`content-${getFormattedTime()}`}
                  href={`data:${values.contentContentType};base64, ${values.content}`}
                >
                  <Button className={classes.button}>{t('common.download')}</Button>
                </a>
              )}
              <input
                style={{ display: 'none' }}
                id="content-upload-file-button"
                type="file"
                onChange={handleFiles('content')}
              />
              <label htmlFor="content-upload-file-button">
                <Button className={classes.button} component="span">
                  {t('common.selectFile')}
                </Button>
              </label>
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
            {onDelete && (
              <ConfirmationDialogTrigger
                onCloseDialog={this.handleConfirmationDialogAction}
                dialog={{
                  title: t('entities.conference.deleteDialog.title'),
                  description: t('entities.conference.deleteDialog.description'),
                  confirmLabel: t('common.yes'),
                  discardLabel: t('common.no'),
                }}
                Renderer={({ onClick }) => (
                  <Button onClick={onClick} disabled={isSubmitting}>
                    {t('common.delete')}
                  </Button>
                )}
              />
            )}

            <Button onClick={onCancelEditing} disabled={isSubmitting} data-testid="cancel-btn">
              {t('common.cancel')}
            </Button>

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
    button: PropTypes.string,
    downloadAnchor: PropTypes.string,
  }),
  values: formValues,
  touched: formTouched,
  errors: formErrors,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancelEditing: PropTypes.func.isRequired,
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
  logo: '',
  content: '',
  signature: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  summary: Yup.string(),
  start: Yup.date()
    .nullable()
    .required(),
  end: Yup.date().nullable(),
  conferencePrice: Yup.number(),
  conferenceId: Yup.number().required(),
  registration: Yup.date()
    .nullable()
    .required(),
  attendeeCount: Yup.number().required(),
  venueName: Yup.string().required(),
  venueLat: Yup.number().required(),
  venueLong: Yup.number().required(),
  venueId: Yup.number().required(),
  saleStartDate: Yup.date()
    .nullable()
    .required(),
  earlyBirdActive: Yup.boolean().required(),
  region: Yup.string().required(),
  logo: Yup.string().required(),
  content: Yup.string().required(),
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
