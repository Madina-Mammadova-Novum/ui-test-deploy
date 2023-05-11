'use client';

import { useEffect } from 'react';

import { ModalPropTypes } from '@/lib/types';

import { CloseIcon } from '@/assets/icons';
import { Button } from '@/elements';

const ModalWrapper = ({ opened, onClose, containerClass = 'overflow-y-auto', children }) => {
  useEffect(() => {
    if (opened) document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [opened]);

  return (
    opened && (
      <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-[#000000] opacity-40" />
        <div
          className={`fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg ${containerClass}`}
        >
          <Button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3"
            buttonProps={{ icon: { before: <CloseIcon /> } }}
          />
          {children}
        </div>
      </>
    )
  );
};

ModalWrapper.propTypes = ModalPropTypes;

export default ModalWrapper;
