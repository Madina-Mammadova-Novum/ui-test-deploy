'use client';

import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { ViewFailedOfferPropTypes } from '@/lib/types';

import { offerDetailsAdapter } from '@/adapters/offer';
import { Loader } from '@/elements';
import { CommentsContent } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { ModalHeader, OfferDetails, Tabs } from '@/units';

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

const ViewFailedOffer = ({ itemId }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState({});
  const {
    comments,
    voyageDetails,
    commercialOfferTerms,
    failedOfferData: { failureReason, declinedBy } = {},
  } = offerDetails;
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(itemId, session?.role);
      if (status === 200) {
        setOfferDetails(offerDetailsAdapter({ data, role: session?.role }));
      } else {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  const tabContent = () => {
    switch (currentTab) {
      case 'comments':
        return <CommentsContent data={comments} areaDisabled />;
      default:
        return <OfferDetails voyageDetails={voyageDetails} commercialOfferTerms={commercialOfferTerms} />;
    }
  };

  if (loading)
    return (
      <div className="w-72 h-72">
        <Loader className="h-8 w-8 absolute top-1/2" />
      </div>
    );

  return (
    <div className="w-[610px]">
      <ModalHeader>View Failed Offer</ModalHeader>
      <div className="bg-red-light rounded-base py-3 px-5 mt-5">
        <div className="text-xsm font-semibold">
          <span>Declained by:</span>
          <span className="text-red ml-1.5">{declinedBy}</span>
        </div>
        <div className="text-[12px] mt-1.5">
          <span className="font-bold">Reason:</span>
          <span className="ml-1.5">{failureReason}</span>
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
