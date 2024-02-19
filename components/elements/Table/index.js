'use client';

import { Fragment, useLayoutEffect, useState } from 'react';

import { TablePropTypes } from '@/lib/types';

import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';
import { getCookieFromBrowser, getRoleIdentity, sortTable } from '@/utils/helpers';

const Table = ({ headerData, fleetId, type, rows, noDataMessage = '' }) => {
  const role = getCookieFromBrowser('session-user-role');
  const { isOwner } = getRoleIdentity({ role });

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
          <span className="absolute z-50 left-0 sm:left-1/4 lg:left-1/3 bg-white px-4 mt-2.5 py-1 whitespace-nowrap rounded-lg border border-blue text-xs-sm">
            {isOwner
              ? 'The charterer has gone into pre-fixture with another tanker'
              : 'The tanker has moved into pre-fixture with another charterer'}
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
            <table className="min-w-full border-collapse table-fixed bg-purple-light">
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
      )}
    </div>
  );
};

Table.propTypes = TablePropTypes;

export default Table;
