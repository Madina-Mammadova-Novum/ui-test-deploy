'use client';

import { useMemo, useState } from 'react';

import { SendCounterOfferPropTypes } from '@/lib/types';

import { Button, SimpleSelect } from '@/elements';
import { CommentsContent, ConfirmCounteroffer } from '@/modules';
import { CommercialOfferTerms, Countdown, CounterofferForm, ModalHeader, Tabs, VoyageDetailsTabContent } from '@/units';
import { incomingOfferCommentsData, voyageDetailData } from '@/utils/mock';

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

const SendCounteroffer = ({ closeModal, goBack }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [responseCountdown, setResponseCountdown] = useState('20 min');
  const [showScroll, setShowScroll] = useState(false);
  const [confirmCounteroffer, setConfirmCounteroffer] = useState(false);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsTabContent data={voyageDetailData} />;
      case 'comments':
        return <CommentsContent data={incomingOfferCommentsData} />;
      default:
        return <CommercialOfferTerms />;
    }
  }, [currentTab]);

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
          <SimpleSelect
            onChange={setResponseCountdown}
            currentItem={responseCountdown}
            selectableItems={['20 min', '40 min', '60 min']}
          />
        </div>
      </div>
      <CounterofferForm allowSubmit={confirmCounteroffer}>
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
              className={`h-[320px] overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
            >
              {tabContent}
            </div>
          </>
        ) : (
          <ConfirmCounteroffer closeModal={closeModal} />
        )}
      </CounterofferForm>

      <div className="flex text-xsm gap-x-2.5 mt-4 justify-end">
        <span className={confirmCounteroffer && 'mr-60'}>
          <Button
            onClick={closeModal}
            customStyles="ml-auto"
            buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
          />
        </span>
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
