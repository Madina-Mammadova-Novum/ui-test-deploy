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
    <th scope="col" name={type} className="py-1.5 relative whitespace-nowrap" style={{ width }}>
      <p className="flex items-center px-4 gap-x-1.5">
        <span>{text}</span>
        {isSortable && (
          <span className="flex">
            <ArrowSVG
              viewBox="0 0 16 24"
              className={`fill-black w-4 h-4 cursor-pointer ${
                sortDirection === 'desc' && sortBy === text && 'fill-blue'
              }`}
              onClick={() => handleSort({ sortBy: text, sortDirection: 'desc', sortType })}
            />
            <ArrowSVG
              viewBox="0 0 16 24"
              className={`fill-black w-4 h-4 -rotate-180 cursor-pointer ${
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
