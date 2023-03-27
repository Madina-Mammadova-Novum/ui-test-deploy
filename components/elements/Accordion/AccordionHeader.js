import PropTypes from 'prop-types';

import { NextLink } from '@/elements';

const AccordionHeader = ({ children, href, className, onClick, isSubMenu }) => {
  return isSubMenu ? (
    <div
      onClick={onClick}
      aria-hidden="true"
      className={`cursor-pointer rounded-md transition-all text-sm font-semibold flex justify-between items-center capitalize ${className}`}
    >
      {children}
    </div>
  ) : (
    <NextLink href={href}>{children} </NextLink>
  );
};

AccordionHeader.defaultProps = {
  className: '',
  href: '/',
  children: null,
  isSubMenu: false,
  active: false,
  toggle: false,
  onClick: () => {},
};

AccordionHeader.propTypes = {
  children: PropTypes.node,
  toggle: PropTypes.bool,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  isSubMenu: PropTypes.bool,
  active: PropTypes.bool,
};

export default AccordionHeader;
