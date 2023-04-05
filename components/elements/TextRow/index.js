import PropTypes from 'prop-types';

const TextRow = ({ title, children }) => {
  return (
    <div className="text-xsm text-black">
      <span className="font-normal whitespace-nowrap">{title}:</span>
      <span className="font-bold ml-1">{children}</span>
    </div>
  );
};

TextRow.defaultProps = {
  title: '',
};

TextRow.propTypes = {
  title: PropTypes.string,
};

export default TextRow;
