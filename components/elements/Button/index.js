import classnames from 'classnames';

import { ButtonPropTypes } from '@/lib/types';

import { IconWrapper } from '@/units';
import { getButtonClassNames } from '@/utils/helpers';

const Button = ({
  buttonProps: { icon = {}, iconContainerStyles, helperText, text, variant, size },
  customStyles,
  customStylesFromWrap,
  disabled = false,
  type = 'button',
  onClick,
  ...rest
}) => {
  const { before, after } = icon;
  const buttonClassNames = getButtonClassNames(variant, size);
  return (
    <div className={`flex flex-col justify-center items-center ${customStylesFromWrap}`}>
      <button
        className={classnames(
          'text-xsm px-3.5 py-2.5 rounded-md flex items-center justify-center group',
          buttonClassNames,
          disabled && 'opacity-50 pointer-events-none',
          customStyles
        )}
        onClick={onClick}
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={disabled}
        {...rest}
      >
        {before && <IconWrapper iconData={{ className: iconContainerStyles, icon: before }} />}
        {text && <span className="px-1.5 text-inherit">{text}</span>}
        {after && <IconWrapper iconData={{ className: iconContainerStyles, icon: after }} />}
      </button>
      {helperText && <span className="text-gray text-xs-sm font-normal">{helperText}</span>}
    </div>
  );
};

Button.propTypes = ButtonPropTypes;

export default Button;
