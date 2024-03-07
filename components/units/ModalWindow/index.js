'use client';

import { cloneElement, useState } from 'react';

import { ModalWindowPropTypes } from '@/lib/types';

import { Button, Modal } from '@/elements';

const ModalWindow = ({ children, buttonProps, containerClass, useValidation }) => {
  const [opened, setOpened] = useState(false);

  const { text, variant, size, icon, className, disabled, onClick } = buttonProps;

  const handleOpenModal = async (e) => {
    e?.stopPropagation();

    if (useValidation) {
      const { result } = await onClick();
      setOpened(result);
    } else {
      setOpened(true);
    }
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setOpened(false);
  };

  const childrenWithProps = cloneElement(children, { closeModal: handleCloseModal });

  return (
    <>
      <Button
        buttonProps={{ text, variant, size, icon }}
        disabled={disabled}
        customStyles={className}
        onClick={handleOpenModal}
      />
      <Modal containerClass={containerClass} opened={opened} onClose={handleCloseModal}>
        {childrenWithProps}
      </Modal>
    </>
  );
};

ModalWindow.propTypes = ModalWindowPropTypes;

export default ModalWindow;
