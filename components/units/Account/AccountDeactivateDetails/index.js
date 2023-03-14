import { useState } from 'react';

import { Button, Modal } from '@/elements';

const AccountDeactivateDetails = ({ children }) => {
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
        {children}
      </Modal>
    </>
  );
};

export default AccountDeactivateDetails;
