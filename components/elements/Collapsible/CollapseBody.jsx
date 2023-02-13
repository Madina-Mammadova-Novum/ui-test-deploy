import { useMemo, useRef } from 'react';

import Link from 'next/link';
import PropTypes from 'prop-types';

const CollapseBody = ({ list, toggle, className }) => {
  const ref = useRef(null);

  const printMenuItem = (item) => {
    return (
      <div key={item?.id} className="flex flex-col  px-5 py-1.5 relative">
        <span className="text-gray uppercase font-bold text-xxs">{item?.label}</span>
        <Link href={item?.path ?? '/'} className="text-xs font-semibold">
          {item.title}
        </Link>
        <div className="absolute -top-5 w-px h-full rotate-180 left-0 bg-blue-dark">
          <hr className="absolute w-2.5 h-px border-none right-0 bg-blue-dark" />
        </div>
      </div>
    );
  };

  const renderMenuItems = useMemo(() => list?.map(printMenuItem), [list]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden transition-height duration-150 px-5 ${className}`}
      style={{ height: toggle ? `${ref?.current?.scrollHeight}px` : '0px' }}
    >
      {!list.lenght ? renderMenuItems : <p>No Data</p>}
    </div>
  );
};

CollapseBody.defaultProps = {
  className: '',
};

CollapseBody.propTypes = {
  toggle: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
};

export default CollapseBody;
