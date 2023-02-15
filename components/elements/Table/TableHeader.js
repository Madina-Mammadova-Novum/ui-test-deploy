import PropTypes from 'prop-types';

import TableHeaderCell from '@/elements/Table/TableHeaderCell';

const TableHeader = ({ headerData }) => {
  return (
    <tr>
      {headerData.map(({ text }) => (
        <TableHeaderCell text={text} />
      ))}
    </tr>
  );
};

TableHeader.propTypes = {
  headerData: PropTypes.shape([]).isRequired,
};

export default TableHeader;
