'use client';

import { cloneElement, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { Divider } from '@/elements';

const ExpandableCardWrapper = ({ headerComponent, footerComponent, children, expandAll, className }) => {
  const contentRef = useRef(null);

  const [toggle, setToggle] = useState(false);
  const headerComponentWithProps = cloneElement(headerComponent, { toggle });

  useEffect(() => {
    setToggle(expandAll.value);
  }, [expandAll]);

  return (
    <div className={`rounded-base shadow-xmd box-border ${className}`}>
      <div aria-hidden className="w-full cursor-pointer px-6" onClick={() => setToggle((prevValue) => !prevValue)}>
        {headerComponentWithProps}
      </div>
      <div
        ref={contentRef}
        className="overflow-y-hidden transition-height duration-200"
        style={{ height: toggle ? `${contentRef?.current?.scrollHeight}px` : '0px' }}
      >
        <Divider />
        <div className="py-5">{children}</div>
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
