import PropTypes from 'prop-types';

import { Tooltip } from '@/elements';

const TableHeaderCell = ({ text, type, helperData, icon }) => {
  return (
    <th scope="col" name={type} className="py-1.5 whitespace-nowrap">
      <p className="flex items-center px-4 gap-x-1.5">
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

TableHeaderCell.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node,
  helperData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default TableHeaderCell;
