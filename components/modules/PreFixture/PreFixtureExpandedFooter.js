import React, { useState } from 'react';

import CircleArrowsSVG from '@/assets/images/circleArrows.svg';
import { Button, Modal } from '@/elements';
import { ExpandableRowFooter, OfferAcceptModalContent, OfferDeclineForm } from '@/units';

const PreFixtureExpandedFooter = () => {
  const [modalOptions, setModalOptions] = useState({
    opened: false,
    type: null,
  });
  const handleOpenModal = (type) => setModalOptions({ opened: true, type });
  const handleCloseModal = () => setModalOptions({ opened: false, type: null });

  const modalContent = () => {
    switch (modalOptions.type) {
      case 'decline_offer':
        return <OfferDeclineForm closeModal={handleCloseModal} title="Decline Pre-fixture Offer" />;
      case 'accept_offer':
        return <OfferAcceptModalContent closeModal={handleCloseModal} />;
      default:
        return null;
    }
  };

  return (
    <ExpandableRowFooter>
      <div className="flex gap-x-5 justify-between">
        <Button
          buttonProps={{ text: 'Under negotiation', icon: <CircleArrowsSVG />, variant: 'tertiary', size: 'large' }}
          customStyles="grow"
        />
        <div className="flex gap-x-2.5">
          <Button
            onClick={() => handleOpenModal('decline_offer')}
            buttonProps={{ text: 'Decline Negotiations on the Subject Cargo', variant: 'delete', size: 'large' }}
          />
          <Button
            onClick={() => handleOpenModal('accept_offer')}
            buttonProps={{ text: 'Confirm Added Terms & Go On Subs', variant: 'primary', size: 'large' }}
          />
        </div>
      </div>
      <Modal opened={modalOptions.opened} onClose={handleCloseModal}>
        {modalContent()}
      </Modal>
    </ExpandableRowFooter>
  );
};

export default PreFixtureExpandedFooter;
