'use client';

import { cloneElement, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { Divider } from '@/elements';

const ExpandableCardWrapper = ({ headerComponent, footerComponent, children, expandAll, className }) => {
  const [toggle, setToggle] = useState(false);
  const contentRef = useRef(null);

  const headerComponentWithProps = cloneElement(headerComponent, { toggle });

  useEffect(() => {
    setToggle(expandAll.value);
  }, [expandAll]);

  const expandedHeight = toggle ? `${contentRef?.current?.scrollHeight}px` : '0px';

  return (
    <div className={`rounded-base shadow-xmd box-border ${className}`}>
      <div aria-hidden className="w-full cursor-pointer px-6" onClick={() => setToggle((prevValue) => !prevValue)}>
        {headerComponentWithProps}
      </div>
      <div
        ref={contentRef}
        className="overflow-y-hidden transition-height duration-200"
        style={{ height: expandedHeight }}
      >
        <Divider />
        <div className="p-5 overflow-x-auto">{children}</div>
        {footerComponent}
      </div>
    </div>
  );
};

ExpandableCardWrapper.defaultProps = {
  className: '',
  expandAll: {
    value: false,
  },
};

ExpandableCardWrapper.propTypes = {
  headerComponent: PropTypes.node.isRequired,
  footerComponent: PropTypes.node,
  expandAll: PropTypes.shape({
    value: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default ExpandableCardWrapper;
