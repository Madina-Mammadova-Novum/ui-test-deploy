import React, { useState } from 'react';

import { Button, Modal } from '@/elements';
import OfferModalContent from '@/modules/OfferModalContent';
import { ExpandableRowFooter } from '@/units';

const TankerExpandedFooter = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  return (
    <ExpandableRowFooter>
      <Button
        buttonProps={{ variant: 'primary', size: 'large', text: 'Send offer' }}
        customStyles="ml-auto"
        onClick={handleOpenModal}
      />
      <Modal opened={opened} onClose={handleCloseModal}>
        <OfferModalContent closeModal={handleCloseModal} />
      </Modal>
    </ExpandableRowFooter>
  );
};

export default TankerExpandedFooter;
