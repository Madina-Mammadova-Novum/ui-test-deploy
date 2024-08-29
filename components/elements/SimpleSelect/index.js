'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import { makeId } from '@/utils/helpers';

const SimpleSelect = ({ label, selectableItems, currentItem, onChange }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleChange = (item) => {
    onChange(item);
  };

  return (
    <>
      {isOpened && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[1]" aria-hidden onClick={() => setIsOpened(false)} />
      )}
      <div className="flex items-center">
        {label && <span className="text-[12px] font-semibold uppercase text-gray">{label}</span>}
        <div
          aria-hidden
          className="relative ml-2.5 flex min-w-[120px] cursor-pointer items-center rounded-md border border-gray bg-white px-2.5 py-1 text-xsm font-medium capitalize"
          onClick={() => setIsOpened(true)}
        >
          <span className="box-border flex-1 text-center">{currentItem}</span>
          <AngleDownSVG className={`fill-black transition duration-500 ${isOpened && 'rotate-180 fill-blue'}`} />
          {isOpened && (
            <div className="absolute -bottom-0.5 left-0 z-[1] max-h-[112px] w-full translate-y-[100%] overflow-y-auto rounded-md bg-white px-2.5 py-2 shadow-xmd">
              {selectableItems.map((item) => (
                <div
                  className={`whitespace-nowrap rounded-md px-2.5 py-1.5 hover:bg-purple-light ${
                    currentItem === item && 'text-blue'
                  }`}
                  key={makeId()}
                  aria-hidden
                  onClick={() => handleChange(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

SimpleSelect.defaultProps = {
  label: '',
  className: '',
};

SimpleSelect.propTypes = {
  label: PropTypes.string,
  selectableItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentItem: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SimpleSelect;
