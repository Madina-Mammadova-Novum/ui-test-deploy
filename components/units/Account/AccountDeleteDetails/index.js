'use client'

import { useState } from 'react';

import { Button, Modal } from '@/elements';
import { DeleteAccountForm } from "@/modules";

const AccountDeleteDetails = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  return (
    <>
      <Button
        buttonProps={{ text: 'Do you want to delete your account?', variant: 'delete', size: 'small' }}
        customStyles="!p-0"
        onClick={handleOpenModal}
      />
      <Modal opened={opened} onClose={handleCloseModal}>
        <DeleteAccountForm />
      </Modal>
    </>
  );
};

export default AccountDeleteDetails;
