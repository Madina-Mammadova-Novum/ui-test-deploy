'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { ViewOfferPropTypes } from '@/lib/types';

import { Button, Dropdown } from '@/elements';
import { CommentsContent } from '@/modules';
import { submitTaskExtensionRequest } from '@/services/assignedTasks';
import { updateCountdown } from '@/store/entities/negotiating/slice';
import { getUserDataSelector } from '@/store/selectors';
import { Countdown, ModalHeader, OfferDetails, Tabs } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
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
  const dispatch = useDispatch();

  const [showScroll, setShowScroll] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [allowCountdownExtension, setAllowCountdownExtension] = useState(data?.allowExtension);
  const [selectedExtensionOption, setSelectedExtensionOption] = useState(null);

  const { role } = useSelector(getUserDataSelector);

  const { isOwner } = getRoleIdentity({ role });
  const {
    isCountdownActive,
    voyageDetails,
    commercialOfferTerms,
    comments,
    countdownData,
    hasUnreadComment,
    allowExtension,
    extensionTimeOptions,
    taskId,
  } = data;

  // Set default extension option when component mounts
  useEffect(() => {
    if (extensionTimeOptions && extensionTimeOptions.length > 0) {
      setSelectedExtensionOption(extensionTimeOptions[0]);
    }
  }, [extensionTimeOptions]);

  const handleExtendCountdown = async () => {
    setAllowCountdownExtension(false);

    try {
      // Get the selected extension option
      const extensionOption = selectedExtensionOption || extensionTimeOptions?.[0];

      if (!extensionOption) {
        errorToast('Error', 'No extension option available');
        setAllowCountdownExtension(allowExtension);
        return;
      }

      // Submit extension request using the new API

      const { error, message: successMessage } = await submitTaskExtensionRequest({
        taskId,
        data: {
          requestedMinutes: extensionOption.value,
          description: `Requesting extension for offer ${offerId}`,
        },
      });

      if (error) {
        errorToast('Extension Request Failed', error?.title || error?.message);
        setAllowCountdownExtension(allowExtension);
      } else {
        setAllowCountdownExtension(false);
        dispatch(
          updateCountdown({
            parentId,
            offerId,
            isOwner,
            extendMinute: extensionOption.value,
          })
        );
        handleCountdownExtensionSuccess(extensionOption.value);
        successToast(successMessage || 'Extension request submitted successfully');
      }
    } catch (err) {
      console.error('Extension request error:', err);
      errorToast('Extension Request Failed', 'An unexpected error occurred');
      setAllowCountdownExtension(allowExtension);
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
    <div className="flex h-full w-[610px] flex-col">
      <ModalHeader>View Incoming Offer</ModalHeader>

      <div className="mt-5 flex items-center text-[12px]">
        <Countdown time={countdownData} />
        <div className="flex h-min flex-col items-start border-l pl-4">
          <p className="font-bold">You can use an extension for an incoming offer</p>
          {extensionTimeOptions && extensionTimeOptions.length > 1 ? (
            <div className="flex items-center gap-2">
              <Dropdown
                defaultValue={selectedExtensionOption}
                options={extensionTimeOptions}
                onChange={setSelectedExtensionOption}
                customStyles={{ dropdownWidth: 130 }}
              />
              <Button
                customStyles="!text-[10px] font-bold !px-2 !h-5 uppercase leading-none"
                buttonProps={{ text: 'Extend the response time', variant: 'primary', size: 'medium' }}
                disabled={!allowCountdownExtension || !isCountdownActive}
                onClick={handleExtendCountdown}
              />
            </div>
          ) : (
            <Button
              customStyles="!text-[10px] font-bold !px-2 !h-5 uppercase leading-none"
              buttonProps={{
                text: `Extend the response time by ${extensionTimeOptions?.[0]?.label || '15 Minutes'}`,
                variant: 'primary',
                size: 'medium',
              }}
              disabled={!allowCountdownExtension || !isCountdownActive}
              onClick={handleExtendCountdown}
            />
          )}
        </div>
      </div>

      <Tabs
        customStyles={classNames('mx-auto mt-5 mb-3', hasUnreadComment && 'gap-2')}
        tabs={tabs}
        activeTab={currentTab}
        onClick={({ target }) => setCurrentTab(target.value)}
        hasUnreadComment={hasUnreadComment}
      />

      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={classNames('h-full overflow-y-auto overflow-x-hidden', showScroll && 'shadow-vInset')}
      >
        {tabContent()}
      </div>

      <div className="mt-4 flex justify-end gap-x-2.5 whitespace-nowrap text-xsm">
        <Button
          onClick={() => setStep('offer_decline')}
          buttonProps={{ text: 'Decline the offer', variant: 'delete', size: 'large' }}
          disabled={!isCountdownActive}
        />
        <Button
          onClick={() => setStep('offer_counteroffer')}
          buttonProps={{ text: 'Send counteroffer', variant: 'secondary', size: 'large' }}
          disabled={!isCountdownActive}
        />
        <Button
          onClick={() => setStep('offer_accept')}
          buttonProps={{ text: 'Accept Offer', variant: 'primary', size: 'large' }}
          disabled={!isCountdownActive}
        />
      </div>
    </div>
  );
};

ViewOffer.propTypes = ViewOfferPropTypes;

export default ViewOffer;
