'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Modal } from '@/elements';
import { SIZES } from '@/lib';
import { STYLES } from '@/lib/constants';

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

ModalWindow.propTypes = {
  children: PropTypes.node.isRequired,
  buttonProps: PropTypes.shape({
    className: PropTypes.string,
    icon: PropTypes.node,
    text: PropTypes.string,
    variant: PropTypes.oneOf(STYLES),
    size: PropTypes.oneOf(SIZES.BUTTONS),
    disabled: PropTypes.bool,
  }).isRequired,
};

export default ModalWindow;
