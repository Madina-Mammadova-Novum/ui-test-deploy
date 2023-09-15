'use client';

import { useState } from 'react';

import classnames from 'classnames';
import { useSession } from 'next-auth/react';

import { ViewOfferPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { CommentsContent } from '@/modules';
import { extendCountdown } from '@/services/offer';
import { Countdown, ModalHeader, OfferDetails, Tabs } from '@/units';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

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

const ViewOffer = ({ setStep, data, offerId }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const { data: session } = useSession();
  const { voyageDetails, commercialOfferTerms, comments, countdown } = data;

  const handleExtendCountdown = async () => {
    const { error, message: successMessage } = await extendCountdown({ offerId, role: session?.role });
    if (error) {
      errorToast(parseErrors(error.message));
    } else {
      successToast(successMessage);
    }
  };

  const tabContent = () => {
    switch (currentTab) {
      case 'comments':
        return <CommentsContent data={comments} areaDisabled />;
      default:
        return <OfferDetails voyageDetails={voyageDetails} commercialOfferTerms={commercialOfferTerms} />;
    }
  };

  return (
    <div className="w-[610px]">
      <ModalHeader>View Incoming Offer</ModalHeader>

      <div className="flex text-[12px] items-center mt-5">
        <Countdown time={countdown} />
        <div className="pl-4 border-l h-min flex flex-col items-start">
          <p className="font-bold">You can use an extension for a response only once for each incoming offer</p>
          <Button
            customStyles="!text-[10px] font-bold !px-2 !h-5 uppercase leading-none"
            buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'medium' }}
            onClick={handleExtendCountdown}
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
        className={classnames('h-[320px] overflow-y-auto overflow-x-hidden', showScroll && 'shadow-vInset')}
      >
        {tabContent()}
      </div>

      <div className="flex text-xsm gap-x-2.5 mt-4 whitespace-nowrap justify-end">
        <Button
          onClick={() => setStep('offer_decline')}
          buttonProps={{ text: 'Decline the offer', variant: 'delete', size: 'large' }}
        />
        <Button
          onClick={() => setStep('offer_counteroffer')}
          buttonProps={{ text: 'Send counteroffer', variant: 'secondary', size: 'large' }}
        />
        <Button
          onClick={() => setStep('offer_accept')}
          buttonProps={{ text: 'Accept the offer', variant: 'primary', size: 'large' }}
        />
      </div>
    </div>
  );
};

ViewOffer.propTypes = ViewOfferPropTypes;

export default ViewOffer;
