'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OfferModalContentPropTypes } from '@/lib/types';

import { voyageDetailsAdapter } from '@/adapters/offer';
import { Button, Dropdown, Title } from '@/elements';
import { DEFAULT_COUNTDOWN_OPTION } from '@/lib/constants';
import { CommentsContent } from '@/modules';
import { getCountdownTimer } from '@/services/countdownTimer';
import { sendOffer } from '@/services/offer';
import { fetchOfferOptions, fetchOfferValidation } from '@/store/entities/offer/actions';
import { resetOfferData } from '@/store/entities/offer/slice';
import { getOfferSelector, getSearchSelector } from '@/store/selectors';
import { CommercialOfferTerms, OfferForm, Tabs, VoyageDetailsTabContent } from '@/units';
import { convertDataToOptions } from '@/utils/helpers';
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
  const dispatch = useDispatch();
  const scrollingContainerRef = useRef(null);

  const [modalStore, setModalStore] = useState({
    currentTab: tabs[0].value,
    responseCountdown: null,
    responseCountdownOptions: [],
    showScroll: false,
    loading: false,
  });

  const offer = useSelector(getOfferSelector);
  const { searchParams } = useSelector(getSearchSelector);
  const { laycanStart, laycanEnd, loadTerminal, dischargeTerminal } = searchParams;
  const { voyageDetails } = voyageDetailsAdapter({ data: searchParams });

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
      errorToast(error?.title, error?.message);
    }
  };

  const fetchCountdownData = async () => {
    handleChangeState('loading', true);
    const response = await getCountdownTimer();
    const convertedOptions = convertDataToOptions({ data: response.data }, 'id', 'text');
    const defaultCountdown = convertedOptions.find(({ label }) => label === DEFAULT_COUNTDOWN_OPTION);

    handleChangeState('responseCountdownOptions', convertedOptions);
    handleChangeOption(defaultCountdown);
    handleChangeState('loading', false);
  };

  const filterValidProducts = (data) => {
    const filteredData = { ...data };
    if (filteredData.products && Array.isArray(filteredData.products)) {
      filteredData.products = filteredData.products.filter((product) => product !== null && product !== undefined);
    }
    return filteredData;
  };

  useEffect(() => {
    const filteredSearchParams = filterValidProducts(searchParams);

    dispatch(fetchOfferValidation({ ...filteredSearchParams, tankerId }));

    return () => {
      dispatch(resetOfferData());
    };
  }, []);

  useEffect(() => {
    if (offer?.valid) {
      fetchCountdownData();
      dispatch(fetchOfferOptions(tankerId));
    }
  }, [offer?.valid]);

  const scrollToBottom = () =>
    setTimeout(() => scrollingContainerRef?.current?.scroll({ top: scrollingContainerRef?.current?.scrollHeight }));

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'voyage_details':
        return <VoyageDetailsTabContent data={voyageDetails} />;
      case 'comments':
        return <CommentsContent />;
      default:
        return <CommercialOfferTerms tankerId={tankerId} searchData={searchParams} scrollToBottom={scrollToBottom} />;
    }
  }, [currentTab, tankerId, searchParams, voyageDetails, scrollToBottom]);

  const errorBanner = useMemo(() => {
    return (
      offer?.message && (
        <div className={`${!offer.valid ? 'bg-red-light' : 'bg-orange-300'} rounded-base py-2.5 pb-3 px-5`}>
          <div className="text-xsm mt-1.5">
            <span className="font-bold">{!offer?.valid ? 'Declined: ' : 'Warning: '}</span>
            <span className="ml-1.5">{offer?.message}</span>
          </div>
        </div>
      )
    );
  }, [offer?.message, offer?.valid, tankerId]);

  return (
    <div className="w-[610px]">
      <div className="flex flex-col gap-y-5">
        <Title level="2">Send Offer</Title>
        {errorBanner}
      </div>
      <div className="flex text-[12px] items-center mt-5">
        <div className="pl-4 border-l-2 border-blue h-min flex items-center">
          <p className="font-bold max-w-[240px]">
            Set a response countdown timer for the counterparty to reply to this offer
          </p>
          <Dropdown
            defaultValue={responseCountdown}
            options={responseCountdownOptions}
            loading={loading}
            disabled={!responseCountdownOptions?.length || !offer.valid}
            onChange={handleChangeOption}
            customStyles={{ className: 'ml-2.5', dropdownWidth: 60 }}
            asyncCall
          />
        </div>
      </div>
      <Tabs customStyles="mx-auto my-5" tabs={tabs} activeTab={currentTab} onClick={handleChangeTab} />
      <div
        ref={scrollingContainerRef}
        className={`h-[320px] overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        <div className="p-2.5">
          <OfferForm disabled={!offer.valid} handleSubmit={handleSubmit} handleValidationError={handleValidationError}>
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
