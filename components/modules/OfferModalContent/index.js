'use client';

import { useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Dropdown, Title } from '@/elements';
import { COUNTDOWN_OPTIONS } from '@/lib/constants';
import { CommentsContent, VoyageDetailsContent } from '@/modules';
import { OfferForm, Tabs } from '@/units';
import { incomingOfferCommentsData, voyageDetailData } from '@/utils/mock';

const tabs = [
  {
    label: 'Commercial offer terms',
    value: 'commercial_offer_terms',
  },
  {
    label: 'Voyage details',
    value: 'voyage_details',
  },
  {
    label: 'Comments',
    value: 'comments',
  },
];

const OfferModalContent = ({ closeModal }) => {
  const [modalStore, setModalStore] = useState({
    currentTab: tabs[0].value,
    responseCountdown: COUNTDOWN_OPTIONS[0],
    showScroll: false,
  });

  const handleChangeState = (key, value) => {
    setModalStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleChangeOption = (option) => handleChangeState('responseCountdown', option);
  const handleChangeTab = ({ target }) => handleChangeState('currentTab', target.value);

  const { currentTab, responseCountdown, showScroll } = modalStore;

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsContent data={voyageDetailData} />;
      case 'comments':
        return <CommentsContent data={incomingOfferCommentsData} />;
      default:
        return <OfferForm />;
    }
  }, [currentTab]);

  return (
    <div className="w-[610px]">
      <Title level="2">Send Offer</Title>

      <div className="flex text-[12px] items-center mt-5">
        <div className="pl-4 border-l-2 border-blue h-min flex items-center">
          <p className="font-bold max-w-[240px]">
            Set a response countdown timer for the vessel owner to reply to this offer
          </p>
          <Dropdown defaultValue={responseCountdown} options={COUNTDOWN_OPTIONS} onChange={handleChangeOption} />
        </div>
      </div>

      <Tabs customStyles="mx-auto my-5" tabs={tabs} activeTab={currentTab} onClick={handleChangeTab} />

      <div className={`h-[320px] overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}>
        <div className="p-2.5">{tabContent}</div>
      </div>

      <div className="flex text-xsm gap-x-2.5 mt-4">
        <Button
          onClick={closeModal}
          customStyles="ml-auto"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button buttonProps={{ text: 'Send offer', variant: 'primary', size: 'large' }} customStyles="opacity-[0]" />
      </div>
    </div>
  );
};

OfferModalContent.defaultProps = {
  setStep: () => {},
  closeModal: () => {},
};

OfferModalContent.propTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func,
};

export default OfferModalContent;
