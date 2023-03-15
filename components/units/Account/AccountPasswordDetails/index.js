'use client';

import { useState } from 'react';

import { Button, Modal, Title } from '@/elements';
import { PasswordInfoForm } from "@/modules";

const AccountPasswordDetails = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  return (
    <>
      <div className="bg-white rounded-md border-2 border-solid border-gray-darker p-5 w-full">
        <div className="flex justify-between items-center">
          <Title component="h3" className="text-lg text-black font-bold">
            Password
          </Title>
          <Button
            buttonProps={{ text: 'Change your password', variant: 'primary', size: 'medium' }}
            customStyles="!py-1 !px-2.5"
            onClick={handleOpenModal}
          />
        </div>
      </div>
      <Modal opened={opened} onClose={handleCloseModal}>
        <PasswordInfoForm />
      </Modal>
    </>
  );
};

export default AccountPasswordDetails;
