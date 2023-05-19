'use client';

import { TablePropTypes } from '@/lib/types';

import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';

const Table = ({ headerData, rows, noDataMessage = '' }) => {
  const printTableRow = (rowData) => <TableRow rowData={rowData} />;

  return headerData.length > 0 ? (
    <div className="table-scroll-wrapper">
      <div className="w-full border border-purple-light rounded-base relative overflow-hidden">
        <table className="min-w-full border-collapse table-fixed">
          {headerData.length && (
            <thead className="bg-purple-light uppercase text-black font-semibold text-xs-sm">
              <TableHeader headerData={headerData} />
            </thead>
          )}
          {!!rows.length && <tbody className="border-purple-light">{rows.map(printTableRow)}</tbody>}
        </table>
        {!rows.length && noDataMessage && (
          <div className="py-5 bg-gray-light text-center text-xsm text-gray">{noDataMessage}</div>
        )}
      </div>
    </div>
  ) : (
    <p className="text-sm font-semibold text-black uppercase">No data provided</p>
  );
};

Table.propTypes = TablePropTypes;

export default Table;
