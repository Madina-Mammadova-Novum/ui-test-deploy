import classnames from 'classnames';

import { TextWithLabelPropTypes } from '@/lib/types';

import { Label, NextImage } from '@/elements';

const TextWithLabel = ({ text, label, customStyles = '', coverImage = null }) => {
  return (
    <div
      className={classnames(
        'font-semibold text-left min-w-[90px] flex items-center lg:items-start lg:flex-col',
        customStyles
      )}
    >
      <Label className="text-xs-sm whitespace-nowrap min-w-[100px] md:w-auto">{label}</Label>
      <p className="text-xsm text-ellipsis overflow-hidden whitespace-nowrap ml-1.5 lg:ml-0">
        {coverImage && <NextImage {...coverImage} customStyles="inline" />}
        <span className={coverImage && 'ml-1.5'}>{text}</span>
      </p>
    </div>
  );
};

TextWithLabel.propTypes = TextWithLabelPropTypes;

export default TextWithLabel;
