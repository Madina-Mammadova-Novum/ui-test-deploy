import PropTypes from 'prop-types';

import { NextImage } from '@/elements';

const InformationRow = ({ iconProps, keyTextProps, labelProps }) => {
  const { src, alt } = iconProps;
  const { keyText, keyTextStyles } = keyTextProps;
  const { label, labelStyles } = labelProps;

  return (
    <div className="flex">
      <span className={`whitespace-nowrap ${keyTextStyles}`}>{keyText}</span>
      <span className={`font-semibold ml-1 flex items-center ${labelStyles}`}>
        {src && <NextImage src={src} alt={alt} customStyles="mr-1.5 h-[15px]" />} {label}
      </span>
    </div>
  );
};

InformationRow.defaultProps = {
  iconProps: {
    src: '',
    alt: '',
  },
  keyTextProps: {
    keyText: '',
    keyTextStyles: '',
  },
  labelProps: {
    label: '',
    labelStyles: '',
  },
};

InformationRow.propTypes = {
  iconProps: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  keyTextProps: PropTypes.shape({
    keyText: PropTypes.string,
    keyTextStyles: PropTypes.string,
  }),
  labelProps: PropTypes.shape({
    label: PropTypes.string,
    labelStyles: PropTypes.string,
  }),
};

export default InformationRow;
