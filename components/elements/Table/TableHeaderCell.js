import PropTypes from 'prop-types';

const TableHeaderCell = ({ text }) => {
  return <th>{text}</th>;
};

TableHeaderCell.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TableHeaderCell;
