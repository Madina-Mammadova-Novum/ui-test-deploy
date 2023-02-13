import { useMemo } from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

import { ArrowIcon } from '@/assets/Icons';

const CollapseHeader = ({ children, href, toggle, className, onClick, isSubMenu }) => {
  const printLink = useMemo(() => {
    return <Link href={href}>{children}</Link>;
  }, [children, href]);

  const printCta = useMemo(() => {
    return (
      <div
        onClick={onClick}
        aria-hidden="true"
        className={`cursor-pointer text-sm font-semibold flex justify-between pr-5 items-center capitalize rounded-xl hover:bg-blue-dark ${className}`}
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
      case false:
        return printLink;
      default:
        return printLink;
    }
  }, [isSubMenu, printCta, printLink]);

  return printHeader;
};

CollapseHeader.defaultProps = {
  className: '',
  href: '/',
  children: null,
  isSubMenu: false,
  onClick: () => {},
};

CollapseHeader.propTypes = {
  children: PropTypes.node,
  toggle: PropTypes.bool.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  isSubMenu: PropTypes.bool,
};

export default CollapseHeader;
