'use client';

import PropTypes from 'prop-types';

import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';

const Table = ({ headerData, rows }) => {
  const printTableRow = (rowData, index) => <TableRow rowData={rowData} indexCell={index + 1} />;

  return headerData.length > 0 ? (
    <div className="w-full border border-purple-light rounded-base relative overflow-hidden">
      <table className="min-w-full border-collapse table-fixed">
        {headerData.length && (
          <thead className="bg-purple-light uppercase text-black font-semibold text-xs-sm">
            <TableHeader headerData={headerData} />
          </thead>
        )}
        {rows.length && <tbody className="border-purple-light">{rows.map(printTableRow)}</tbody>}
      </table>
    </div>
  ) : (
    <p className="text-sm font-semibold text-black uppercase">No data provided</p>
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
