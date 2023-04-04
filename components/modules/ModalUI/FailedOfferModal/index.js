import React, { useState } from 'react';

import { Tabs } from '@/elements';
import { ModalHeader } from '@/ui';
import IncomingCommentsContent from '@/ui/ModalUI/IncomingOfferModal/IncomingCommentsContent';
import IncomingCOTContent from '@/ui/ModalUI/IncomingOfferModal/IncomingCOTContent';
import VoyageDetailsContent from '@/ui/ModalUI/IncomingOfferModal/VoyageDetailsContent';
import {
  incomingOfferCommentsData,
  incomingOfferCommercialTermsData,
  incomingOffersModalTabs,
  incomingOfferVoyageDetailData,
} from '@/utils/mock';

const FailedOfferModal = () => {
  const [currentTab, setCurrentTab] = useState(incomingOffersModalTabs[0].value);
  const [showScroll, setShowScroll] = useState(false);

  return (
    <div className="w-[610px]">
      <ModalHeader title="View Failed Offer" />
      <div className="bg-red-light rounded-[10px] py-3 px-5 mt-5">
        <div className="text-xsm font-semibold">
          <span>Failed reason:</span>
          <span className="text-red ml-1.5">Offer Declined by me</span>
        </div>
        <div className="text-[12px] mt-1.5">
          <span className="font-bold">Failed reason:</span>
          <span className="ml-1.5">Lorem ipsum is placeholder text commonly used in the graphic</span>
        </div>
      </div>

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

export default FailedOfferModal;
