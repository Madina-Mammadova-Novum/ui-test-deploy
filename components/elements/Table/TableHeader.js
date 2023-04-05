import PropTypes from 'prop-types';

import TableHeaderCell from '@/elements/Table/TableHeaderCell';

const TableHeader = ({ headerData, className }) => {
  const printHeaderCell = (item, index) => (
    <TableHeaderCell key={index} text={item?.text} helperData={item?.helperData} icon={item?.icon} />
  );

  return <tr className={className}>{headerData?.map(printHeaderCell)}</tr>;
};

TableHeader.propTypes = {
  headerData: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

export default TableHeader;
