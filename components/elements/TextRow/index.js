import PropTypes from 'prop-types';

const TextRow = ({ title, subtitle }) => {
  return (
    <div className="text-xsm text-black">
      <p className="font-normal">{title}:</p> <span className="font-bold">{subtitle}</span>
    </div>
  );
};

TextRow.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default TextRow;
