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

      <div className="flex text-[12px] items-center mt-5">
        <Countdown time="1d 1h 50m" />
        <div className="pl-4 border-l h-min flex flex-col items-start">
          <p className="font-bold">You can use an extension for a response only once for each incoming offer</p>
          <Button
            customStyles="!text-[10px] font-bold !px-2 !h-5 uppercase leading-none"
            buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'medium' }}
          />
        </div>
      </div>

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
