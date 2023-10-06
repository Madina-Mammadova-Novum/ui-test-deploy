'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { OfferModalContentPropTypes } from '@/lib/types';

import { offerDetailsAdapter } from '@/adapters/offer';
import { Button, Loader, Title } from '@/elements';
import { acceptPrefixtureOffer, getOfferDetails } from '@/services/offer';
import { COTTabContent, Countdown, Tabs, VoyageDetailsTabContent } from '@/units';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const tabs = [
  {
    label: 'Voyage details',
    value: 'voyage_details',
  },
  {
    label: 'Commercial offer terms',
    value: 'commercial_offer_terms',
  },
];

const OfferAcceptModalContent = ({ closeModal, offerId }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const [offerDetails, setOfferDetails] = useState({});
  const { commercialOfferTerms, voyageDetails, countdownData } = offerDetails;
  const { data: session } = useSession();

  const handleSubmit = async () => {
    setPending(true);
    const { error, message: successMessage } = await acceptPrefixtureOffer(offerId, session?.role);
    if (!error) {
      successToast(successMessage);
    } else {
      const { errors, message } = error;
      errorToast(parseErrors({ ...errors, ...message }));
    }
    setPending(false);
  };

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(offerId, session?.role);
      if (status === 200) {
        setOfferDetails(offerDetailsAdapter({ data }));
      } else {
        console.log(error);
      }
      setInitialLoading(false);
    })();
  }, []);

  const tabContent = () => {
    switch (currentTab) {
      case 'commercial_offer_terms':
        return <COTTabContent data={commercialOfferTerms} />;
      default:
        return <VoyageDetailsTabContent data={voyageDetails} />;
    }
  };

  if (initialLoading) {
    return (
      <div className="w-72 h-72">
        <Loader className="h-8 w-8 absolute top-1/2" />
      </div>
    );
  }

  return (
    <div className="w-[610px]">
      <Title level={2}>Accept the Pre-fixture Offer</Title>

      <div className="flex text-[12px] items-center mt-5">
        <Countdown time={countdownData} />
        <div className="pl-4 border-l h-min flex flex-col items-start">
          <p className="font-bold">You can use an extension for a response only once for each incoming offer</p>
          <Button
            customStyles="!text-[10px] font-bold !px-2 !h-5 uppercase leading-none"
            buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'medium' }}
          />
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

      <div className="flex justify-end text-xsm gap-x-2.5 mt-4">
        <Button
          onClick={closeModal}
          customStyles="ml-auto"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button
          buttonProps={{
            text: pending ? 'Please wait...' : 'Accept the pre-fixture offer',
            variant: 'primary',
            size: 'large',
          }}
          onClick={handleSubmit}
          disabled={pending}
        />
      </div>
    </div>
  );
};

OfferAcceptModalContent.propTypes = OfferModalContentPropTypes;

export default OfferAcceptModalContent;
