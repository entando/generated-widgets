import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import filterType from 'components/__types__/filter';
import { getFieldFilterTypes } from 'components/filters/utils';

const styles = () => ({
  formControl: {
    minWidth: 120,
    width: '90%',
  },
});

const Filter = ({ filter, t, update, filterId, classes }) => {
  const filterOperators = getFieldFilterTypes(filter.field);

  const handleChange = event => {
    update(filterId, { [event.target.name]: event.target.value });
  };

  return (
    <Grid container>
      <Grid item xs={5}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`${filterId}-field-label`}>Field</InputLabel>
          <Select
            native
            labelId={`${filterId}-field-label`}
            id={`${filterId}-field`}
            name="field"
            value={filter.field}
            onChange={handleChange}
          >
            <option value="" />
            <option value="name">{t('entities.conference.name')}</option>
            <option value="summary">{t('entities.conference.summary')}</option>
            <option value="start">{t('entities.conference.start')}</option>
            <option value="end">{t('entities.conference.end')}</option>
            <option value="conferencePrice">{t('entities.conference.conferencePrice')}</option>
            <option value="conferenceId">{t('entities.conference.conferenceId')}</option>
            <option value="registration">{t('entities.conference.registration')}</option>
            <option value="attendeeCount">{t('entities.conference.attendeeCount')}</option>
            <option value="venueName">{t('entities.conference.venueName')}</option>
            <option value="venueLat">{t('entities.conference.venueLat')}</option>
            <option value="venueLong">{t('entities.conference.venueLong')}</option>
            <option value="venueId">{t('entities.conference.venueId')}</option>
            <option value="saleStartDate">{t('entities.conference.saleStartDate')}</option>
            <option value="earlyBirdActive">{t('entities.conference.earlyBirdActive')}</option>
            <option value="region">{t('entities.conference.region')}</option>
            <option value="signature">{t('entities.conference.signature')}</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        {!!filter.field && (
          <FormControl className={classes.formControl}>
            <InputLabel id={`${filterId}-operator-label`}>Operator</InputLabel>
            <Select
              native
              labelId={`${filterId}-operator-label`}
              id={`${filterId}-operator`}
              name="operator"
              value={filter.operator}
              onChange={handleChange}
            >
              <option value="" />
              {filterOperators.map(operator => {
                if (typeof operator !== 'string') {
                  return (
                    <option key={operator.value} value={operator.value}>
                      {operator.title}
                    </option>
                  );
                }
                return (
                  <option key={operator} value={operator}>
                    {t(`filters.operators.${operator}`)}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={4}>
        {!!filter.operator && !['specified', 'unspecified'].includes(filter.operator) && (
          <FormControl className={classes.formControl}>
            <TextField
              disabled={!filter.field}
              id="standard-required"
              name="value"
              value={filter.value}
              onChange={handleChange}
              margin="normal"
            />
          </FormControl>
        )}
      </Grid>
    </Grid>
  );
};

Filter.propTypes = {
  classes: PropTypes.shape({
    formControl: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  filter: filterType.isRequired,
  filterId: PropTypes.number.isRequired,
};

export default withStyles(styles, { withTheme: true })(withTranslation()(Filter));
