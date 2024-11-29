'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ViewCounterofferPropTypes } from '@/lib/types';

import { offerDetailsAdapter } from '@/adapters/offer';
import { Dropdown, Loader } from '@/elements';
import { COUNTDOWN_OPTIONS } from '@/lib/constants';
import { CommentsContent } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { getUserDataSelector } from '@/store/selectors';
import { Countdown, ModalHeader, OfferDetails, Tabs } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';

const tabs = [
  {
    value: 'offer_details',
    label: 'Offer details',
  },
  {
    value: 'comments',
    label: 'Comments',
  },
];

const ViewCounteroffer = ({ itemId }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const [responseCountdown, setResponseCountdown] = useState(COUNTDOWN_OPTIONS[1]);
  const [loading, setLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState({});

  const { role } = useSelector(getUserDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  const { comments, voyageDetails, commercialOfferTerms, countdownData } = offerDetails;

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(itemId, role);
      if (status === 200) {
        setOfferDetails(offerDetailsAdapter({ data }));
      } else {
        console.error(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="relative flex h-72 w-72 items-center justify-center">
        <Loader className="h-8 w-8" />
      </div>
    );
  }

  const tabContent = () => {
    switch (currentTab) {
      case 'comments':
        return <CommentsContent data={comments} areaDisabled />;
      default:
        return <OfferDetails voyageDetails={voyageDetails} commercialOfferTerms={commercialOfferTerms} />;
    }
  };

  return (
    <div className="flex h-full w-[610px] flex-col">
      <ModalHeader>{isOwner ? 'View Counteroffer' : 'View Sent Offer'}</ModalHeader>

      {isOwner ? (
        <Countdown time={countdownData} customStyles="mt-5" />
      ) : (
        <div className="mt-5 flex items-center text-[12px]">
          <div className="flex h-min items-center border-l-2 border-blue pl-4">
            <p className="max-w-[240px] font-bold">
              Set a response countdown timer for the counterparty to reply to this offer
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
        className={`mt-3 h-full overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        {tabContent()}
      </div>
    </div>
  );
};

ViewCounteroffer.propTypes = ViewCounterofferPropTypes;

export default ViewCounteroffer;
