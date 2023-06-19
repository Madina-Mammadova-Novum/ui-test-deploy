'use client';

import React, { useState } from 'react';

import { CommentsContent } from '@/modules';
import { COTTabContent, Countdown, ModalHeader, Tabs, VoyageDetailsTabContent } from '@/units';
import { COTData, incomingOfferCommentsData, voyageDetailData } from '@/utils/mock';
import { useSession } from 'next-auth/react';
import { COUNTDOWN_OPTIONS } from '@/lib/constants';
import { Dropdown } from '@/elements';

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
  const [responseCountdown, setResponseCountdown] = useState(COUNTDOWN_OPTIONS[1])
  const { data: { role } = {} } = useSession();
  const isOwner = role === 'owner';

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
      <ModalHeader>{isOwner ? "View Counteroffer" : "View Sent Offer"}</ModalHeader>

      {isOwner ? (
        <Countdown time="1d 1h 50m" customStyles="mt-5" />
        ) : (
          <div className="flex text-[12px] items-center mt-5">
            <div className="pl-4 border-l-2 border-blue h-min flex items-center">
              <p className="font-bold max-w-[240px]">
                Set a response countdown timer for the vessel owner to reply to this offer
              </p>
              <Dropdown
                disabled
                defaultValue={responseCountdown}
                options={COUNTDOWN_OPTIONS}
                onChange={setResponseCountdown}
                customStyles={{ className: 'ml-2.5', dropdownWidth: 60 }}
              />
            </div>
          </div>
      )}

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
