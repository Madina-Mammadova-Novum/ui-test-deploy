'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import classnames from 'classnames';

import SendCounterofferFormFields from './SendCounterofferFormFields';

import { SendCounterOfferPropTypes } from '@/lib/types';

import { Dropdown } from '@/elements';
import { DEFAULT_COUNTDOWN_OPTION } from '@/lib/constants';
import { CommentsContent, ConfirmCounteroffer } from '@/modules';
import { getCountdownTimer } from '@/services/countdownTimer';
import { Countdown, CounterofferForm, ModalHeader, Tabs, VoyageDetailsTabContent } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';
import { counterofferPointsToImprove } from '@/utils/mock';

const tabs = [
  {
    value: 'commercial_offer_terms',
    label: 'Commercial offer terms',
  },
  {
    value: 'comments',
    label: 'Comments',
  },
];

const SendCounteroffer = ({ closeModal, goBack, offerDetails }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [countdownState, setCountdownState] = useState({
    responseCountdownOptions: [],
    responseCountdown: {},
    loading: false,
  });
  const [confirmCounteroffer, setConfirmCounteroffer] = useState(false);
  const scrollingContainerRef = useRef(null);

  const { counterofferData, voyageDetails, comments, countdownData } = offerDetails;
  const { responseCountdownOptions, responseCountdown, loading } = countdownState;

  const handleCountdownStateChange = (key, value) =>
    setCountdownState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  useEffect(() => {
    (async () => {
      handleCountdownStateChange('loading', true);
      const { data = [] } = await getCountdownTimer();
      const convertedOptions = convertDataToOptions({ data }, 'id', 'text');
      const defaultCountdown = convertedOptions.find(({ label }) => label === DEFAULT_COUNTDOWN_OPTION);
      handleCountdownStateChange('responseCountdownOptions', convertedOptions);
      handleCountdownStateChange('responseCountdown', defaultCountdown);
      handleCountdownStateChange('loading', false);
    })();
  }, []);

  const handleConfirmCounteroffer = () => setConfirmCounteroffer(true);
  const handleValidationError = () => setCurrentTab(tabs[0].value);
  const scrollToBottom = () =>
    setTimeout(() => scrollingContainerRef?.current?.scroll({ top: scrollingContainerRef?.current?.scrollHeight }));

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'comments':
        return <CommentsContent data={comments} />;
      default:
        return (
          <>
            <VoyageDetailsTabContent data={voyageDetails} inlineVariant />
            <SendCounterofferFormFields data={counterofferData} scrollToBottom={scrollToBottom} />
          </>
        );
    }
  }, [currentTab, voyageDetails, comments, counterofferData, scrollToBottom]);

  return (
    <div className="w-[610px]">
      <ModalHeader goBack={() => (confirmCounteroffer ? setConfirmCounteroffer(false) : goBack('view_offer'))}>
        {confirmCounteroffer ? 'Confirm Changes to Send Counteroffer' : 'Send Counteroffer'}
      </ModalHeader>

      {!confirmCounteroffer && (
        <div className="border border-gray-darker bg-gray-light rounded-md px-5 py-3 text-[12px] my-5">
          <p>
            In order to send counteroffer, please make at least <b>one of the following</b> adjustments:{' '}
          </p>
          <ul>
            {counterofferPointsToImprove.map((lineToImprove) => (
              <li>- {lineToImprove}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex text-[12px] items-center mt-5">
        <Countdown time={countdownData} />
        <div className="pl-4 border-l h-min flex items-center">
          <p className="font-bold max-w-[240px]">
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
        allowSubmit={confirmCounteroffer}
        data={{ ...counterofferData, responseCountdown }}
        closeModal={closeModal}
        handleConfirmCounteroffer={handleConfirmCounteroffer}
        handleValidationError={handleValidationError}
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
              className={classnames(
                'h-[320px] overflow-y-auto overflow-x-hidden p-5',
                scrollingContainerRef?.current?.scrollHeight > 320 && 'shadow-vInset'
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
