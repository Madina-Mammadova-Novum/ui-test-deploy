'use client'

import { useState } from 'react';

import { Button, Modal } from '@/elements';
import { DeactivateAccountForm } from "@/modules";

const AccountDeactivateDetails = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  return (
    <>
      <Button
        buttonProps={{ text: 'Do you want to deactivate your account?', variant: 'delete', size: 'small' }}
        customStyles="!p-0"
        onClick={handleOpenModal}
      />
      <Modal opened={opened} onClose={handleCloseModal}>
        <DeactivateAccountForm />
      </Modal>
    </>
  );
};

export default AccountDeactivateDetails;
