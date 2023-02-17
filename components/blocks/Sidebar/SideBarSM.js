import { memo } from 'react';

import PropTypes from 'prop-types';

import { ArrowIcon, Logo } from '@/assets/Icons';
import { Accordion, Search } from '@/elements';

const SideBarSM = memo(({ data, isResized, onResize }) => {
  const printMenu = (item) => <Accordion variant="collapsed" key={item?.id} data={item} />;

  return (
    <>
      <Logo variant="sm" width="40px" height="40px" />
      <div className="mt-4 flex flex-col items-center justify-center gap-1.5 relative">
        <button
          type="button"
          onClick={onResize}
          className="rounded relative flex self-end bg-blue-dark px-4 py-2 w-7 h-7"
        >
          {isResized && (
            <ArrowIcon
              className={`transition absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-150 ${
                isResized && '-rotate-90'
              }`}
              width="14px"
              height="14px"
            />
          )}
        </button>
        <Search variant="sm" isResized={isResized} />
        {data?.map(printMenu)}
      </div>
    </>
  );
});

SideBarSM.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  searchVal: PropTypes.string.isRequired,
  isResized: PropTypes.bool.isRequired,
  onResize: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SideBarSM;
