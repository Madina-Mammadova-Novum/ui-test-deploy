'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OfferModalContentPropTypes } from '@/lib/types';

import { extendCountdownDataAdapter } from '@/adapters/countdownTimer';
import { offerDetailsAdapter } from '@/adapters/offer';
import { Button, Loader, Title } from '@/elements';
import { acceptPrefixtureOffer, extendCountdown, getOfferDetails } from '@/services/offer';
import { updateConfirmationStatus, updateCountdown } from '@/store/entities/pre-fixture/slice';
import { getUserDataSelector } from '@/store/selectors';
import { COTTabContent, Countdown, Tabs, VoyageDetailsTabContent } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const tabs = [
  {
    label: 'Fixture Terms',
    value: 'fixture_terms',
  },
];

const OfferAcceptModalContent = ({ closeModal, offerId }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);
  const [offerDetails, setOfferDetails] = useState({});

  const dispatch = useDispatch();

  const { role } = useSelector(getUserDataSelector);
  const { isOwner } = getRoleIdentity({ role });

  const { commercialOfferTerms, voyageDetails, countdownData, allowExtension } = offerDetails;

  const handleSubmit = async () => {
    setPending(true);
    const { error, message: successMessage } = await acceptPrefixtureOffer(offerId);
    if (!error) {
      dispatch(updateConfirmationStatus({ offerId, isOwner }));
      successToast(successMessage);
      closeModal();
    } else {
      errorToast(error?.title, error?.message);
    }
    setPending(false);
  };

  const handleExtendCountdown = async () => {
    const { error, message: successMessage } = await extendCountdown({ offerId, role });
    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      successToast(successMessage);
      setOfferDetails(extendCountdownDataAdapter);
      dispatch(updateCountdown({ offerId }));
    }
  };

  useEffect(() => {
    (async () => {
      const { status, data, error } = await getOfferDetails(offerId, role);
      if (status === 200) {
        setOfferDetails(offerDetailsAdapter({ data, role }));
      } else {
        console.error(error);
      }
      setInitialLoading(false);
    })();
  }, []);

  const tabContent = () => {
    return (
      <div className="space-y-6">
        <VoyageDetailsTabContent data={voyageDetails} isViewing isCounteroffer />
        <hr className="my-4" />
        <COTTabContent data={commercialOfferTerms} />
      </div>
    );
  };

  if (initialLoading) {
    return (
      <div className="relative flex h-72 w-72 items-center justify-center">
        <Loader className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-[610px] flex-col">
      <Title level={2}>Confirm Fixture with technical subjects</Title>

      <div className="mt-5 flex items-center text-[12px]">
        <Countdown time={countdownData} />
        <div className="flex h-min flex-col items-start border-l pl-4">
          <p className="font-bold">You can use an extension for a response only once for each incoming offer</p>
          <Button
            customStyles="!text-[10px] font-bold !px-2 !h-5 uppercase leading-none"
            buttonProps={{ text: 'Extend the response time by 15min', variant: 'primary', size: 'medium' }}
            disabled={!allowExtension}
            onClick={handleExtendCountdown}
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
        className={`mt-3 h-full overflow-y-auto overflow-x-hidden py-4 ${showScroll && 'shadow-vInset'}`}
      >
        {tabContent()}
      </div>

      <div className="mt-4 flex justify-end gap-x-2.5 text-xsm">
        <Button
          onClick={closeModal}
          customStyles="ml-auto"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button
          buttonProps={{
            text: pending ? 'Please wait...' : 'Confirm Fixture with technical subjects',
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
