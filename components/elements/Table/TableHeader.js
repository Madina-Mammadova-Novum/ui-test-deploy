import { TableHeaderPropTypes } from '@/lib/types';

import TableHeaderCell from '@/elements/Table/TableHeaderCell';

const TableHeader = ({ headerData }) => {
  const printHeaderCell = (item, index) => (
    <TableHeaderCell
      key={index}
      text={item?.text}
      type={item?.type}
      helperData={item?.helperData}
      icon={item?.icon}
      {...item}
    />
  );

  return <tr>{headerData?.map(printHeaderCell)}</tr>;
};

TableHeader.propTypes = TableHeaderPropTypes;

export default TableHeader;
