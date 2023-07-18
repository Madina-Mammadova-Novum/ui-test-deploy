import { TableRowPropTypes } from '@/lib/types';

import TableCell from '@/elements/Table/TableCell';

const TableRow = ({ rowData = [], fleetId }) => {
  const printTableCell = (props) => <TableCell cellProps={{ ...props, fleetId }} />;

  return <tr>{rowData.map(printTableCell)}</tr>;
};

TableRow.propTypes = TableRowPropTypes;

export default TableRow;
