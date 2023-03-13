'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Tabs } from '@/elements';
import {
  AcceptOfferModal,
  ConfirmCounteroffer,
  Countdown,
  ModalHeader,
  OfferDeclineModal,
  SendCounteroffer,
} from '@/ui';
import IncomingCommentsContent from '@/ui/ModalUI/IncomingOfferModal/IncomingCommentsContent';
import IncomingCOTContent from '@/ui/ModalUI/IncomingOfferModal/IncomingCOTContent';
import VoyageDetailsContent from '@/ui/ModalUI/IncomingOfferModal/VoyageDetailsContent';
import {
  incomingOfferCommentsData,
  incomingOfferCommercialTermsData,
  incomingOffersModalTabs,
  incomingOfferVoyageDetailData,
} from '@/utils/mock';

const IncomingOfferModal = ({ closeModal }) => {
  const [currentTab, setCurrentTab] = useState(incomingOffersModalTabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const [step, setStep] = useState('view_offer');

  switch (step) {
    case 'offer_decline':
      return <OfferDeclineModal setStep={setStep} closeModal={closeModal} />;
    case 'offer_counteroffer':
      return <SendCounteroffer setStep={setStep} closeModal={closeModal} />;
    case 'offer_counteroffer_confirm':
      return <ConfirmCounteroffer setStep={setStep} closeModal={closeModal} />;
    case 'offer_accept':
      return <AcceptOfferModal setStep={setStep} closeModal={closeModal} />;
    case 'view_offer':
      return (
        <div className="w-[610px]">
          <ModalHeader title="View Incoming Offer" />

          <div className="flex text-[12px] items-center mt-5">
            <Countdown time="1d 1h 50m" />
            <div className="pl-4 border-l h-min">
              <p className="font-bold">You can use an extension for a response only once for each incoming offer</p>
              <Button
                customStyles="text-[10px] font-bold !px-2.5 !py-1 uppercase leading-none"
                buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'medium' }}
              />
            </div>
          </div>

          <Tabs
            customStyles="mx-auto mt-5 mb-3"
            tabs={incomingOffersModalTabs}
            activeTab={currentTab}
            defaultTab={incomingOffersModalTabs[0].value}
            onClick={setCurrentTab}
          />

          <div
            ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
            className={`h-[320px] overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
          >
            {currentTab === 'voyage_details' && <VoyageDetailsContent data={incomingOfferVoyageDetailData} />}
            {currentTab === 'commercial_offer_terms' && <IncomingCOTContent data={incomingOfferCommercialTermsData} />}
            {currentTab === 'comments' && <IncomingCommentsContent data={incomingOfferCommentsData} />}
          </div>

          <div className="flex text-xsm gap-x-2.5 mt-4">
            <Button
              onClick={closeModal}
              customStyles="mr-auto"
              buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
            />
            <Button
              onClick={() => setStep('offer_decline')}
              buttonProps={{ text: 'Decline the offer', variant: 'delete', size: 'large' }}
            />
            <Button
              onClick={() => setStep('offer_counteroffer')}
              buttonProps={{ text: 'Send counteroffer', variant: 'secondary', size: 'large' }}
            />
            <Button
              onClick={() => setStep('offer_accept')}
              buttonProps={{ text: 'Accept the offer', variant: 'primary', size: 'large' }}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};

IncomingOfferModal.defaultProps = {
  closeModal: () => {},
};

IncomingOfferModal.propTypes = {
  closeModal: PropTypes.func,
};

export default IncomingOfferModal;
