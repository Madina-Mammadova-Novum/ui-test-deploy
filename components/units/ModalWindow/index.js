'use client';

import { cloneElement, useState } from 'react';

import { ModalWindowPropTypes } from '@/lib/types';

import { Button, Modal } from '@/elements';

const ModalWindow = ({ children, buttonProps, containerClass }) => {
  const [opened, setOpened] = useState(false);

  const { text, variant, size, icon, className, disabled, ...restButtonProps } = buttonProps;

  const handleOpenModal = (e) => {
    e?.stopPropagation();
    setOpened(true);
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
        {...restButtonProps}
      />
      <Modal containerClass={containerClass} opened={opened} onClose={handleCloseModal}>
        {childrenWithProps}
      </Modal>
    </>
  );
};

ModalWindow.propTypes = ModalWindowPropTypes;

export default ModalWindow;
