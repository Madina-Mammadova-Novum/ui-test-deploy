'use client';

import { useState } from 'react';

import { ModalWindowPropTypes } from '@/lib/types';

import { Button, Modal } from '@/elements';

const ModalWindow = ({ children, buttonProps }) => {
  const [opened, setOpened] = useState(false);

  const { text, variant, size, icon, className, disabled } = buttonProps;

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  return (
    <>
      <Button
        buttonProps={{ text, variant, size, icon }}
        disabled={disabled}
        customStyles={className}
        onClick={handleOpenModal}
      />
      <Modal opened={opened} onClose={handleCloseModal}>
        {children}
      </Modal>
    </>
  );
};

ModalWindow.propTypes = ModalWindowPropTypes;

export default ModalWindow;
