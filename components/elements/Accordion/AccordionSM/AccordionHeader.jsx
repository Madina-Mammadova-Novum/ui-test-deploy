import { useMemo } from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

const AccordionHeader = ({ children, href, className, onClick, isSubMenu }) => {
  const printLink = useMemo(() => {
    return <Link href={href}>{children}</Link>;
  }, [children, href]);

  const printCta = useMemo(() => {
    return (
      <div
        onClick={onClick}
        aria-hidden="true"
        className={`cursor-pointer rounded-md transition-all text-sm font-semibold flex justify-between items-center capitalize  ${className}`}
      >
        {children}
      </div>
    );
  }, [children, className, onClick]);

  const printHeader = useMemo(() => {
    switch (isSubMenu) {
      case true:
        return printCta;
      case false:
        return printLink;
      default:
        return printLink;
    }
  }, [isSubMenu, printCta, printLink]);

  return printHeader;
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
