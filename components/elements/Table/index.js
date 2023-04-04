'use client';

import PropTypes from 'prop-types';

import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';

const Table = ({ headerData, rows }) => {
  return (
    <div className="overflow-auto">
      <div
        className="border !border-purple-light rounded-base overflow-hidden font-semibold"
        style={{ marginTop: '12px', marginBottom: '21px' }}
      >
        <table className="my_position-table w-full border-collapse">
          {headerData.length && <TableHeader className="!bg-purple-light text-black" headerData={headerData} />}
          {rows.length && rows.map((rowData, index) => <TableRow rowData={rowData} indexCell={index + 1} />)}
        </table>
      </div>
    </div>
  );
};

Table.defaultProps = {
  headerData: [],
  rows: [],
};

Table.propTypes = {
  headerData: PropTypes.shape([]),
  rows: PropTypes.shape([]),
};

export default Table;
