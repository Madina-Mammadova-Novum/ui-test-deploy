import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextWithLabel = ({ text, label, customStyles }) => {
  return (
    <div className={classnames('font-semibold text-left min-w-[90px]', customStyles)}>
      <h6 className="text-[12px] text-gray uppercase">{label}</h6>
      <p className="text-xsm">{text}</p>
    </div>
  );
};

TextWithLabel.defaultProps = {
  customStyles: '',
};

TextWithLabel.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
};

export default TextWithLabel;
