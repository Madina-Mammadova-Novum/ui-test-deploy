'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, SimpleSelect, Title } from '@/elements';
import { COUNTDOWN_OPTIONS } from '@/lib/constants';
import { CommentsContent, VoyageDetailsContent } from '@/modules';
import { OfferForm, Tabs } from '@/units';
import { incomingOfferCommentsData, incomingOfferVoyageDetailData } from '@/utils/mock';

const tabs = [
  {
    label: 'Commercial offer terms',
    value: 'commercial_offer_terms',
  },
  {
    label: 'Voyage details',
    value: 'voyage_details',
  },
  {
    label: 'Comments',
    value: 'comments',
  },
];

const OfferModalContent = ({ closeModal }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [responseCountdown, setResponseCountdown] = useState(COUNTDOWN_OPTIONS[0]);
  const [showScroll, setShowScroll] = useState(false);

  const tabContent = () => {
    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsContent data={incomingOfferVoyageDetailData} />;
      case 'comments':
        return <CommentsContent data={incomingOfferCommentsData} />;
      default:
        return <OfferForm />;
    }
  };

  return (
    <div className="w-[610px]">
      <Title component="h2">Send Offer</Title>

      <div className="flex text-[12px] items-center mt-5">
        <div className="pl-4 border-l-2 border-blue h-min flex items-center">
          <p className="font-bold max-w-[240px]">
            Set a response countdown timer for the vessel owner to reply to this offer
          </p>
          <SimpleSelect
            onChange={setResponseCountdown}
            currentItem={responseCountdown}
            selectableItems={COUNTDOWN_OPTIONS}
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
        <Button onClick={() => {}} buttonProps={{ text: 'Send offer', variant: 'primary', size: 'large' }} />
      </div>
    </div>
  );
};

OfferModalContent.defaultProps = {
  setStep: () => {},
  closeModal: () => {},
};

OfferModalContent.propTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func,
};

export default OfferModalContent;
