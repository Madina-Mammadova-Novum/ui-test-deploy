import PropTypes from 'prop-types';

import TableCell from '@/elements/Table/TableCell';
import { noSSR } from '@/utils/helpers';

const TableRow = ({ rowData }) => {
  return (
    <tr>
      {rowData.map(({ countryFlag, text, action, toggle, badge }) => (
        <TableCell countryFlag={countryFlag} text={text} action={action} toggle={toggle} badge={badge} />
      ))}
    </tr>
  );
};

TableRow.propTypes = {
  rowData: PropTypes.shape([]).isRequired,
};

export default noSSR(TableRow);
