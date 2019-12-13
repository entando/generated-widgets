import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

import conferenceType from 'components/__types__/conference';

const styles = {
  icon: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  tableRoot: {
    marginTop: '10px',
  },
  rowRoot: {
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  noItems: {
    margin: '15px',
  },
};

const ConferenceTable = ({ items, onSelect, onDelete, readonly, classes, t, i18n }) => {
  const tableRows = items.map(item => (
    <TableRow hover className={classes.rowRoot} key={item.id} onClick={() => onSelect(item)}>
      <TableCell>
        <span>{item.name}</span>
      </TableCell>
      <TableCell>
        <span>{item.summary}</span>
      </TableCell>
      <TableCell>
        <span>{new Date(item.start).toLocaleDateString(i18n.language)}</span>
      </TableCell>
      <TableCell>
        <span>{new Date(item.end).toLocaleDateString(i18n.language)}</span>
      </TableCell>
      <TableCell>
        <span>{item.conferencePrice}</span>
      </TableCell>
      <TableCell>
        <span>{item.conferenceId}</span>
      </TableCell>
      <TableCell>
        <span>{new Date(item.registration).toLocaleString(i18n.language)}</span>
      </TableCell>
      <TableCell>
        <span>{item.attendeeCount}</span>
      </TableCell>
      <TableCell>
        <span>{item.venueName}</span>
      </TableCell>
      <TableCell>
        <span>{item.venueLat}</span>
      </TableCell>
      <TableCell>
        <span>{item.venueLong}</span>
      </TableCell>
      <TableCell>
        <span>{item.venueId}</span>
      </TableCell>
      <TableCell>
        <span>{new Date(item.saleStartDate).toLocaleString(i18n.language)}</span>
      </TableCell>
      <TableCell align="center">
        <Checkbox disabled checked={item.earlyBirdActive} />
      </TableCell>
      <TableCell>
        <span>{item.region}</span>
      </TableCell>
      <TableCell>
        <span>
          <img src={`data:${item.logoContentType};base64, ${item.logo}`} alt="" />
        </span>
      </TableCell>
      <TableCell>
        <span>
          <a download="conference" href={`data:${item.contentContentType};base64, ${item.content}`}>
            {t('common.download')}
          </a>
        </span>
      </TableCell>
      <TableCell>
        <span>{item.signature}</span>
      </TableCell>
      {!readonly && (
        <TableCell>
          <IconButton
            aria-label="Remove filter"
            className={classes.icon}
            onClick={() => onDelete(item)}
          >
            <DeleteForever />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  ));

  return items.length ? (
    <Table className={classes.tableRoot} stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>
            <span>{t('entities.conference.name')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.summary')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.start')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.end')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.conferencePrice')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.conferenceId')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.registration')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.attendeeCount')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.venueName')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.venueLat')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.venueLong')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.venueId')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.saleStartDate')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.earlyBirdActive')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.region')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.logo')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.content')}</span>
          </TableCell>
          <TableCell>
            <span>{t('entities.conference.signature')}</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{tableRows}</TableBody>
    </Table>
  ) : (
    <div className={classes.noItems}>{t('entities.conference.noItems')}</div>
  );
};

ConferenceTable.propTypes = {
  items: PropTypes.arrayOf(conferenceType).isRequired,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  classes: PropTypes.shape({
    icon: PropTypes.string,
    rowRoot: PropTypes.string,
    tableRoot: PropTypes.string,
    noItems: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
  readonly: PropTypes.bool,
};

ConferenceTable.defaultProps = {
  onSelect: () => {},
  onDelete: () => {},
  readonly: false,
};

export default withStyles(styles)(withTranslation()(ConferenceTable));
