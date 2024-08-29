'use client';

import { useEffect } from 'react';

import { ModalPropTypes } from '@/lib/types';

import CloseSVG from '@/assets/images/close.svg';
import { Button } from '@/elements';

const ModalWrapper = ({ opened, onClose, containerClass, children }) => {
  useEffect(() => {
    if (opened) document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [opened]);

  return (
    opened && (
      <>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-[#000000] opacity-40" />
        <div
          className={`${containerClass} fixed left-1/2 top-1/2 z-50 max-h-[98vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8`}
          aria-hidden
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3"
            buttonProps={{ icon: { before: <CloseSVG className="fill-black" /> } }}
          />
          {children}
        </div>
      </>
    )
  );
};

ModalWrapper.propTypes = ModalPropTypes;

export default ModalWrapper;
