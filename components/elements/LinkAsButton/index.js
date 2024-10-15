import classNames from 'classnames';

import { LinkAsButtonPropTypes } from '@/lib/types';

import { NextLink } from '@/elements';
import { getButtonClassNames } from '@/utils/helpers';

const LinkAsButton = ({
  buttonProps: { variant, size },
  children,
  href,
  customStyles,
  disabled = false,
  target = null,
  ...rest
}) => {
  const buttonClassNames = getButtonClassNames(variant, size);
  return (
    <NextLink
      href={href}
      className={classNames(
        'flex items-center justify-center whitespace-nowrap text-xsm',
        buttonClassNames,
        disabled && 'pointer-events-none opacity-50',
        customStyles
      )}
      target={target}
      {...rest}
    >
      {children}
    </NextLink>
  );
};

LinkAsButton.propTypes = LinkAsButtonPropTypes;

export default LinkAsButton;
