'use client';

import { useRef } from 'react';

import PropTypes from 'prop-types';

import NavTreeSubBody from './NavTreeSubBody';

const NavTreeBody = ({ list, toggle, className = '' }) => {
  const ref = useRef(null);

  const printLink = (link) => <NavTreeSubBody key={link.id} data={link} />;

  return (
    <ul
      ref={ref}
      className={`overflow-hidden w-full transition-all relative -top-0.5 left-2.5 px-5 ${className}`}
      style={{ height: toggle ? `${ref?.current?.scrollHeight}px` : '0px' }}
    >
      {list?.map(printLink)}
    </ul>
  );
};

export default NavTreeBody;

NavTreeBody.propTypes = {
  toggle: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
};
