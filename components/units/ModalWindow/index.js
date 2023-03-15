'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Modal } from '@/elements';
import { SIZES } from '@/lib';
import { STYLES } from '@/lib/constants';

const AccountCompanyDetails = ({ children, buttonProps }) => {
  const [opened, setOpened] = useState(false);

  const { text, variant, size } = buttonProps;

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  return (
    <>
      <Button buttonProps={{ text, variant, size }} customStyles="!py-1 !px-2.5" onClick={handleOpenModal} />
      <Modal opened={opened} onClose={handleCloseModal}>
        {children}
      </Modal>
    </>
  );
};

AccountCompanyDetails.propTypes = {
  children: PropTypes.node.isRequired,
  buttonProps: PropTypes.shape({
    text: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(STYLES).isRequired,
    size: PropTypes.oneOf(SIZES.BUTTONS).isRequired,
  }),
};

export default AccountCompanyDetails;
