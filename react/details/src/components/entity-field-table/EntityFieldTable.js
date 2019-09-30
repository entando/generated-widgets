import React from 'react';
import i18next from 'i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import EntityField from 'components/entity-field-table/EntityField';

import { entityFieldsType } from 'components/_types/entity';

const EntityFieldTable = ({ entity }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{i18next.t('common.name')}</TableCell>
        <TableCell>{i18next.t('common.value')}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {entity.map(entityField => (
        <TableRow key={entityField.name}>
          <EntityField field={entityField} />
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

EntityFieldTable.propTypes = {
  entity: entityFieldsType,
};

EntityFieldTable.defaultProps = {
  entity: [],
};

export default EntityFieldTable;
