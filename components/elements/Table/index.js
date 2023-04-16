'use client';

import PropTypes from 'prop-types';

import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';

const Table = ({ headerData, rows }) => {
  return (
    <div className="w-full border border-purple-light rounded-base relative overflow-hidden">
      <table className="min-w-full border-collapse table-fixed">
        <thead className="bg-purple-light uppercase text-black font-semibold text-xs-sm">
          {headerData.length && <TableHeader headerData={headerData} />}
        </thead>
        <tbody className="border-purple-light">
          {rows.length && rows.map((rowData, index) => <TableRow rowData={rowData} indexCell={index + 1} />)}
        </tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  headerData: [],
  rows: [],
  handleActionClick: () => {},
};

Table.propTypes = {
  headerData: PropTypes.shape([]),
  rows: PropTypes.shape([]),
  handleActionClick: PropTypes.func,
};

export default Table;
