import { useState } from 'react';

import { PreFixtureExpandedFooterPropTypes } from '@/lib/types';

import CircleArrowsSVG from '@/assets/images/process.svg';
import { Button, Modal } from '@/elements';
import { ExpandableRowFooter, OfferAcceptModalContent } from '@/units';

const PreFixtureExpandedFooter = ({ underNegotiation, offerId }) => {
  const [modalOptions, setModalOptions] = useState({
    opened: false,
    type: null,
  });

  const handleOpenModal = (type) => setModalOptions({ opened: true, type });
  const handleCloseModal = () => setModalOptions({ opened: false, type: null });

  const modalContent = () => {
    switch (modalOptions.type) {
      case 'accept_offer':
        return <OfferAcceptModalContent closeModal={handleCloseModal} offerId={offerId} />;
      default:
        return null;
    }
  };

  return (
    <ExpandableRowFooter>
      <div className="flex flex-col lg:flex-row gap-x-5 gap-y-2.5 justify-between">
        <div className="w-full grow">
          {underNegotiation && (
            <Button
              buttonProps={{
                text: 'Under negotiation',
                icon: { before: <CircleArrowsSVG /> },
                variant: 'tertiary',
                size: 'large',
              }}
              customStyles="w-full whitespace-nowrap 3md:grow"
              disabled
            />
          )}
        </div>
        <div className="flex flex-col gap-x-2.5 gap-y-2.5 3md:flex-row">
          <div className="w-full">
            <Button
              onClick={() => handleOpenModal('accept_offer')}
              buttonProps={{ text: 'Confirm Added Terms & Go On Subs', variant: 'primary', size: 'large' }}
              customStyles="w-full whitespace-nowrap"
              disabled={underNegotiation}
            />
          </div>
        </div>
      </div>
      <Modal opened={modalOptions.opened} onClose={handleCloseModal}>
        {modalContent()}
      </Modal>
    </ExpandableRowFooter>
  );
};

PreFixtureExpandedFooter.propTypes = PreFixtureExpandedFooterPropTypes;

export default PreFixtureExpandedFooter;
