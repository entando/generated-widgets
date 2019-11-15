import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import conferenceType from 'components/__types__/conference';

const styles = {
    root: {
        cursor: 'pointer',
    },
};

const ConferenceTable = ({ items, onSelect, classes, t, i18n }) => {
  const tableRows = items.map(item => (
    <TableRow
      hover
      className={classes.root}
      key={item.id}
      onClick={() => onSelect(item)}
    >
      <TableCell><span>{item.name}</span></TableCell>
      <TableCell><span>{item.summary}</span></TableCell>
      <TableCell><span>{item.start}</span></TableCell>
      <TableCell><span>{item.end}</span></TableCell>
      <TableCell><span>{item.conferencePrice}</span></TableCell>
      <TableCell><span>{item.conferenceId}</span></TableCell>
      <TableCell><span>{item.registration}</span></TableCell>
      <TableCell><span>{item.attendeeCount}</span></TableCell>
      <TableCell><span>{item.venueName}</span></TableCell>
      <TableCell><span>{item.venueLat}</span></TableCell>
      <TableCell><span>{item.venueLong}</span></TableCell>
      <TableCell><span>{item.venueId}</span></TableCell>
      <TableCell><span>{item.saleStartDate}</span></TableCell>
      <TableCell><span>{item.earlyBirdActive}</span></TableCell>
      <TableCell><span>{item.region}</span></TableCell>
      <TableCell><span>{item.logo}</span></TableCell>
      <TableCell><span>{item.content}</span></TableCell>
      <TableCell><span>{item.signature}</span></TableCell>
    </TableRow>
  ));

  return (items.length ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <span>{ t('entities.conference.name') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.summary') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.start') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.end') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.conferencePrice') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.conferenceId') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.registration') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.attendeeCount') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.venueName') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.venueLat') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.venueLong') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.venueId') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.saleStartDate') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.earlyBirdActive') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.region') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.logo') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.content') }</span>
          </TableCell>
          <TableCell>
            <span>{ t('entities.conference.signature') }</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          { tableRows }
      </TableBody>
    </Table>
  ) : (
    t('entities.conference.noItems')
  ));
};

ConferenceTable.propTypes = {
  items: PropTypes.arrayOf(conferenceType).isRequired,
  onSelect: PropTypes.func,
  classes: PropTypes.shape({
      root: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

ConferenceTable.defaultProps = {
  onSelect: () => {},
};

export default withStyles(styles)(withTranslation()(ConferenceTable));
