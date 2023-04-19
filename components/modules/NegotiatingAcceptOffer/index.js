'use client';

import { useState } from 'react';

import { NegotiatingAcceptOfferPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { CommentsContent } from '@/modules';
import { COTTabContent, Countdown, ModalHeader, Tabs, VoyageDetailsTabContent } from '@/units';
import { COTData, incomingOfferCommentsData, voyageDetailData } from '@/utils/mock';

const tabs = [
  {
    value: 'message',
    label: 'Message',
  },
  {
    value: 'commercial_offer_terms',
    label: 'Commercial offer terms',
  },
  {
    value: 'voyage_details',
    label: 'Voyage details',
  },
];

const NegotiatingAcceptOffer = ({ goBack, closeModal }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);

  const tabContent = () => {
    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsTabContent data={voyageDetailData} />;
      case 'commercial_offer_terms':
        return <COTTabContent data={COTData} />;
      default:
        return <CommentsContent data={incomingOfferCommentsData} />;
    }
  };

  return (
    <div className="w-[610px]">
      <ModalHeader goBack={goBack}>Accept the offer</ModalHeader>

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

NegotiatingAcceptOffer.propTypes = NegotiatingAcceptOfferPropTypes;

export default NegotiatingAcceptOffer;
