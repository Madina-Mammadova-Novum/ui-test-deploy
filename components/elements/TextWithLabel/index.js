import ReactCountryFlag from 'react-country-flag';

import classnames from 'classnames';

import { TextWithLabelPropTypes } from '@/lib/types';

import { Label, ManualTooltip, Placeholder } from '@/elements';

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
        'font-semibold text-left min-w-[90px] flex items-center lg:items-start lg:flex-col',
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
      <p className="flex text-xsm text-ellipsis overflow-hidden whitespace-nowrap ml-1.5 lg:ml-0">
        {coverImage && coverImage}
        {countryCode && <ReactCountryFlag countryCode={countryCode} style={{ zoom: 1.3 }} className="mr-1" />}
        {text ? <span className={classnames(textStyles, coverImage && 'ml-0.5')}>{text}</span> : <Placeholder />}
      </p>
    </div>
  );
};

TextWithLabel.propTypes = TextWithLabelPropTypes;

export default TextWithLabel;
