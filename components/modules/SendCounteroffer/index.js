'use client';

import { useState } from 'react';

import { SendCounterOfferPropTypes } from '@/lib/types';

import { Button, SimpleSelect } from '@/elements';
import { CommentsContent } from '@/modules';
import { Countdown, ModalHeader, OfferForm, Tabs, VoyageDetailsTabContent } from '@/units';
import { incomingOfferCommentsData, voyageDetailData } from '@/utils/mock';

const tabs = [
  {
    value: 'commercial_offer_terms',
    label: 'Commercial offer terms',
  },
  {
    value: 'voyage_details',
    label: 'Voyage details',
  },
  {
    value: 'comments',
    label: 'Comments',
  },
];

const SendCounteroffer = ({ closeModal, goBack }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [responseCountdown, setResponseCountdown] = useState('20 min');
  const [showScroll, setShowScroll] = useState(false);

  const tabContent = () => {
    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsTabContent data={voyageDetailData} />;
      case 'comments':
        return <CommentsContent data={incomingOfferCommentsData} />;
      default:
        return <OfferForm />;
    }
  };

  return (
    <div className="w-[610px]">
      <ModalHeader goBack={() => goBack('view_offer')}>Send Counteroffer</ModalHeader>

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
        tabs={tabs}
        activeTab={currentTab}
        onClick={({ target }) => setCurrentTab(target.value)}
      />

      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`h-[320px] overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        {tabContent()}
      </div>

      <div className="flex text-xsm gap-x-2.5 mt-4">
        <Button
          onClick={closeModal}
          customStyles="ml-auto"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button
          onClick={() => goBack('offer_counteroffer_confirm')}
          buttonProps={{ text: 'Confirm changes', variant: 'primary', size: 'large' }}
        />
      </div>
    </div>
  );
};

SendCounteroffer.propTypes = SendCounterOfferPropTypes;

export default SendCounteroffer;
