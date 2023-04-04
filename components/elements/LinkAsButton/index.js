import classnames from 'classnames';
import PropTypes from 'prop-types';

import { buttonSizesPropTypes, buttonVariantsPropTypes, linkTargetPropTypes } from '@/lib/types';

import { NextLink } from '@/elements';
import { getButtonClassNames } from '@/utils/helpers';

const LinkAsButton = ({ buttonProps: { variant, size }, children, href, customStyles, disabled, target, ...rest }) => {
  const buttonClassNames = getButtonClassNames(variant, size);
  return (
    <NextLink
      href={href}
      className={classnames(
        'text-xsm h-10 px-5 py-2.5 rounded-md flex items-center justify-center whitespace-nowrap',
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

LinkAsButton.defaultProps = {
  target: null,
  disabled: false,
};

LinkAsButton.propTypes = {
  buttonProps: PropTypes.shape({
    variant: buttonVariantsPropTypes.isRequired,
    size: buttonSizesPropTypes.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  target: linkTargetPropTypes,
};

export default LinkAsButton;
