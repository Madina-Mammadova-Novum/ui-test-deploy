'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import SendCounterofferFormFields from './SendCounterofferFormFields';

import { SendCounterOfferPropTypes } from '@/lib/types';

import { Dropdown } from '@/elements';
import { DEFAULT_COUNTDOWN_OPTION } from '@/lib/constants';
import { CommentsContent, ConfirmCounteroffer } from '@/modules';
import { getCountdownTimer } from '@/services/countdownTimer';
import { fetchСounterOfferValidation } from '@/store/entities/offer/actions';
import { getOfferSelector } from '@/store/selectors';
import { Countdown, CounterofferForm, ModalHeader, Tabs, VoyageDetailsTabContent } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';
import { counterofferPointsToImprove } from '@/utils/mock';

const tabs = [
  {
    value: 'commercial_offer_terms',
    label: 'Commercial offer terms',
  },
  {
    value: 'voyage_details',
    label: 'Voyage details',
  },
  {
    value: 'comments',
    label: 'Comments',
  },
];

const SendCounteroffer = ({ closeModal, goBack, offerDetails, dealId }) => {
  const dispatch = useDispatch();

  const { valid, message } = useSelector(getOfferSelector);

  const scrollingContainerRef = useRef(null);

  const [disabled, setDisabled] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [confirmCounteroffer, setConfirmCounteroffer] = useState(false);

  const [countdownState, setCountdownState] = useState({
    responseCountdownOptions: [],
    responseCountdown: {},
    loading: false,
  });

  const { counterofferData, voyageDetails, comments, countdownData } = offerDetails;
  const { responseCountdownOptions, responseCountdown, loading } = countdownState;

  const additionalDischargeValue = {
    additionalDischargeOptions: voyageDetails?.additionalDischargeOptions || {},
    excludeInternationallySanctioned: voyageDetails?.excludeInternationallySanctioned || false,
    sanctionedCountries: voyageDetails?.sanctionedCountries || [],
  };

  const shouldShowShadow = scrollingContainerRef?.current?.scrollHeight > 320;
  const containerHeight = !confirmCounteroffer && valid ? 'h-[calc(98vh-424.2px)]' : 'h-[calc(98vh-292.2px)]';

  const errorBanner = useMemo(() => {
    return (
      message &&
      !valid && (
        <div className="w-full rounded-base bg-red-light px-5 py-2.5 pb-3">
          <div className="mt-1.5 text-xsm">
            <span className="font-bold">Declined: </span>
            <span className="ml-1.5">{message}</span>
          </div>
        </div>
      )
    );
  }, [message, valid, dealId]);

  const handleCountdownStateChange = (key, value) =>
    setCountdownState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const handleBack = () => {
    if (disabled) return;

    if (confirmCounteroffer) {
      setConfirmCounteroffer(false);
    }

    goBack('view_offer');
  };

  const handleConfirmCounteroffer = () => setConfirmCounteroffer(true);
  const handleValidationError = () => setCurrentTab(tabs[0].value);

  const initActions = async () => {
    handleCountdownStateChange('loading', true);
    const { data = [] } = await getCountdownTimer();
    const convertedOptions = convertDataToOptions({ data }, 'id', 'text');
    const defaultCountdown = convertedOptions.find(({ label }) => label === DEFAULT_COUNTDOWN_OPTION);
    handleCountdownStateChange('responseCountdownOptions', convertedOptions);
    handleCountdownStateChange('responseCountdown', defaultCountdown);
    handleCountdownStateChange('loading', false);
  };

  useEffect(() => {
    dispatch(fetchСounterOfferValidation(dealId));
  }, [dealId]);

  useEffect(() => {
    initActions();
  }, []);

  const tabContent = useMemo(() => {
    const scrollToBottom = () => {
      setTimeout(() => scrollingContainerRef?.current?.scroll({ top: scrollingContainerRef?.current?.scrollHeight }));
    };

    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsTabContent data={voyageDetails} isCounteroffer />;
      case 'comments':
        return <CommentsContent data={comments} />;
      default:
        return <SendCounterofferFormFields data={counterofferData} scrollToBottom={scrollToBottom} />;
    }
  }, [currentTab, voyageDetails, comments, counterofferData]);

  return (
    <div className="flex h-full w-[610px] flex-col">
      <ModalHeader disabled={disabled} goBack={handleBack}>
        {confirmCounteroffer ? 'Confirm Changes to Send Counteroffer' : 'Send Counteroffer'}
        {errorBanner}
      </ModalHeader>

      {!confirmCounteroffer && valid && (
        <div className="my-5 rounded-md border border-gray-darker bg-gray-light px-5 py-3 text-[12px]">
          <p>
            In order to send counteroffer, please make at least <b>one of the following</b> adjustments:{' '}
          </p>
          <ul>
            {counterofferPointsToImprove.map((lineToImprove, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>- {lineToImprove}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex items-center text-[12px]">
        <Countdown time={countdownData} />
        <div className="flex h-min items-center border-l pl-4">
          <p className="max-w-[240px] font-bold">
            Set a response countdown timer for the counterparty to reply to this offer
          </p>
          <Dropdown
            defaultValue={responseCountdown}
            options={responseCountdownOptions}
            loading={loading}
            asyncCall
            disabled={!responseCountdownOptions.length || confirmCounteroffer}
            onChange={(option) => handleCountdownStateChange('responseCountdown', option)}
            customStyles={{ className: 'ml-2.5', dropdownWidth: 60 }}
          />
        </div>
      </div>
      <CounterofferForm
        disabled={disabled || !valid}
        setDisabled={setDisabled}
        closeModal={closeModal}
        allowSubmit={confirmCounteroffer}
        handleConfirmCounteroffer={handleConfirmCounteroffer}
        handleValidationError={handleValidationError}
        data={{ ...counterofferData, ...additionalDischargeValue, responseCountdown }}
      >
        {!confirmCounteroffer ? (
          <>
            <Tabs
              customStyles="mx-auto mt-5 mb-3"
              tabs={tabs}
              activeTab={currentTab}
              onClick={({ target }) => setCurrentTab(target.value)}
            />

            <div
              ref={scrollingContainerRef}
              className={classNames(
                'overflow-y-auto overflow-x-hidden p-5',
                shouldShowShadow && 'shadow-vInset',
                containerHeight
              )}
            >
              {tabContent}
            </div>
          </>
        ) : (
          <ConfirmCounteroffer closeModal={closeModal} offerDetails={offerDetails} />
        )}
      </CounterofferForm>
    </div>
  );
};

SendCounteroffer.propTypes = SendCounterOfferPropTypes;

export default SendCounteroffer;
