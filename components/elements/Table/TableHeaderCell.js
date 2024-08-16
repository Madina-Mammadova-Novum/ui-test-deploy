import { TableHeaderCellPropTypes } from '@/lib/types';

import ArrowSVG from '@/assets/images/arrow.svg';
import { ManualTooltip } from '@/elements';

const TableHeaderCell = ({
  text,
  type,
  helperData,
  icon,
  isSortable,
  handleSort,
  sortDirection,
  sortBy,
  sortType,
  ...rest
}) => {
  const { width } = rest;
  return (
    <th scope="col" name={type} className="relative whitespace-nowrap py-1.5" style={{ width }}>
      <p className="flex items-center gap-x-1.5 px-4">
        <span>{text}</span>
        {isSortable && (
          <span className="flex">
            <ArrowSVG
              viewBox="0 0 16 24"
              className={`h-4 w-4 cursor-pointer fill-black ${
                sortDirection === 'desc' && sortBy === text && 'fill-blue'
              }`}
              onClick={() => handleSort({ sortBy: text, sortDirection: 'desc', sortType })}
            />
            <ArrowSVG
              viewBox="0 0 16 24"
              className={`h-4 w-4 -rotate-180 cursor-pointer fill-black ${
                sortDirection === 'asc' && sortBy === text && 'fill-blue'
              }`}
              onClick={() => handleSort({ sortBy: text, sortDirection: 'asc', sortType })}
            />
          </span>
        )}

        {helperData && (
          <ManualTooltip className={helperData.className} data={helperData}>
            {icon}
          </ManualTooltip>
        )}
      </p>
    </th>
  );
};

TableHeaderCell.propTypes = TableHeaderCellPropTypes;

export default TableHeaderCell;
