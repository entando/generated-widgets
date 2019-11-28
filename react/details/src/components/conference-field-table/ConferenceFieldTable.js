import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import conferenceType from 'components/__types__/conference';

const ConferenceFieldTable = ({ t, i18n: { language }, conference }) => {
  const translationKeyPrefix = `entities.conference.`;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{t('common.name')}</TableCell>
          <TableCell>{t('common.value')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}id`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.id}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}name`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.name}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}summary`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.summary}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}start`)}</span>
          </TableCell>
          <TableCell>
            <span>
              {conference.start && new Date(conference.start).toLocaleDateString(language)}
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}end`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.end && new Date(conference.end).toLocaleDateString(language)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}conferencePrice`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.conferencePrice}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}conferenceId`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.conferenceId}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}registration`)}</span>
          </TableCell>
          <TableCell>
            <span>
              {conference.registration &&
                new Date(conference.registration).toLocaleString(language)}
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}attendeeCount`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.attendeeCount}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}venueName`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.venueName}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}venueLat`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.venueLat}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}venueLong`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.venueLong}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}venueId`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.venueId}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}saleStartDate`)}</span>
          </TableCell>
          <TableCell>
            <span>
              {conference.saleStartDate &&
                new Date(conference.saleStartDate).toLocaleString(language)}
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}earlyBirdActive`)}</span>
          </TableCell>
          <TableCell>
            <Checkbox disabled checked={conference.earlyBirdActive} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}region`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.region}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}logo`)}</span>
          </TableCell>
          <TableCell>
            <span>
              <img src={`data:${conference.logoContentType};base64, ${conference.logo}`} alt="" />
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}content`)}</span>
          </TableCell>
          <TableCell>
            <span>
              <a
                download="filename"
                href={`data:${conference.contentContentType};base64, ${conference.content}`}
              >
                {t('common.download')}
              </a>
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>{t(`${translationKeyPrefix}signature`)}</span>
          </TableCell>
          <TableCell>
            <span>{conference.signature}</span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

ConferenceFieldTable.propTypes = {
  conference: conferenceType,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }).isRequired,
};

ConferenceFieldTable.defaultProps = {
  conference: [],
};

export default withTranslation()(ConferenceFieldTable);
