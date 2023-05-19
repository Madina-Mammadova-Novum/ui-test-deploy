'use client';

import { cloneElement, useEffect, useState } from 'react';

import { ExpandableRowPropTypes } from '@/lib/types';

const ExpandableRow = ({ header, footer, children, expand = false }) => {
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
        className={`transition-[grid-template-rows] duration-500 grid grid-rows-[0fr] overflow-hidden ${
          toggle && 'grid-rows-[1fr] border-t border-gray-darker'
        }`}
      >
{/* <<<<<<< HEAD */}
        <div className="min-h-0">
          <div className="px-6 table-scroll">{children}</div>
          {footer}
        </div>
{/* =======
        <div className="px-6 table-scroll">{children}</div>
        {footer}
>>>>>>> 48e87567941281d27c068f24b6be754e65ea3ca0 */}
      </div>
    </div>
  );
};

ExpandableRow.propTypes = ExpandableRowPropTypes;

export default ExpandableRow;
