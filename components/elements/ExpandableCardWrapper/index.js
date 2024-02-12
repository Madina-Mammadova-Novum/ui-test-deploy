'use client';

import { cloneElement, useEffect, useMemo, useRef, useState } from 'react';

import { ExpandableCardWrapperPropTypes } from '@/lib/types';

import { Divider } from '@/elements';

const ExpandableCardWrapper = ({ headerComponent, footerComponent, children, className = '', expandAll = false }) => {
  const [toggle, setToggle] = useState(expandAll);

  const contentRef = useRef(null);
  const headerComponentWithProps = cloneElement(headerComponent, { toggle });

  useEffect(() => {
    setToggle(expandAll);
  }, [expandAll]);

  const handleClick = () => {
    setToggle((prevValue) => !prevValue);
  };

  const expandedHeight = useMemo(() => {
    return toggle ? contentRef?.current?.scrollHeight : 0;
  }, [toggle]);

  return (
    <div className={`rounded-base shadow-xmd box-border my-3 ${className}`}>
      <div aria-hidden className="w-full cursor-pointer px-5" onClick={() => handleClick()}>
        {headerComponentWithProps}
      </div>
      <div
        ref={contentRef}
        style={{ height: expandedHeight }}
        className="overflow-y-clip table-scroll transition-all duration-300"
      >
        <div className="flex flex-col w-max lg:w-full">
          <Divider className="w-full" />
          <div className="m-5">{children}</div>
          {footerComponent}
        </div>
      </div>
    </div>
  );
};

ExpandableCardWrapper.propTypes = ExpandableCardWrapperPropTypes;

export default ExpandableCardWrapper;
