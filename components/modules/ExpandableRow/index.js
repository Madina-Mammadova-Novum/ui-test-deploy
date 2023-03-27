'use client';

import React, { cloneElement, useEffect, useRef, useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { noSSR } from '@/utils/helpers';

const ExpandableRow = ({ headerComponent, footerComponent, children, expandAll }) => {
  const [toggle, setToggle] = useState(false);
  const contentRef = useRef(null);
  const headerComponentWithProps = cloneElement(headerComponent, { toggle });

  useEffect(() => {
    setToggle(expandAll.value);
  }, [expandAll]);

  return (
    <div className="rounded-[10px] shadow-xmd box-border">
      <div aria-hidden className="w-full cursor-pointer px-6" onClick={() => setToggle((prevValue) => !prevValue)}>
        {headerComponentWithProps}
      </div>
      <div
        ref={contentRef}
        className={classnames('overflow-hidden transition-height duration-500', {
          'border-t border-gray-darker': toggle,
        })}
        style={{ height: toggle ? `${contentRef?.current?.scrollHeight}px` : '0px' }}
      >
        <div className="px-6">{children}</div>
        {footerComponent}
      </div>
    </div>
  );
};

ExpandableRow.defaultProps = {
  expandAll: {
    value: false,
  },
};

ExpandableRow.propTypes = {
  headerComponent: PropTypes.node.isRequired,
  footerComponent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  expandAll: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export default noSSR(ExpandableRow);
