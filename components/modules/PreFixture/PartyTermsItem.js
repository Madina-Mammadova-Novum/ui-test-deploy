import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Button, Modal, Title } from '@/elements';

const PartyTermsItem = ({ title, content }) => {
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

PartyTermsItem.propTypes = {
    content: 'No Content Provided'
}

PartyTermsItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
}

export default PartyTermsItem;
