'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import ArrowSVG from '@/assets/images/arrow.svg';

const SimpleSelect = ({ label, selectableItems, currentItem, onChange }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      {isOpened && (
        <div className="fixed top-0 left-0 bottom-0 right-0" aria-hidden onClick={() => setIsOpened(false)} />
      )}
      <div className="flex items-center">
        {label && <span className="text-[12px] font-semibold text-gray uppercase">{label}</span>}
        <div
          aria-hidden
          className="relative flex items-center px-4 py-1.5 ml-2.5 border rounded-md border-gray text-xsm font-medium cursor-pointer min-w-[68px]"
          onClick={() => setIsOpened(true)}
        >
          <span className="box-border flex-1">{currentItem}</span>
          <ArrowSVG className={`w-2.5 ml-2 transition duration-500 ${isOpened && 'rotate-180 fill-blue'}`} />
          {isOpened && (
            <div className="absolute -bottom-0.5 left-0 translate-y-[100%] px-2.5 py-2 rounded-md bg-white shadow-xmd w-full overflow-y-auto max-h-[112px]">
              {selectableItems.map((item) => (
                <div
                  className={`px-2.5 py-1.5 rounded-md hover:bg-purple-light ${currentItem === item && 'text-blue'}`}
                  aria-hidden
                  onClick={() => onChange(item)}
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
};

SimpleSelect.propTypes = {
  label: PropTypes.string,
  selectableItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentItem: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SimpleSelect;
