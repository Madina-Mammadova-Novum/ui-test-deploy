'use client';

import { useState, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import { NegotiatingAcceptOfferPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Button } from '@/elements';
import { CommentsContent } from '@/modules';
import { COTTabContent, Countdown, ModalHeader, Tabs, VoyageDetailsTabContent } from '@/units';
import { useHookFormParams } from '@/utils/hooks';
import { COTData, incomingOfferCommentsData, voyageDetailData } from '@/utils/mock';

const tabs = [
  {
    value: 'message',
    label: 'Message',
  },
  {
    value: 'commercial_offer_terms',
    label: 'Commercial offer terms',
  },
  {
    value: 'voyage_details',
    label: 'Voyage details',
  },
];

const NegotiatingAcceptOffer = ({ goBack, closeModal }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const methods = useHookFormParams({ schema: {} });

  const handleSubmit = (formData) => console.log(formData);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsTabContent data={voyageDetailData} />;
      case 'commercial_offer_terms':
        return <COTTabContent data={COTData} />;
      default:
        return <CommentsContent data={incomingOfferCommentsData} />;
    }
  }, [currentTab]);

  return (
    <div className="w-[610px]">
      <ModalHeader goBack={goBack}>Accept the offer</ModalHeader>

      <Countdown time="1d 1h 50m" customStyles="mt-5" />

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
        <FormProvider {...methods}>
          <FormManager
            submitAction={handleSubmit}
            className="!gap-0"
            submitButton={{
              text: 'Accept the offer',
              variant: 'primary',
              size: 'large',
              className: 'absolute bottom-8 right-8 text-xsm !w-max z-[1]',
            }}
          >
            {tabContent}
          </FormManager>
        </FormProvider>
      </div>

      <div className="flex text-xsm gap-x-2.5 mt-4 justify-end">
        <Button
          onClick={closeModal}
          customStyles="ml-auto"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button
          buttonProps={{ text: 'Accept the offer', variant: 'primary', size: 'large' }}
          customStyles="opacity-0"
        />
      </div>
    </div>
  );
};

NegotiatingAcceptOffer.propTypes = NegotiatingAcceptOfferPropTypes;

export default NegotiatingAcceptOffer;
