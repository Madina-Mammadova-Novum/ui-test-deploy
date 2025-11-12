'use client';

import { cloneElement, useState } from 'react';

import { ModalWindowPropTypes } from '@/lib/types';

import { Button, Modal } from '@/elements';

const ModalWindow = ({ children, buttonProps, buttonComponent, containerClass }) => {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = (e) => {
    e?.stopPropagation();
    setOpened(true);
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setOpened(false);
  };

  const childrenWithProps = cloneElement(children, { closeModal: handleCloseModal });

  // If buttonComponent is provided, use it; otherwise, use buttonProps
  const renderButton = () => {
    if (buttonComponent) {
      return cloneElement(buttonComponent, { onClick: handleOpenModal });
    }

    const { text, variant, size, icon, className, disabled, ...restButtonProps } = buttonProps;
    return (
      <Button
        buttonProps={{ text, variant, size, icon }}
        disabled={disabled}
        customStyles={className}
        onClick={handleOpenModal}
        {...restButtonProps}
      />
    );
  };

  return (
    <>
      {renderButton()}
      <Modal containerClass={containerClass} opened={opened} onClose={handleCloseModal}>
        {childrenWithProps}
      </Modal>
    </>
  );
};

ModalWindow.propTypes = ModalWindowPropTypes;

export default ModalWindow;
