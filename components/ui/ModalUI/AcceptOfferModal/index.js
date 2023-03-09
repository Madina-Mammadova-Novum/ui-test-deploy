import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Tabs } from '@/elements';
import { Countdown, ModalHeader } from '@/ui';
import MessageContent from '@/ui/ModalUI/AcceptOfferModal/MessageContent';
import IncomingCOTContent from '@/ui/ModalUI/IncomingOfferModal/IncomingCOTContent';
import VoyageDetailsContent from '@/ui/ModalUI/IncomingOfferModal/VoyageDetailsContent';
import {
  acceptOfferMessages,
  acceptOfferTabs,
  incomingOfferCommercialTermsData,
  incomingOfferVoyageDetailData,
} from '@/utils/mock';

const AcceptOfferModal = ({ setModalId, closeModal }) => {
  const [currentTab, setCurrentTab] = useState(acceptOfferTabs[0].value);
  const [showScroll, setShowScroll] = useState(false);

  return (
    <div className="w-[610px]">
      <ModalHeader title="Accept the offer" goBack={() => setModalId('view_offer')} />

      <Countdown time="1d 1h 50m" customStyles="mt-5" />

      <Tabs tabs={acceptOfferTabs} activeTab={currentTab} onClick={setCurrentTab} customStyles="mx-auto mt-5" />

      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`h-[320px] mt-3 overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        {currentTab === 'message' && <MessageContent data={acceptOfferMessages} />}
        {currentTab === 'voyage_details' && <VoyageDetailsContent data={incomingOfferVoyageDetailData} />}
        {currentTab === 'commercial_offer_terms' && <IncomingCOTContent data={incomingOfferCommercialTermsData} />}
      </div>

      <div className="flex text-xsm gap-x-2.5 mt-4">
        <Button
          onClick={closeModal}
          customStyles="ml-auto"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button buttonProps={{ text: 'Accept the offer', variant: 'primary', size: 'large' }} />
      </div>
    </div>
  );
};

AcceptOfferModal.defaultProps = {
  setModalId: () => {},
  closeModal: () => {},
};

AcceptOfferModal.propTypes = {
  setModalId: PropTypes.func,
  closeModal: PropTypes.func,
};

export default AcceptOfferModal;
