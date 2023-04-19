import { TableRowPropTypes } from '@/lib/types';

import { tableRowsAdapter } from '@/adapters';
import TableCell from '@/elements/Table/TableCell';

const TableRow = ({ rowData: data = [], indexCell: index = null }) => {
  const result = tableRowsAdapter({ data, index });

  const printTableCell = (props) => <TableCell cellProps={props} />;

  return <tr>{result.map(printTableCell)}</tr>;
};

TableRow.propTypes = TableRowPropTypes;

export default TableRow;
