import PropTypes from 'prop-types';

import TableCell from '@/elements/Table/TableCell';
import { noSSR } from '@/utils/helpers';

const TableRow = ({ rowData }) => {
  return (
    <tr>
      {rowData.map(({ countryFlag, text, actions, toggle, badge, status, timer, semibold, color }) => (
        <TableCell
          countryFlag={countryFlag}
          text={text}
          actions={actions}
          toggle={toggle}
          badge={badge}
          status={status}
          timer={timer}
          semibold={semibold}
          color={color}
        />
      ))}
    </tr>
  );
};

TableRow.propTypes = {
  rowData: PropTypes.shape([]).isRequired,
};

export default noSSR(TableRow);
