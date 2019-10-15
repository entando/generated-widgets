import React from 'react';
import PropTypes from 'prop-types';
import conferenceType from 'components/__types__/conferenceType';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
  },
});

const ConferenceTable = props => {
  const { items, onSelect } = props;
  const { t, i18n } = useTranslation();
  const classes = useStyles(props);

  const tableRows = items.map(item => (
    <TableRow hover className={classes.root} key={item.id} onClick={() => onSelect(item)}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.summary}</TableCell>
      <TableCell>{item.start ? new Date(item.start).toLocaleString(i18n.language) : ''}</TableCell>
      <TableCell>{item.end ? new Date(item.end).toLocaleString(i18n.language) : ''}</TableCell>
    </TableRow>
  ));

  return items.length ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{t('conference.tableHeader.name')}</TableCell>
          <TableCell>{t('conference.tableHeader.summary')}</TableCell>
          <TableCell>{t('conference.tableHeader.start')}</TableCell>
          <TableCell>{t('conference.tableHeader.end')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{tableRows}</TableBody>
    </Table>
  ) : (
    t('conference.noItems')
  );
};

ConferenceTable.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  items: PropTypes.arrayOf(conferenceType).isRequired,
  onSelect: PropTypes.func,
};

ConferenceTable.defaultProps = {
  classes: {
    root: '',
  },
  onSelect: () => {},
};

export default ConferenceTable;
