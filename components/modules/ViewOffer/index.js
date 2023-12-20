'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classnames from 'classnames';

import { ViewOfferPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { CommentsContent } from '@/modules';
import { extendCountdown } from '@/services/offer';
import { updateCountdown } from '@/store/entities/negotiating/slice';
import { getUserDataSelector } from '@/store/selectors';
import { Countdown, ModalHeader, OfferDetails, Tabs } from '@/units';
import { getRoleIdentity, parseErrorMessage } from '@/utils/helpers';
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

const ViewOffer = ({ setStep, data, offerId, parentId, handleCountdownExtensionSuccess }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const [allowCountdownExtension, setAllowCountdownExtension] = useState(data?.allowExtension);

  const { role } = useSelector(getUserDataSelector);

  const { isOwner } = getRoleIdentity({ role });
  const { voyageDetails, commercialOfferTerms, comments, countdownData } = data;
  const dispatch = useDispatch();

  const handleExtendCountdown = async () => {
    setAllowCountdownExtension(false);
    const { error, message: successMessage } = await extendCountdown({ offerId, role });
    if (error) {
      errorToast(parseErrorMessage(error));
      setAllowCountdownExtension(data?.allowExtension);
    } else {
      setAllowCountdownExtension(false);
      dispatch(updateCountdown({ parentId, offerId, isOwner }));
      handleCountdownExtensionSuccess();
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
        <Countdown time={countdownData} />
        <div className="pl-4 border-l h-min flex flex-col items-start">
          <p className="font-bold">You can use an extension for a response only once for each incoming offer</p>
          <Button
            customStyles="!text-[10px] font-bold !px-2 !h-5 uppercase leading-none"
            buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'medium' }}
            disabled={!allowCountdownExtension}
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
