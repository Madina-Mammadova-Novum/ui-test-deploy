import { memo } from 'react';

import PropTypes from 'prop-types';

import { ArrowIcon, Logo } from '@/assets/Icons';
import { Accordion, Search } from '@/elements';

const SideBarXL = memo(({ data, searchVal, isResized, onResize, onSearch }) => {
  const printMenu = (item) => <Accordion variant="opened" key={item?.id} data={item} />;

  return (
    <>
      <Logo variant="xl" width="100%" height="40px" />
      <div className="mt-8 flex flex-col gap-1.5 relative">
        <button type="button" onClick={onResize} className="rounded relative flex self-end bg-blue-dark p-1 w-7 h-7">
          {!isResized && (
            <ArrowIcon
              className={`transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-150 ${
                !isResized && 'rotate-90'
              }`}
              width="14px"
              height="14px"
            />
          )}
        </button>
        <Search variant="xl" isResized={isResized} value={searchVal} onChange={onSearch} />
        {data?.map(printMenu)}
      </div>
    </>
  );
});

SideBarXL.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  searchVal: PropTypes.string.isRequired,
  isResized: PropTypes.bool.isRequired,
  onResize: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SideBarXL;
