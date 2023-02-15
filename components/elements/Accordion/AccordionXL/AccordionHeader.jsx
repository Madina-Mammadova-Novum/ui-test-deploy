import { useMemo } from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

import { ArrowIcon } from '@/assets/Icons';

const AccordionHeader = ({ children, href, toggle, active, className, onClick, isSubMenu }) => {
  const printLink = useMemo(() => {
    return (
      <Link href={href} className={`${active ? 'bg-blue' : 'hover:bg-blue-dark'} rounded-xl `}>
        {children}
      </Link>
    );
  }, [active, children, href]);

  const printCta = useMemo(() => {
    return (
      <div
        onClick={onClick}
        aria-hidden="true"
        className={`cursor-pointer w-full rounded-xl transition-all text-sm font-semibold flex justify-between pr-5 items-center capitalize  ${className} ${
          toggle ? 'bg-blue' : 'hover:bg-blue-dark'
        }`}
      >
        {children}
        <ArrowIcon className={`transition duration-150 ${toggle && 'rotate-180'}`} width="12px" />
      </div>
    );
  }, [children, className, onClick, toggle]);

  const printHeader = useMemo(() => {
    switch (isSubMenu) {
      case true:
        return printCta;
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
