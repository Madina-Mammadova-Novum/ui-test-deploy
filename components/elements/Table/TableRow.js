import { TableRowPropTypes } from '@/lib/types';

import TableCell from '@/elements/Table/TableCell';

const TableRow = ({ rowData = [], fleetId, type }) => {
  const printTableCell = (props) => <TableCell cellProps={{ ...props, fleetId, type }} />;

  return <tr>{rowData.map(printTableCell)}</tr>;
};

TableRow.propTypes = TableRowPropTypes;

export default TableRow;
