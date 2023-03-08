import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextWithLabel = ({ image, text, label, customStyles }) => {
  return (
    <div className={classnames('font-semibold text-left min-w-[90px]', customStyles)}>
      <h6 className="text-[12px] text-gray uppercase">{label}</h6>
      <p className="text-xsm">
        {image}
        <span className={image && 'ml-1.5'}>{text}</span>
      </p>
    </div>
  );
};

TextWithLabel.defaultProps = {
  customStyles: '',
  image: null,
};

TextWithLabel.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  image: PropTypes.node,
};

export default TextWithLabel;
