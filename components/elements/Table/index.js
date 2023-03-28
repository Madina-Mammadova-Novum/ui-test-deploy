'use client';

import PropTypes from 'prop-types';

import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';

const Table = ({ headerData, rows }) => {
  return (
    <div className="overflow-auto">
      <div
        className="border border-gray-darker rounded-base overflow-hidden font-semibold"
        style={{ marginTop: '12px', marginBottom: '21px' }}
      >
        <table className="my_position-table w-full border-collapse">
          {headerData.length && <TableHeader headerData={headerData} />}
          {rows.length && rows.map((rowData) => <TableRow rowData={rowData} />)}
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
