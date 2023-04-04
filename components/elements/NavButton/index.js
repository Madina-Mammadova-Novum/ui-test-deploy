import classnames from 'classnames';
import PropTypes from 'prop-types';

import { linkTargetPropTypes } from '@/lib/types';

import { NextLink } from '@/elements';

const NavButton = ({ isActive, children, href, customStyles, disabled, target, ...rest }) => {
  return (
    <NextLink
      href={href}
      className={classnames(
        'text-xsm whitespace-nowrap font-semibold',
        isActive ? 'text-blue' : 'text-white',
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

NavButton.defaultProps = {
  target: null,
  disabled: false,
};

NavButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  target: linkTargetPropTypes,
};

export default NavButton;
