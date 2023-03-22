'use client';

import { useRef } from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

const AccordionXl = ({ list, toggle, className }) => {
  const ref = useRef(null);

  const printMenuItem = (item) => {
    return (
      <div
        key={item?.id}
        className="flex flex-col active:bg-blue text-gray active:text-white  px-5 py-1.5 hover:bg-blue-dark rounded-xl relative"
      >
        <span className="uppercase font-bold text-xxs">{item?.label}</span>
        <Link href={item?.path ?? '/'} className="text-xs text-white font-semibold">
          {item.title}
        </Link>
        <div className="absolute -top-5 -left-2 w-px h-full rotate-180 bg-blue-dark">
          <hr className="absolute w-2.5 h-px border-none right-0 bg-blue-dark" />
        </div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`overflow-hidden transition-all px-5 ${className}`}
      style={{ height: toggle ? `${ref?.current?.scrollHeight}px` : '0px' }}
    >
      {list?.map(printMenuItem)}
    </div>
  );
};

export default AccordionXl;

AccordionXl.defaultProps = {
  className: '',
};

AccordionXl.propTypes = {
  toggle: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
};
