import PropTypes from 'prop-types';

import NextImage from '../NextImage';

const TextRow = ({ title, subtitle, icon }) => {
  return (
    <div className="text-xsm text-black flex">
      <p className="font-normal">{title}:</p>
      <span className="font-bold ml-1 flex items-center">
        {icon && <NextImage src={icon} alt={`${icon} flag`} className="mr-1 h-4" />}
        {subtitle}
      </span>
    </div>
  );
};

TextRow.defaultProps = {
  title: '',
  subtitle: '',
  icon: null,
};

TextRow.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
};

export default TextRow;
