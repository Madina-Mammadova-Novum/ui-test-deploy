import classnames from 'classnames';

import { TextWithLabelPropTypes } from '@/lib/types';

import { Label, Placeholder } from '@/elements';

const TextWithLabel = ({ text, label, customStyles = '', textStyles, coverImage = null }) => {
  return (
    <div
      className={classnames(
        'font-semibold text-left min-w-[90px] flex items-center lg:items-start lg:flex-col',
        customStyles
      )}
    >
      <Label className="text-xs-sm whitespace-nowrap min-w-[100px] md:w-auto">{label}</Label>
      <p className="text-xsm text-ellipsis overflow-hidden whitespace-nowrap ml-1.5 lg:ml-0">
        {coverImage && coverImage}
        {text ? <span className={classnames(textStyles, coverImage && 'ml-0.5')}>{text}</span> : <Placeholder />}
      </p>
    </div>
  );
};

TextWithLabel.propTypes = TextWithLabelPropTypes;

export default TextWithLabel;
