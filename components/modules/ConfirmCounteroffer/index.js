'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, SimpleSelect } from '@/elements';
import { CommentsContent } from '@/modules';
import { COTTabContent, Countdown, ModalHeader, VoyageDetailsTabContent } from '@/units';
import { COTData, incomingOfferCommentsData, voyageDetailData } from '@/utils/mock';

const ConfirmCounteroffer = ({ goBack, closeModal }) => {
  const [responseCountdown, setResponseCountdown] = useState('20 min');
  const [showScroll, setShowScroll] = useState(false);
  return (
    <div className="w-[610px]">
      <ModalHeader goBack={() => goBack('offer_counteroffer')}>Confirm Changes to Send Counteroffer</ModalHeader>

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
      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`h-[320px] flex flex-col gap-y-5 mt-2.5 overflow-y-auto overflow-x-hidden ${
          showScroll && 'shadow-vInset'
        }`}
      >
        <COTTabContent data={COTData} />
        <VoyageDetailsTabContent data={voyageDetailData} />
        <CommentsContent data={incomingOfferCommentsData} areaDisabled />
      </div>

      <div className="flex text-xsm gap-x-2.5 mt-4">
        <Button
          onClick={closeModal}
          customStyles="ml-auto"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button buttonProps={{ text: 'Confirm Changes and Send', variant: 'primary', size: 'large' }} />
      </div>
    </div>
  );
};

ConfirmCounteroffer.defaultProps = {
  goBack: () => {},
  closeModal: () => {},
};

ConfirmCounteroffer.propTypes = {
  goBack: PropTypes.func,
  closeModal: PropTypes.func,
};

export default ConfirmCounteroffer;
