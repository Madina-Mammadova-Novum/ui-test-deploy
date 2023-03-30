'use client';

import { cloneElement, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { Divider } from '@/elements';

const ExpandableCardWrapper = ({ headerComponent, footerComponent, children, expandAll }) => {
  const contentRef = useRef(null);

  const [toggle, setToggle] = useState(false);
  const headerComponentWithProps = cloneElement(headerComponent, { toggle });

  useEffect(() => {
    setToggle(expandAll.value);
  }, [expandAll]);

  return (
    <div className="rounded-base shadow-xmd box-border">
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

ExpandableCardWrapper.defaultProps = {
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
};

export default ExpandableCardWrapper;
