'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ViewFailedOfferPropTypes } from '@/lib/types';

import { offerDetailsAdapter } from '@/adapters/offer';
import { Loader } from '@/elements';
import { CommentsContent } from '@/modules';
import { getOfferDetails } from '@/services/offer';
import { getUserDataSelector } from '@/store/selectors';
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

  const { role } = useSelector(getUserDataSelector);

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(itemId, role);
      if (status === 200) {
        setOfferDetails(offerDetailsAdapter({ data, role }));
      } else {
        console.error(error);
      }
      setLoading(false);
    })();
  }, []);

  const tabContent = {
    offer_details: <OfferDetails voyageDetails={voyageDetails} commercialOfferTerms={commercialOfferTerms} />,
    comments: <CommentsContent data={comments} areaDisabled />,
  };

  return (
    <div className="w-[610px] min-h-96">
      <ModalHeader>View Declined Offer</ModalHeader>
      {loading ? (
        <Loader className="h-8 w-8 absolute top-1/2" />
      ) : (
        <>
          <div className="bg-red-light rounded-base py-3 px-5 mt-5">
            <div className="text-xsm font-semibold">
              <span>Declined by:</span>
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
            className={`h-[320px] mt-2.5 px-2.5 overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
          >
            {tabContent[currentTab]}
          </div>
        </>
      )}
    </div>
  );
};

ViewFailedOffer.propTypes = ViewFailedOfferPropTypes;

export default ViewFailedOffer;
