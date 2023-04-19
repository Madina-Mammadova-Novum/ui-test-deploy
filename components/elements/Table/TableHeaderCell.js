import { TableHeaderCellPropTypes } from '@/lib/types';

import { Tooltip } from '@/elements';

const TableHeaderCell = ({ text, helperData, icon, className }) => {
  return (
    <th className={className}>
      <p className="flex items-center gap-x-2">
        <span>{text}</span>
        {helperData && (
          <Tooltip variant="manual" data={helperData}>
            {icon}
          </Tooltip>
        )}
      </p>
    </th>
  );
};

TableHeaderCell.propTypes = TableHeaderCellPropTypes;

export default TableHeaderCell;
