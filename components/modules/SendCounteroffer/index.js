'use client';

import { useEffect, useMemo, useState } from 'react';

import classnames from 'classnames';

import SendCounterofferFormFields from './SendCounterofferFormFields';

import { SendCounterOfferPropTypes } from '@/lib/types';

import { Button, Dropdown } from '@/elements';
import { CommentsContent, ConfirmCounteroffer } from '@/modules';
import { getCountdownTimer } from '@/services/countdownTimer';
import { Countdown, CounterofferForm, ModalHeader, Tabs, VoyageDetailsTabContent } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';

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

const SendCounteroffer = ({ closeModal, goBack, offerDetails }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [countdownState, setCountdownState] = useState({
    responseCountdownOptions: [],
    responseCountdown: {},
    loading: false,
  });
  const [showScroll, setShowScroll] = useState(false);
  const [confirmCounteroffer, setConfirmCounteroffer] = useState(false);

  const { counterofferData, voyageDetails, comments } = offerDetails;
  const { responseCountdownOptions, responseCountdown, loading } = countdownState;

  const handleCountdownStateChange = (key, value) =>
    setCountdownState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsTabContent data={voyageDetails} />;
      case 'comments':
        return <CommentsContent data={comments} />;
      default:
        return <SendCounterofferFormFields data={counterofferData} />;
    }
  }, [currentTab]);

  useEffect(() => {
    (async () => {
      handleCountdownStateChange('loading', true);
      const { data = [] } = await getCountdownTimer();
      const convertedOptions = convertDataToOptions({ data }, 'id', 'text');
      handleCountdownStateChange('responseCountdownOptions', convertedOptions);
      handleCountdownStateChange('responseCountdown', convertedOptions[0]);
      handleCountdownStateChange('loading', false);
    })();
  }, []);

  return (
    <div className="w-[610px]">
      <ModalHeader goBack={() => (confirmCounteroffer ? setConfirmCounteroffer(false) : goBack('view_offer'))}>
        {confirmCounteroffer ? 'Confirm Changes to Send Counteroffer' : 'Send Counteroffer'}
      </ModalHeader>

      <div className="flex text-[12px] items-center mt-5">
        <Countdown time="1h 50m" />
        <div className="pl-4 border-l h-min flex items-center">
          <p className="font-bold max-w-[240px]">
            Set a response countdown timer for the vessel owner to reply to this offer
          </p>
          <Dropdown
            defaultValue={responseCountdown}
            options={responseCountdownOptions}
            asyncCall={loading}
            disabled={!responseCountdownOptions.length}
            onChange={(option) => handleCountdownStateChange('responseCountdown', option)}
            customStyles={{ className: 'ml-2.5', dropdownWidth: 60 }}
          />
        </div>
      </div>
      <CounterofferForm
        allowSubmit={confirmCounteroffer}
        data={{ ...counterofferData, responseCountdown }}
        closeModal={closeModal}
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
              ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
              className={classnames('h-[320px] overflow-y-auto overflow-x-hidden', showScroll && 'shadow-vInset')}
            >
              {tabContent}
            </div>
          </>
        ) : (
          <ConfirmCounteroffer closeModal={closeModal} offerDetails={offerDetails} />
        )}
      </CounterofferForm>

      <div className="flex text-xsm gap-x-2.5 mt-4 justify-end h-10">
        {!confirmCounteroffer && (
          <Button
            onClick={() => setConfirmCounteroffer(true)}
            buttonProps={{ text: 'Confirm changes', variant: 'primary', size: 'large' }}
          />
        )}
      </div>
    </div>
  );
};

SendCounteroffer.propTypes = SendCounterOfferPropTypes;

export default SendCounteroffer;
