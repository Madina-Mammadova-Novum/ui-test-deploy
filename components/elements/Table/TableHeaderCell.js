import PropTypes from 'prop-types';

const TableHeaderCell = ({ text, className }) => {
  return <th className={className}>{text}</th>;
};

TableHeaderCell.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TableHeaderCell;
