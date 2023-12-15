'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { OfferModalContentPropTypes } from '@/lib/types';

import { voyageDetailsAdapter } from '@/adapters/offer';
import { Button, Dropdown, Title } from '@/elements';
import { DEFAULT_COUNTDOWN_OPTION } from '@/lib/constants';
import { CommentsContent } from '@/modules';
import { getCountdownTimer } from '@/services/countdownTimer';
import { sendOffer } from '@/services/offer';
import { searchSelector } from '@/store/selectors';
import { CommercialOfferTerms, OfferForm, Tabs, VoyageDetailsTabContent } from '@/units';
import { convertDataToOptions, parseErrorMessage } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

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

const OfferModalContent = ({ closeModal, tankerId, tankerData }) => {
  const [modalStore, setModalStore] = useState({
    currentTab: tabs[0].value,
    responseCountdown: null,
    responseCountdownOptions: [],
    showScroll: false,
    loading: false,
  });

  const scrollingContainerRef = useRef(null);
  const { searchData } = useSelector(searchSelector);
  const { laycanStart, laycanEnd, loadTerminal, dischargeTerminal } = searchData;
  const { voyageDetails } = voyageDetailsAdapter({ data: searchData });

  const handleChangeState = (key, value) => {
    setModalStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleChangeOption = (option) => handleChangeState('responseCountdown', option);
  const handleChangeTab = ({ target }) => handleChangeState('currentTab', target.value);
  const handleValidationError = () => handleChangeState('currentTab', tabs[0].value);

  const { currentTab, responseCountdown, showScroll, responseCountdownOptions, loading } = modalStore;

  const handleSubmit = async (formData) => {
    const totalMinQuantity = formData.products.map(({ quantity }) => +quantity).reduce((a, b) => a + b);

    const {
      status,
      error,
      message: successMessage,
    } = await sendOffer({
      data: {
        ...formData,
        ...tankerData,
        responseCountdown,
        tankerId,
        laycanStart,
        laycanEnd,
        loadTerminal,
        dischargeTerminal,
        minOfferQuantity: totalMinQuantity,
      },
    });

    if (status === 200) {
      successToast(successMessage);
      closeModal();
    }
    if (error) {
      errorToast(parseErrorMessage(error));
    }
  };

  useEffect(() => {
    (async () => {
      handleChangeState('loading', true);
      const { data = [] } = await getCountdownTimer();
      const convertedOptions = convertDataToOptions({ data }, 'id', 'text');
      const defaultCountdown = convertedOptions.find(({ label }) => label === DEFAULT_COUNTDOWN_OPTION);
      handleChangeState('responseCountdownOptions', convertedOptions);
      handleChangeOption(defaultCountdown);
      handleChangeState('loading', false);
    })();
  }, []);

  const scrollToBottom = () =>
    setTimeout(() => scrollingContainerRef?.current?.scroll({ top: scrollingContainerRef?.current?.scrollHeight }));

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsTabContent data={voyageDetails} />;
      case 'comments':
        return <CommentsContent />;
      default:
        return <CommercialOfferTerms tankerId={tankerId} scrollToBottom={scrollToBottom} />;
    }
  }, [currentTab, tankerId]);

  return (
    <div className="w-[610px]">
      <Title level="2">Send Offer</Title>

      <div className="flex text-[12px] items-center mt-5">
        <div className="pl-4 border-l-2 border-blue h-min flex items-center">
          <p className="font-bold max-w-[240px]">
            Set a response countdown timer for the counterparty to reply to this offer
          </p>
          <Dropdown
            defaultValue={responseCountdown}
            options={responseCountdownOptions}
            asyncCall={loading}
            disabled={!responseCountdownOptions?.length}
            onChange={handleChangeOption}
            customStyles={{ className: 'ml-2.5', dropdownWidth: 60 }}
          />
        </div>
      </div>

      <Tabs customStyles="mx-auto my-5" tabs={tabs} activeTab={currentTab} onClick={handleChangeTab} />

      <div
        ref={scrollingContainerRef}
        className={`h-[320px] overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        <div className="p-2.5">
          <OfferForm handleSubmit={handleSubmit} handleValidationError={handleValidationError}>
            {tabContent}
          </OfferForm>
        </div>
      </div>

      <div className="flex text-xsm gap-x-4 mt-4 justify-end">
        <Button
          onClick={closeModal}
          customStyles="ml-auto"
          buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
        />
        <Button
          buttonProps={{ text: 'Send offer', variant: 'primary', size: 'large' }}
          customStyles="opacity-[0] !w-32"
        />
      </div>
    </div>
  );
};

OfferModalContent.propTypes = OfferModalContentPropTypes;

export default OfferModalContent;
