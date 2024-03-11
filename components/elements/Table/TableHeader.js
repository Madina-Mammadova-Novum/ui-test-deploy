import { TableHeaderPropTypes } from '@/lib/types';

import TableHeaderCell from '@/elements/Table/TableHeaderCell';

const TableHeader = ({ headerData, handleSort, sortDirection, sortBy }) => {
  const printHeaderCell = (item, index) => (
    <TableHeaderCell
      key={index}
      text={item?.text}
      type={item?.type}
      helperData={item?.helperData}
      icon={item?.icon}
      handleSort={(options) => handleSort({ index, ...options })}
      sortDirection={sortDirection}
      sortBy={sortBy}
      {...item}
    />
  );

  return <tr>{headerData?.map(printHeaderCell)}</tr>;
};

TableHeader.propTypes = TableHeaderPropTypes;

export default TableHeader;
