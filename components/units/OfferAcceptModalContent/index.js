'use client';

import { useState } from 'react';

import { OfferModalContentPropTypes } from '@/lib/types';

import { Button, Title } from '@/elements';
import { COTTabContent, Countdown, Tabs, VoyageDetailsTabContent } from '@/units';
import { COTData, voyageDetailData } from '@/utils/mock';

const tabs = [
  {
    label: 'Voyage details',
    value: 'voyage_details',
  },
  {
    label: 'Commercial offer terms',
    value: 'commercial_offer_terms',
  },
];

const OfferAcceptModalContent = ({ closeModal }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);

  const tabContent = () => {
    switch (currentTab) {
      case 'commercial_offer_terms':
        return <COTTabContent data={COTData} />;
      default:
        return <VoyageDetailsTabContent data={voyageDetailData} />;
    }
  };

  return (
    <div className="w-[610px]">
      <Title level={2}>Accept the Pre-fixture Offer</Title>

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

      <div className="flex justify-end text-xsm gap-x-2.5 mt-4">
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

OfferAcceptModalContent.propTypes = OfferModalContentPropTypes;

export default OfferAcceptModalContent;
