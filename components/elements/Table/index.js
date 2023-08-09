'use client';

import { useMemo, useState } from 'react';

import { TablePropTypes } from '@/lib/types';

import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';
import { sortTable } from '@/utils/helpers';

const Table = ({ headerData, fleetId, rows, noDataMessage = '' }) => {
  const initialOrder = useMemo(() => rows, []);
  const [sortedData, setSortedData] = useState({ data: rows, sortDirection: 'asc', sortBy: null });
  const { data, sortDirection, sortBy } = sortedData;

  const handleSort = (options) => {
    const { index, sortDirection: newSortDirection, sortBy: newSortBy, sortType } = options;
    if (newSortBy === sortBy && newSortDirection === sortDirection) {
      setSortedData({ data: initialOrder, sortDirection: null, sortBy: null });
      return;
    }
    const newSortedData = sortTable(rows, index, newSortDirection, sortType);
    setSortedData({ data: newSortedData, sortDirection: newSortDirection, sortBy: newSortBy });
  };

  const printTableRow = (rowData) => <TableRow key={rowData?.id} fleetId={fleetId} rowData={rowData} />;

  return headerData.length > 0 ? (
    <div className="table-scroll-wrapper ">
      <div className="w-full relative border bg-purple-light rounded-t-lg ">
        <table className="min-w-full border-collapse table-fixed ">
          {headerData.length && (
            <thead className="uppercase text-black font-semibold text-xs-sm">
              <TableHeader
                headerData={headerData}
                handleSort={handleSort}
                sortDirection={sortDirection}
                sortBy={sortBy}
              />
            </thead>
          )}
          {!!data.length && <tbody>{data.map(printTableRow)}</tbody>}
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
