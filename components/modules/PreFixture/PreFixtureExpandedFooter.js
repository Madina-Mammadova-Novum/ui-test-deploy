import { useState } from 'react';

import { PreFixtureExpandedFooterPropTypes } from '@/lib/types';

import ClockSVG from '@/assets/images/clock.svg';
import CircleArrowsSVG from '@/assets/images/process.svg';
import { Button, Modal } from '@/elements';
import { ExpandableRowFooter, OfferAcceptModalContent } from '@/units';

const PreFixtureExpandedFooter = ({ underNegotiation, offerId, offerAccepted }) => {
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
      <div className="flex flex-col lg:flex-row gap-x-5 gap-y-2.5 justify-between px-5 pb-2.5">
        {offerAccepted ? (
          <Button
            buttonProps={{
              text: 'You have confirmed to go on subs. We are waiting for your counterparty’s decision. You will be notified soon.',
              icon: { before: <ClockSVG viewBox="0 0 14 14" className="fill-gray w-4 h-4 ml-1" /> },
              iconContainerStyles: 'self-baseline',
              variant: 'tertiary',
              size: 'large',
            }}
            customStyles="w-full h-auto"
            customStylesFromWrap="w-full"
            disabled
          />
        ) : (
          <>
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
          </>
        )}
      </div>
      <Modal opened={modalOptions.opened} onClose={handleCloseModal}>
        {modalContent()}
      </Modal>
    </ExpandableRowFooter>
  );
};

PreFixtureExpandedFooter.propTypes = PreFixtureExpandedFooterPropTypes;

export default PreFixtureExpandedFooter;
