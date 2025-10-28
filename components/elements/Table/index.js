'use client';

import { Fragment, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TablePropTypes } from '@/lib/types';

import HoverTooltip from '@/elements/HoverTooltip';
import TableHeader from '@/elements/Table/TableHeader';
import TableRow from '@/elements/Table/TableRow';
import TextWithLabel from '@/elements/TextWithLabel';
import { getUserDataSelector } from '@/store/selectors';
import { getRoleIdentity, processTooltipData, sortTable } from '@/utils/helpers';

const Table = ({ headerData, fleetId, type, rows, noDataMessage = '' }) => {
  const [sortedData, setSortedData] = useState({ data: [], sortDirection: null, sortBy: null });
  const { role } = useSelector(getUserDataSelector);

  const { data, sortDirection, sortBy } = sortedData;
  const { isOwner, isCharterer } = getRoleIdentity({ role });

  useLayoutEffect(() => {
    // Add original position to each row for reference
    const rowsWithPosition = rows.map((row, idx) => ({
      originalPosition: idx,
      data: row,
    }));
    setSortedData((prevState) => ({ ...prevState, data: rowsWithPosition }));
    return () => setSortedData({ data: [], sortDirection: null, sortBy: null });
  }, [rows]);

  const handleSort = (options) => {
    const { index, sortDirection: newSortDirection, sortBy: newSortBy, sortType } = options;

    if (newSortBy === sortBy && newSortDirection === sortDirection) {
      // Reset sorting to original order
      const rowsWithPosition = rows.map((row, idx) => ({
        originalPosition: idx,
        data: row,
      }));
      setSortedData({ data: rowsWithPosition, sortDirection: null, sortBy: null });
      return;
    }

    // Skip sorting for the first column (index=0) to maintain original order
    if (index === 0) {
      return;
    }

    // Clone the data for sorting
    const dataToSort = [...data];

    // Apply sorting only to the data part, not the position metadata
    const newSortedData = sortTable(dataToSort, index, newSortDirection, sortType);

    setSortedData({ data: newSortedData, sortDirection: newSortDirection, sortBy: newSortBy });
  };

  const printTableRow = (rowInfo) => {
    const rowData = rowInfo.data;
    const isFreezed = rowData?.some((cell) => cell?.freezed);

    let freezedText = '';

    if (isOwner) {
      freezedText =
        'The deal is in a frozen state — either you have shifted to the prefixture stage with another charterer, or the charterer has done so with another vessel. To avoid double commitments, new negotiations are paused until the prefixture is resolved.';
    } else if (isCharterer) {
      freezedText =
        'The deal is in a frozen state — either you have shifted to the prefixture stage with another vessel, or the vessel owner has done so with another charterer. To avoid double commitments, new negotiations are paused until the prefixture is resolved.';
    } else {
      freezedText = 'Deal is frozen';
    }

    const { disableTooltip, tooltipText, trimmedText } = processTooltipData({
      text: freezedText,
      length: 240,
    });

    const newId = rowInfo.originalPosition;

    return (
      <Fragment key={newId}>
        {isFreezed && (
          <tr>
            <td className="!z-10" colSpan={headerData.length}>
              <div className="absolute left-0 z-50 mt-2.5 flex !w-full justify-center">
                <HoverTooltip
                  className="!-top-5 !left-6 !z-50 -mt-4 h-auto max-h-[74px] w-full max-w-[50.125rem] overflow-y-auto !p-1.5"
                  groupClassName="mx-28 my-auto max-w-[53.125rem]"
                  data={{ description: tooltipText }}
                  disabled={disableTooltip}
                >
                  <TextWithLabel
                    text={trimmedText}
                    customStyles="whitespace-nowrap rounded-lg border border-blue bg-white px-4 py-1 text-xs-sm"
                  />
                </HoverTooltip>
              </div>
            </td>
          </tr>
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
