import PropTypes from 'prop-types';

import { tableRowsAdapter } from '@/adapters';
import TableCell from '@/elements/Table/TableCell';

const TableRow = ({ rowData: data, indexCell: index }) => {
  const result = tableRowsAdapter({ data, index });

  const printTableCell = (props) => <TableCell cellProps={props} />;

  return <tr>{result.map(printTableCell)}</tr>;
};

TableRow.defaultProps = {
  rowData: [],
  indexCell: null,
};

TableRow.propTypes = {
  rowData: PropTypes.shape([]),
  indexCell: PropTypes.number,
};

export default TableRow;
