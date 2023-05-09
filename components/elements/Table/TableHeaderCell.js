import { TableHeaderCellPropTypes } from '@/lib/types';

import { ManualTooltip } from '@/elements';

const TableHeaderCell = ({ text, type, helperData, icon, ...rest }) => {
  const { width } = rest;
  return (
    <th scope="col" name={type} className="py-1.5 relative whitespace-nowrap" style={{ width }}>
      <p className="flex items-center px-4 gap-x-1.5">
        <span>{text}</span>
        {helperData && (
          <ManualTooltip className="-left-[20vh] lg:-left-[14vh]" data={helperData}>
            {icon}
          </ManualTooltip>
        )}
      </p>
    </th>
  );
};

TableHeaderCell.propTypes = TableHeaderCellPropTypes;

export default TableHeaderCell;
