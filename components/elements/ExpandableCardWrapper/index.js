'use client';

import { cloneElement, useEffect, useRef, useState } from 'react';

import { ExpandableCardWrapperPropTypes } from '@/lib/types';

import { Divider } from '@/elements';

const ExpandableCardWrapper = ({
  headerComponent,
  footerComponent,
  children,
  className = '',
  expandAll = { value: false },
}) => {
  const contentRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const headerComponentWithProps = cloneElement(headerComponent, { toggle });

  useEffect(() => {
    setToggle(expandAll.value);
  }, [expandAll]);

  const handleClick = () => {
    setToggle((prevValue) => !prevValue);
  };

  const expandedHeight = toggle ? `${contentRef?.current?.scrollHeight}px` : '0px';

  return (
    <div className={`rounded-base shadow-xmd box-border ${className}`}>
      <div aria-hidden className="w-full cursor-pointer px-6" onClick={() => handleClick()}>
        {headerComponentWithProps}
      </div>
      <div
        ref={contentRef}
        className="overflow-y-hidden transition-height duration-200"
        style={{ height: expandedHeight }}
      >
        <Divider />
        <div className="table-scroll pt-5">{children}</div>
        {footerComponent}
      </div>
    </div>
  );
};

ExpandableCardWrapper.propTypes = ExpandableCardWrapperPropTypes;

export default ExpandableCardWrapper;
