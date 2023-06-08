'use client';

import { cloneElement, useEffect, useState } from 'react';

import { ExpandableRowPropTypes } from '@/lib/types';

const ExpandableRow = ({ header, footer, children, expand = false, className = '' }) => {
  const [toggle, setToggle] = useState(false);
  const headerWithProps = cloneElement(header, { toggle });

  useEffect(() => {
    setToggle(expand);
  }, [expand]);

  return (
    <div className="rounded-base shadow-xmd box-border bg-white">
      <div aria-hidden className="w-full cursor-pointer px-6" onClick={() => setToggle((prevValue) => !prevValue)}>
        {headerWithProps}
      </div>
      <div
        className={`transition-[grid-template-rows] duration-500 grid grid-rows-[0fr] overflow-hidden ${toggle && 'grid-rows-[1fr] border-t border-gray-darker'
          }`}
      >
        <div className="min-h-0 relative px-5">
          <div className={`table-scroll ${className}`}>{children}</div>
          {footer}
        </div>
      </div>
    </div>
  );
};

ExpandableRow.propTypes = ExpandableRowPropTypes;

export default ExpandableRow;
