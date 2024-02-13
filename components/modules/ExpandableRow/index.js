'use client';

import { cloneElement, useEffect, useState } from 'react';

import { ExpandableRowPropTypes } from '@/lib/types';

import { Divider } from '@/elements';

const ExpandableRow = ({ header, footer, children, expand, isOpened, className = '' }) => {
  const [toggle, setToggle] = useState(false);

  const headerWithProps = cloneElement(header, { toggle });

  useEffect(() => {
    setToggle(expand?.value ?? expand);
  }, [expand]);

  useEffect(() => {
    if (isOpened) setToggle(isOpened);
  }, [isOpened]);

  return (
    <div className="rounded-base shadow-xmd box-border bg-white overflow-x-clip">
      <div aria-hidden className="w-full cursor-pointer px-5" onClick={() => setToggle((prevValue) => !prevValue)}>
        {headerWithProps}
      </div>
      <div
        className={`transition-all duration-300 grid grid-rows-[0fr] overflow-hidden ${toggle && 'grid-rows-[1fr]'}`}
      >
        <div className="min-h-0 relative">
          <Divider className="mx-5" />
          <div className={className}>{children}</div>
          {footer}
        </div>
      </div>
    </div>
  );
};

ExpandableRow.propTypes = ExpandableRowPropTypes;

export default ExpandableRow;
