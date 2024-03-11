import PropTypes from 'prop-types';

import { NextLink } from '@/elements';

const NavTreeHeader = ({ children, href, className, onClick, isSubMenu }) => {
  return isSubMenu ? (
    <li
      onClick={onClick}
      aria-hidden="true"
      className={`cursor-pointer rounded-md transition-all text-sm font-semibold flex flex-col justify-between items-center capitalize ${className}`}
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
