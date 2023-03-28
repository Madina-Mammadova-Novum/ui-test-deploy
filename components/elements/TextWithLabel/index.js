import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Label, NextImage } from '@/elements';

const TextWithLabel = ({ image, text, label, customStyles }) => {
  return (
    <div className={classnames('font-semibold text-left min-w-[90px]', customStyles)}>
      <Label className="text-xs-sm">{label}</Label>
      <p className="text-xsm">
        {image && <NextImage {...image} customStyles="inline" />}
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
