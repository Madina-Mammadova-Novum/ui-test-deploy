'use client';

import { TableRowPropTypes } from '@/lib/types';

import TableCell from '@/elements/Table/TableCell';

const TableRow = ({ rowData = [], fleetId, urlAction, type }) => {
  const printTableCell = (props, index) => {
    const newId = index;
    return <TableCell key={newId} cellProps={{ ...props, urlAction, fleetId, type }} />;
  };

  return <tr>{rowData.map(printTableCell)}</tr>;
};

TableRow.propTypes = TableRowPropTypes;

export default TableRow;
