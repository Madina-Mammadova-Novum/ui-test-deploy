import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Label, NextImage } from '@/elements';

const TextWithLabel = ({ coverImage, text, label, customStyles }) => {
  return (
    <div
      className={classnames(
        'font-semibold text-left min-w-[90px] flex items-center md:items-start md:flex-col',
        customStyles
      )}
    >
      <Label className="text-xs-sm whitespace-nowrap min-w-[100px] md:w-auto">{label}</Label>
      <p className="text-xsm text-ellipsis overflow-hidden whitespace-nowrap ml-1.5 md:ml-0">
        {coverImage && <NextImage {...coverImage} customStyles="inline" />}
        <span className={coverImage && 'ml-1.5'}>{text}</span>
      </p>
    </div>
  );
};

TextWithLabel.defaultProps = {
  customStyles: '',
  coverImage: null,
};

TextWithLabel.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  coverImage: PropTypes.node,
};

export default TextWithLabel;
