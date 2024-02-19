'use client';

import classnames from 'classnames';

import { TextWithLabelPropTypes } from '@/lib/types';

import { Label, ManualTooltip, Placeholder } from '@/elements';
import { Flag } from '@/units';

const TextWithLabel = ({
  text,
  label,
  helperData,
  icon,
  customStyles = '',
  textStyles,
  coverImage = null,
  countryCode,
}) => {
  return (
    <div
      className={classnames(
        'font-semibold text-left min-w-[90px] flex items-center lg:items-start lg:flex-col gap-y-1',
        customStyles
      )}
    >
      <Label className="text-xs-sm whitespace-nowrap min-w-[100px] md:w-auto flex items-center gap-x-0.5">
        {label}
        {helperData && (
          <ManualTooltip className={helperData.className} data={helperData}>
            {icon}
          </ManualTooltip>
        )}
      </Label>
      <div className="flex text-xsm text-ellipsis overflow-hidden whitespace-nowrap ml-1.5 lg:ml-0 gap-x-2 items-center h-3.5 mx-2">
        {coverImage && coverImage}
        {countryCode && <Flag countryCode={countryCode} />}
        {text ? <p className={classnames(textStyles, coverImage && 'ml-0.5')}>{text}</p> : <Placeholder />}
      </div>
    </div>
  );
};

TextWithLabel.propTypes = TextWithLabelPropTypes;

export default TextWithLabel;
