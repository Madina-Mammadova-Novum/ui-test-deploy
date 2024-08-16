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
    <div className="box-border overflow-x-clip rounded-base bg-white shadow-xmd">
      <div aria-hidden className="w-full cursor-pointer px-5" onClick={() => setToggle((prevValue) => !prevValue)}>
        {headerWithProps}
      </div>
      <div
        className={`grid grid-rows-[0fr] overflow-hidden transition-all duration-300 ${toggle && 'grid-rows-[1fr]'}`}
      >
        <div className="relative min-h-0">
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
