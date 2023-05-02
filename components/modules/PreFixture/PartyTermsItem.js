import { useState } from 'react';

import { PartyTermsItemPropTypes } from '@/lib/types';

import { Button, Modal, Title } from '@/elements';

const PartyTermsItem = ({ title, content = 'No Content Provided' }) => {
  const [opened, setOpened] = useState(false);
  const handleCloseModal = () => setOpened(false);
  const handleOpenModal = () => setOpened(true);

  return (
    <>
      <Button
        onClick={handleOpenModal}
        buttonProps={{ text: title, variant: 'primary', size: 'small' }}
        customStyles="border border-blue hover:border-blue-darker !px-2.5 !py-0.5 text-xsm font-medium"
      />
      <Modal opened={opened} onClose={handleCloseModal}>
        <div className="w-[672px]">
          <Title component="h2">All Additional Information</Title>
          {content}
        </div>
      </Modal>
    </>
  );
};

PartyTermsItem.propTypes = PartyTermsItemPropTypes;

export default PartyTermsItem;
