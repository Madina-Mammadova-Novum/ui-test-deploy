import classnames from 'classnames';

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
      className={classnames(
        'text-xsm flex items-center justify-center whitespace-nowrap',
        buttonClassNames,
        disabled && 'opacity-50 pointer-events-none',
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
