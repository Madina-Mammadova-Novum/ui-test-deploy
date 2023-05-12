'use client';

import { TablePropTypes } from '@/lib/types';

import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';

const Table = ({ headerData, rows }) => {
  const printTableRow = (rowData) => <TableRow rowData={rowData} />;

  return headerData.length > 0 ? (
    <div className="table-scroll-wrapper">
      <div className="w-full relative border bg-purple-light rounded-t-lg">
        <table className="min-w-full border-collapse table-fixed">
          {headerData.length && (
            <thead className="uppercase text-black font-semibold text-xs-sm">
              <TableHeader headerData={headerData} />
            </thead>
          )}
          {rows.length && <tbody>{rows.map(printTableRow)}</tbody>}
        </table>
      </div>
    </div>
  ) : (
    <p className="text-sm font-semibold text-black uppercase">No data provided</p>
  );
};

Table.propTypes = TablePropTypes;

export default Table;
