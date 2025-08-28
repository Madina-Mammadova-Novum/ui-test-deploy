'use client';

import { useState } from 'react';

import parse from 'html-react-parser';

import { PartyTermsItemPropTypes } from '@/lib/types';

import { Button, Modal, Title } from '@/elements';

const PartyItem = ({ buttonText, modalTitle, body = 'No Content Provided' }) => {
  const [opened, setOpened] = useState(false);

  const handleCloseModal = () => setOpened(false);
  const handleOpenModal = () => setOpened(true);

  return (
    <>
      <Button
        onClick={handleOpenModal}
        buttonProps={{ text: buttonText, variant: 'primary', size: 'small' }}
        customStyles="border border-blue hover:border-blue-darker !px-2.5 !py-0.5 text-xsm font-medium"
      />
      <Modal opened={opened} onClose={handleCloseModal}>
        <div className="w-[672px]">
          <Title level="2">{modalTitle}</Title>
          {body && parse(body)}
        </div>
      </Modal>
    </>
  );
};

PartyItem.propTypes = PartyTermsItemPropTypes;

export default PartyItem;
