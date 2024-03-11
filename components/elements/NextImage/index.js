import Image from 'next/image';
import PropTypes from 'prop-types';

const NextImage = ({ src, alt = '', width, height, customStyles = '', ...rest }) => {
  return src && <Image priority src={src} alt={alt} width={width} height={height} className={customStyles} {...rest} />;
};

NextImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  customStyles: PropTypes.string,
};

export default NextImage;
