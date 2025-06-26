'use client';

import { cloneElement, useEffect, useMemo, useRef, useState } from 'react';

import { ExpandableCardWrapperPropTypes } from '@/lib/types';

import { Divider } from '@/elements';

const ExpandableCardWrapper = ({
  headerComponent,
  footerComponent,
  children,
  className = '',
  expandAll = false,
  index = null,
}) => {
  // If index is provided and it's the first element (index === 0), expand by default
  // Otherwise, use the expandAll prop
  const shouldExpandByDefault = index === 0 || expandAll;

  const [toggle, setToggle] = useState(shouldExpandByDefault);

  const contentRef = useRef(null);
  const headerComponentWithProps = cloneElement(headerComponent, { toggle });

  useEffect(() => {
    // Update toggle state when expandAll changes, but preserve first element expansion
    if (index === 0) {
      // First element should always be expanded unless explicitly collapsed
      setToggle(true);
    } else {
      // Other elements follow expandAll prop
      setToggle(expandAll);
    }
  }, [expandAll, index]);

  const handleClick = () => {
    setToggle((prevValue) => !prevValue);
  };

  const expandedHeight = useMemo(() => {
    return toggle ? contentRef?.current?.scrollHeight : 0;
  }, [toggle]);

  return (
    <div className={`my-3 box-border rounded-base shadow-xmd ${className}`}>
      <div aria-hidden className="w-full cursor-pointer px-5" onClick={() => handleClick()}>
        {headerComponentWithProps}
      </div>
      <div
        ref={contentRef}
        style={{ height: expandedHeight }}
        className="table-scroll overflow-y-clip transition-all duration-300"
      >
        <div className="flex w-full flex-col">
          <Divider className="mx-5" />
          <div className="p-5">{children}</div>
          {footerComponent}
        </div>
      </div>
    </div>
  );
};

ExpandableCardWrapper.propTypes = ExpandableCardWrapperPropTypes;

export default ExpandableCardWrapper;
