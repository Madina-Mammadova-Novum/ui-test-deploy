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

  const { value } = expandAll;

  useEffect(() => {
    setToggle(value);
  }, [value]);

  return (
    <div className={`rounded-base shadow-xmd box-border ${className}`}>
      <div aria-hidden className="w-full cursor-pointer px-6" onClick={() => setToggle((prevValue) => !prevValue)}>
        {headerComponentWithProps}
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-height duration-200"
        style={{ height: toggle ? `${contentRef?.current?.scrollHeight}px` : '0px' }}
      >
        <div className="px-6">
          <Divider />
          {children}
        </div>
        {footerComponent}
      </div>
    </div>
  );
};

ExpandableCardWrapper.propTypes = ExpandableCardWrapperPropTypes;

export default ExpandableCardWrapper;
