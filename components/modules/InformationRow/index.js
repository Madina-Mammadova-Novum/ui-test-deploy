import PropTypes from 'prop-types';

import { NextImage } from '@/elements';

const InformationRow = ({ iconProps, keyText, label }) => {
  const { src, alt } = iconProps;

  return (
    <div className="flex">
      <span className="whitespace-nowrap">{keyText}</span>
      <span className="font-semibold ml-1 flex items-center">
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
  keyText: '',
  label: '',
};

InformationRow.propTypes = {
  iconProps: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  keyText: PropTypes.string,
  label: PropTypes.string,
};

export default InformationRow;
