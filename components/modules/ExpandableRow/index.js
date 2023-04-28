'use client';

import { cloneElement, useEffect, useRef, useState } from 'react';

import classnames from 'classnames';

import { ExpandableRowPropTypes } from '@/lib/types';

const ExpandableRow = ({ header, footer, children, expand = false }) => {
  const [toggle, setToggle] = useState(false);
  const contentRef = useRef(null);
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
        ref={contentRef}
        className={classnames('overflow-hidden transition-height duration-500', {
          'border-t border-gray-darker': toggle,
        })}
        style={{ height: toggle ? `${contentRef?.current?.scrollHeight}px` : '0px' }}
      >
        <div className="px-6">{children}</div>
        {footer}
      </div>
    </div>
  );
};

ExpandableRow.propTypes = ExpandableRowPropTypes;

export default ExpandableRow;
