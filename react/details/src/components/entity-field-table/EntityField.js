import React from 'react';
import TableCell from '@material-ui/core/TableCell';

import EntityFieldLabel from 'components/entity-field-table/EntityFieldLabel';
import EntityFieldValue from 'components/entity-field-table/EntityFieldValue';

import { fieldType } from 'components/types/entity';

const EntityField = ({ field }) => (
  <>
    <TableCell>
      <EntityFieldLabel label={field.label} />
    </TableCell>
    <TableCell>
      <EntityFieldValue value={field.value} />
    </TableCell>
  </>
);

EntityField.propTypes = {
  field: fieldType.isRequired,
};

export default EntityField;
