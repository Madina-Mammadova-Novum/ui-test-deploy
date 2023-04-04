import React, { useState } from 'react';

import { Tabs } from '@/elements';
import { Countdown, ModalHeader } from '@/ui';
import IncomingCommentsContent from '@/ui/ModalUI/IncomingOfferModal/IncomingCommentsContent';
import IncomingCOTContent from '@/ui/ModalUI/IncomingOfferModal/IncomingCOTContent';
import VoyageDetailsContent from '@/ui/ModalUI/IncomingOfferModal/VoyageDetailsContent';
import {
  incomingOfferCommentsData,
  incomingOfferCommercialTermsData,
  incomingOffersModalTabs,
  incomingOfferVoyageDetailData,
} from '@/utils/mock';

const CounterofferModal = () => {
  const [currentTab, setCurrentTab] = useState(incomingOffersModalTabs[0].value);
  const [showScroll, setShowScroll] = useState(false);

  return (
    <div className="w-[610px]">
      <ModalHeader title="View Counteroffer" />

      <Countdown time="1d 1h 50m" customStyles="mt-5" />

      <Tabs tabs={incomingOffersModalTabs} activeTab={currentTab} onClick={setCurrentTab} customStyles="mx-auto mt-5" />

      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`h-[320px] mt-3 overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        {currentTab === 'voyage_details' && <VoyageDetailsContent data={incomingOfferVoyageDetailData} />}
        {currentTab === 'commercial_offer_terms' && <IncomingCOTContent data={incomingOfferCommercialTermsData} />}
        {currentTab === 'comments' && <IncomingCommentsContent data={incomingOfferCommentsData} />}
      </div>
    </div>
  );
};

export default CounterofferModal;
