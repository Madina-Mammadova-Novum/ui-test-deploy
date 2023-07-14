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
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-[#000000] opacity-40 z-10" />
        <div
          className={`${containerClass} first-letter:z-50 fixed overflow-y-auto max-h-[98vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg`}
          onClick={(e) => e.stopPropagation()}
          aria-hidden
        >
          <Button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3"
            buttonProps={{ icon: { before: <CloseSVG /> } }}
          />
          {children}
        </div>
      </>
    )
  );
};

ModalWrapper.propTypes = ModalPropTypes;

export default ModalWrapper;
