'use client';

import React, { useState } from 'react';

import { CommentsContent } from '@/modules';
import { COTTabContent, Countdown, ModalHeader, Tabs, VoyageDetailsTabContent } from '@/units';
import { COTData, incomingOfferCommentsData, voyageDetailData } from '@/utils/mock';

const tabs = [
  {
    value: 'voyage_details',
    label: 'Voyage details',
  },
  {
    value: 'commercial_offer_terms',
    label: 'Commercial offer terms',
  },
  {
    value: 'comments',
    label: 'Comments',
  },
];

const ViewCounteroffer = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);

  const tabContent = () => {
    switch (currentTab) {
      case 'commercial_offer_terms':
        return <COTTabContent data={COTData} />;
      case 'comments':
        return <CommentsContent data={incomingOfferCommentsData} areaDisabled />;
      default:
        return <VoyageDetailsTabContent data={voyageDetailData} />;
    }
  };

  return (
    <div className="w-[610px]">
      <ModalHeader>View Counteroffer</ModalHeader>

      <Countdown time="1d 1h 50m" customStyles="mt-5" />

      <Tabs
        tabs={tabs}
        activeTab={currentTab}
        onClick={({ target }) => setCurrentTab(target.value)}
        customStyles="mx-auto mt-5"
      />

      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`h-[320px] mt-3 overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        {tabContent()}
      </div>
    </div>
  );
};

export default ViewCounteroffer;
