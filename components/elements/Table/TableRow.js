import PropTypes from 'prop-types';

import TableCell from '@/elements/Table/TableCell';

/* Draft Version */

const TableRow = ({ rowData, handleActionClick }) => {
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
          handleActionClick={handleActionClick}
        />
      ))}
    </tr>
  );
};

TableRow.defaultProps = {
  rowData: [],
  handleActionClick: () => {},
};

TableRow.propTypes = {
  rowData: PropTypes.shape([]),
  handleActionClick: PropTypes.func,
};

export default TableRow;
