'use client';

import { Fragment, useLayoutEffect, useState } from 'react';

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

  const printTableRow = (rowData = []) => {
    const isFreezed = rowData?.some((cell) => cell?.freezed);

    return (
      <Fragment key={rowData?.id}>
        {isFreezed && (
          <span className="absolute left-0 z-50 mt-2.5 whitespace-nowrap rounded-lg border border-blue bg-white px-4 py-1 text-xs-sm sm:left-1/4 lg:left-1/3">
            Deal is frozen
          </span>
        )}
        <TableRow type={type} fleetId={fleetId} rowData={rowData} />
      </Fragment>
    );
  };

  return (
    <div className="table-container">
      {headerData.length > 0 ? (
        <div className="table-scroll">
          <div className="table-scroll-wrapper">
            <table className="min-w-full table-fixed border-collapse bg-purple-light">
              {headerData.length && (
                <thead className="text-xs-sm font-semibold uppercase text-black">
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
              <div className="bg-gray-light py-5 text-center text-xsm text-gray">{noDataMessage}</div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm font-semibold uppercase text-black">No data provided</p>
      )}
    </div>
  );
};

Table.propTypes = TablePropTypes;

export default Table;
