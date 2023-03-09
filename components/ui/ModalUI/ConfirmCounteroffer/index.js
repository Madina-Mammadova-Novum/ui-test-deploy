import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, SimpleSelect } from '@/elements';
import { Countdown, ModalHeader } from '@/ui';
import IncomingCOTContent from '@/ui/ModalUI//IncomingOfferModal/IncomingCOTContent';
import VoyageDetailsContent from '@/ui/ModalUI//IncomingOfferModal/VoyageDetailsContent';
import CounterofferCommentsContent from '@/ui/ModalUI//SendCounteroffer/CounterofferCommentsContent';
import {
  incomingOfferCommentsData,
  incomingOfferCommercialTermsData,
  incomingOfferVoyageDetailData,
} from '@/utils/mock';

const ConfirmCounteroffer = ({ setModalId, closeModal }) => {
  const [responseCountdown, setResponseCountdown] = useState('20 min');
  const [showScroll, setShowScroll] = useState(false);
  return (
    <div className="w-[610px]">
      <ModalHeader title="Confirm Changes to Send Counteroffer" goBack={() => setModalId('offer_counteroffer')} />

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
        <IncomingCOTContent data={incomingOfferCommercialTermsData} />
        <VoyageDetailsContent data={incomingOfferVoyageDetailData} />
        <CounterofferCommentsContent data={incomingOfferCommentsData} areaDisabled />
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
  setModalId: () => {},
  closeModal: () => {},
};

ConfirmCounteroffer.propTypes = {
  setModalId: PropTypes.func,
  closeModal: PropTypes.func,
};

export default ConfirmCounteroffer;
