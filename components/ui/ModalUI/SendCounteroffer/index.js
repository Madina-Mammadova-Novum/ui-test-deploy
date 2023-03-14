'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { FormManager } from '@/common';
import { Button, SimpleSelect, Tabs } from '@/elements';
import { Countdown, ModalHeader } from '@/ui';
import VoyageDetailsContent from '@/ui/ModalUI/IncomingOfferModal/VoyageDetailsContent';
import CounterofferCommentsContent from '@/ui/ModalUI/SendCounteroffer/CounterofferCommentsContent';
import CounterofferCOTContent from '@/ui/ModalUI/SendCounteroffer/CounterofferCOTContent';
import { incomingOfferCommentsData, incomingOfferVoyageDetailData, sendCounterofferModalTabs } from '@/utils/mock';

const SendCounteroffer = ({ setStep, closeModal }) => {
  const [currentTab, setCurrentTab] = useState(sendCounterofferModalTabs[0].value);
  const [responseCountdown, setResponseCountdown] = useState('20 min');
  const [showScroll, setShowScroll] = useState(false);

  return (
    <div className="w-[610px]">
      <ModalHeader title="Send Counteroffer" goBack={() => setStep('view_offer')} />

      <div className="flex text-[12px] items-center mt-5">
        <Countdown time="1h 50m" />
        <div className="pl-4 border-l h-min flex items-center">
          <p className="font-bold max-w-[240px]">
            Set a response countdown timer for the vessel owner to reply to this offer
          </p>
          <SimpleSelect
            onChange={setResponseCountdown}
            currentItem={responseCountdown}
            selectableItems={['20 min', '40 min', '60 min']}
          />
        </div>
      </div>

      <Tabs
        customStyles="mx-auto mt-5 mb-3"
        tabs={sendCounterofferModalTabs}
        activeTab={currentTab}
        defaultTab={sendCounterofferModalTabs[0].value}
        onClick={setCurrentTab}
      />

      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`h-[320px] overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        {currentTab === 'commercial_offer_terms' && (
          <FormManager>
            <CounterofferCOTContent />
          </FormManager>
        )}
        {currentTab === 'voyage_details' && <VoyageDetailsContent data={incomingOfferVoyageDetailData} />}
        {currentTab === 'comments' && <CounterofferCommentsContent data={incomingOfferCommentsData} />}
      </div>

      <div className="flex text-xsm gap-x-2.5 mt-4">
        <Button
          onClick={closeModal}
          customStyles="ml-auto"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button
          onClick={() => setStep('offer_counteroffer_confirm')}
          buttonProps={{ text: 'Confirm changes', variant: 'primary', size: 'large' }}
        />
      </div>
    </div>
  );
};

SendCounteroffer.defaultProps = {
  setStep: () => {},
  closeModal: () => {},
};

SendCounteroffer.propTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func,
};

export default SendCounteroffer;
