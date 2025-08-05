'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ViewCounterofferPropTypes } from '@/lib/types';

import { offerDetailsAdapter } from '@/adapters/offer';
import { Loader } from '@/elements';
import { CommentsContent } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { fetchDealCountdownData } from '@/store/entities/negotiating/actions';
import { getCountdownDataSelector, getUserDataSelector } from '@/store/selectors';
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
  const [loading, setLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState({});

  const dispatch = useDispatch();
  const { role } = useSelector(getUserDataSelector);
  const countdownData = useSelector(getCountdownDataSelector(itemId));

  const { isOwner } = getRoleIdentity({ role });

  const { comments, voyageDetails, commercialOfferTerms } = offerDetails;

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(itemId, role);
      if (status === 200) {
        // Don't include countdownData from adapter since we're getting it from Redux
        const adaptedData = offerDetailsAdapter({ data });
        const { countdownData: _, ...dataWithoutCountdown } = adaptedData || {};
        setOfferDetails(dataWithoutCountdown);

        // Fetch countdown data from Redux
        dispatch(fetchDealCountdownData({ dealId: itemId }));
      } else {
        console.error(error);
      }
      setLoading(false);
    })();
  }, [itemId, role, dispatch]);

  // Transform Redux countdown data to the format expected by Countdown component
  const transformedCountdownData = countdownData
    ? {
        date: countdownData.expiresAt,
        autoStart: countdownData.isCountdownActive,
        status: countdownData.countdownStatus,
      }
    : null;

  if (loading) {
    return (
      <div className="relative flex h-full w-72 items-center justify-center">
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

      {isOwner && transformedCountdownData && <Countdown time={transformedCountdownData} customStyles="mt-5" />}

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
