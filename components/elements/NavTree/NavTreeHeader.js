import PropTypes from 'prop-types';

import { NextLink } from '@/elements';

const NavTreeHeader = ({ children, href, className, onClick, isSubMenu }) => {
  return isSubMenu ? (
    <li
      onClick={onClick}
      aria-hidden="true"
      className={`flex cursor-pointer flex-col items-center justify-between rounded-md text-sm font-semibold capitalize transition-all ${className}`}
    >
      {children}
    </li>
  ) : (
    <li>
      <NextLink href={href}>{children}</NextLink>
    </li>
  );
};

NavTreeHeader.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  isSubMenu: PropTypes.bool,
};

export default NavTreeHeader;
