import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';

import ArrowSVG from '@/assets/images/arrow.svg';

const Collapsible = ({ title, items }) => {
  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);
  return (
    <div className="w-min">
      <button
      type="button"
        className="flex items-center px-5 py-3 cursor-pointer"
        onClick={() => setToggle((prevValue) => !prevValue)}
      >
        {title}
        <ArrowSVG className={`ml-1.5 transition duration-500 ${toggle && 'rotate-180'}`} width="12px" />
      </button>
      <div
        ref={ref}
        className="overflow-hidden transition-height duration-500"
        style={{ height: toggle ? `${ref?.current?.scrollHeight}px` : '0px' }}
      >
        {items.map((placeholder) => (
          <div key={placeholder}>{placeholder}</div>
        ))}
      </div>
    </div>
  );
};

Collapsible.defaultProps = {
  items: [],
  title: '',
};

Collapsible.propTypes = {
  title: PropTypes.string,
  items: PropTypes.shape([]),
};

export default Collapsible;
