'use client';

import classNames from 'classnames';

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
  textGroupStyle = '',
  coverImage = null,
  countryCode,
}) => {
  return (
    <div
      className={classNames(
        'flex min-w-[90px] items-center gap-y-1 text-left font-semibold lg:flex-col lg:items-start',
        customStyles
      )}
    >
      {(label || helperData || icon) && (
        <Label className="flex min-w-[100px] items-center gap-x-0.5 whitespace-nowrap text-xs-sm md:w-auto">
          {label}
          {helperData && (
            <ManualTooltip className={helperData.className} data={helperData}>
              {icon}
            </ManualTooltip>
          )}
        </Label>
      )}
      <div
        className={classNames(
          'mx-2 ml-1.5 flex h-5 items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap text-xsm lg:ml-0',
          textGroupStyle
        )}
      >
        {coverImage && coverImage}
        {countryCode && <Flag countryCode={countryCode} />}
        {text ? <p className={classNames(textStyles, coverImage && 'ml-0.5')}>{text}</p> : <Placeholder />}
      </div>
    </div>
  );
};

TextWithLabel.propTypes = TextWithLabelPropTypes;

export default TextWithLabel;
