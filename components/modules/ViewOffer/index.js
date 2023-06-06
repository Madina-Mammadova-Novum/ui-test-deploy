'use client';

import { useState } from 'react';

import classnames from "classnames";

import { ViewOfferPropTypes } from '@/lib/types';

import { Button } from '@/elements';
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

const ViewOffer = ({ setStep, closeModal }) => {
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
      <ModalHeader>View Incoming Offer</ModalHeader>

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
        customStyles="mx-auto mt-5 mb-3"
        tabs={tabs}
        activeTab={currentTab}
        onClick={({ target }) => setCurrentTab(target.value)}
      />

      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={(classnames('h-[320px] overflow-y-auto overflow-x-hidden', showScroll && 'shadow-vInset'))}
      >
        {tabContent()}
      </div>

      <div className="flex text-xsm gap-x-2.5 mt-4 whitespace-nowrap">
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
};

ViewOffer.propTypes = ViewOfferPropTypes;

export default ViewOffer;
