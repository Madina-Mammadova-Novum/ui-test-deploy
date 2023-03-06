import React, { cloneElement, useEffect, useRef, useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { noSSR } from '@/utils/helpers';

const ExpandableRow = ({ headerComponent, children, expandAll }) => {
  const [toggle, setToggle] = useState(false);
  const contentRef = useRef(null);
  const headerComponentWithProps = cloneElement(headerComponent, { toggle });

  useEffect(() => {
    setToggle(expandAll.value);
  }, [expandAll]);
  return (
    <div className="rounded-[10px] shadow-xmd box-border px-6">
      <button type="button" className="w-full" onClick={() => setToggle((prevValue) => !prevValue)}>
        {headerComponentWithProps}
      </button>
      <div
        ref={contentRef}
        className={classnames('overflow-hidden transition-height duration-500', {
          'border-t border-gray-darker': toggle,
        })}
        style={{ height: toggle ? `${contentRef?.current?.scrollHeight}px` : '0px' }}
      >
        {children}
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
  children: PropTypes.node.isRequired,
  expandAll: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export default noSSR(ExpandableRow);
