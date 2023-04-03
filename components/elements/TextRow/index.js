import PropTypes from 'prop-types';

const TextRow = ({ title, children }) => {
  return (
    <div className="text-xsm text-black flex">
      <p className="font-normal">{title}:</p>
      <span className="font-bold ml-1 flex items-center">{children}</span>
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
