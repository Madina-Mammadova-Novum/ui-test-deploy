'use client';

import { useLayoutEffect, useState } from 'react';

import { TablePropTypes } from '@/lib/types';

import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';
import { sortTable } from '@/utils/helpers';

const Table = ({ headerData, fleetId, type, rows, noDataMessage = '' }) => {
  const [sortedData, setSortedData] = useState({ data: [], sortDirection: null, sortBy: null });
  const { data, sortDirection, sortBy } = sortedData;

  useLayoutEffect(() => {
    setSortedData((prevState) => ({ ...prevState, data: rows }));
    return () => setSortedData({ data: [], sortDirection: null, sortBy: null });
  }, [rows]);

  const handleSort = (options) => {
    const { index, sortDirection: newSortDirection, sortBy: newSortBy, sortType } = options;

    if (newSortBy === sortBy && newSortDirection === sortDirection) {
      setSortedData({ data: rows, sortDirection: null, sortBy: null });
      return;
    }

    const newSortedData = sortTable([...data], index, newSortDirection, sortType);
    setSortedData({ data: newSortedData, sortDirection: newSortDirection, sortBy: newSortBy });
  };

  const printTableRow = (rowData) => <TableRow key={rowData?.id} type={type} fleetId={fleetId} rowData={rowData} />;

  return headerData.length > 0 ? (
    <div className="table-scroll-wrapper z-20">
      <div className="w-full relative border bg-purple-light rounded-t-lg z-20">
        <table className="min-w-full border-collapse table-fixed z-20">
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
        {!data.length && noDataMessage && (
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
