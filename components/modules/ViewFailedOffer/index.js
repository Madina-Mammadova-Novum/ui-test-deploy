'use client';

import React, { useEffect, useState } from 'react';

import { ViewFailedOfferPropTypes } from '@/lib/types';

import { offerDetailsAdapter } from '@/adapters/offer';
import { CommentsContent } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { COTTabContent, ModalHeader, Tabs, VoyageDetailsTabContent } from '@/units';

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

const ViewFailedOffer = ({ itemId }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState({});
  const { comments, voyageDetails, commercialOfferTerms, failedOfferData: { failureReason } = {} } = offerDetails;

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(itemId);
      if (status === 200) {
        setOfferDetails(offerDetailsAdapter({ data }));
      } else {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  const tabContent = () => {
    switch (currentTab) {
      case 'commercial_offer_terms':
        return <COTTabContent data={commercialOfferTerms} />;
      case 'comments':
        return <CommentsContent data={comments} areaDisabled />;
      default:
        return <VoyageDetailsTabContent data={voyageDetails} />;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-[610px]">
      <ModalHeader>View Failed Offer</ModalHeader>
      <div className="bg-red-light rounded-base py-3 px-5 mt-5">
        <div className="text-xsm font-semibold">
          <span>Failed reason:</span>
          <span className="text-red ml-1.5">{failureReason}</span>
        </div>
        <div className="text-[12px] mt-1.5">
          <span className="font-bold">I indicated:</span>
          <span className="ml-1.5">Lorem ipsum is placeholder text commonly used in the graphic</span>
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
    </div>
  );
};

ViewFailedOffer.propTypes = ViewFailedOfferPropTypes;

export default ViewFailedOffer;
