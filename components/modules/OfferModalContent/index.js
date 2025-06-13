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
  const [formMethods, setFormMethods] = useState(null);
  const [additionalDischargeNextValue, setAdditionalDischargeNextValue] = useState(null);

  const [modalStore, setModalStore] = useState({
    currentTab: tabs[0].value,
    responseCountdown: null,
    responseCountdownOptions: [],
    showScroll: false,
    loading: false,
  });

  const offer = useSelector(getOfferSelector);
  const { searchParams } = useSelector(getSearchSelector);
  const { loadTerminal, dischargeTerminal, products } = searchParams;
  const { voyageDetails } = voyageDetailsAdapter({
    data: {
      ...searchParams,
      additionalDischargeOptions: additionalDischargeNextValue || searchParams?.additionalDischargeOptions,
    },
    laycanStart: offer?.data?.laycanStart,
    laycanEnd: offer?.data?.laycanEnd,
  });

  const handleChangeState = (key, value) => {
    setModalStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleChangeOption = (option) => handleChangeState('responseCountdown', option);
  const handleChangeTab = ({ target }) => {
    if (formMethods?.getValues) {
      const formValues = formMethods.getValues();
      const nextAdditionalDischargeOptions = formValues?.additionalDischargeOptions;

      setAdditionalDischargeNextValue(nextAdditionalDischargeOptions);
    }
    handleChangeState('currentTab', target.value);
  };
  const handleValidationError = () => {
    if (formMethods?.formState?.errors) {
      const { errors } = formMethods.formState;
      const errorKeys = Object.keys(errors);

      // Only change to comments tab if it's the single error
      if (errorKeys.length === 1 && errorKeys[0] === 'comment') {
        handleChangeState('currentTab', tabs[2].value);
        return;
      }
    }

    // Default fallback for all other cases
    handleChangeState('currentTab', tabs[0].value);
  };

  const { currentTab, responseCountdown, showScroll, responseCountdownOptions, loading } = modalStore;

  const handleSubmit = async (formData) => {
    const comment = formData?.comment || null;
    const additionalDischargeOptions =
      formData?.additionalDischargeOptions || searchParams?.additionalDischargeOptions || {};
    const sanctionedCountries = formData?.sanctionedCountries || searchParams?.sanctionedCountries || [];
    const excludeInternationallySanctioned =
      formData?.excludeInternationallySanctioned || searchParams?.excludeInternationallySanctioned || false;

    const {
      status,
      error,
      message: successMessage,
    } = await sendOffer({
      data: {
        ...formData,
        ...tankerData,
        comment,
        responseCountdown,
        tankerId,
        laycanStart: offer?.data?.laycanStart,
        laycanEnd: offer?.data?.laycanEnd,
        loadTerminal,
        dischargeTerminal,
        products,
        additionalDischargeOptions,
        sanctionedCountries,
        excludeInternationallySanctioned,
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
      dispatch(
        fetchOfferOptions({
          isCounterOffer: false,
          freightFormats: offer?.ranges?.freightFormats?.map(({ id, value }) => ({ value: id, label: value })) || [],
        })
      );
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
        <div className={`${!offer.valid ? 'bg-red-light' : 'bg-orange-300'} rounded-base px-5 py-2.5 pb-3`}>
          <div className="mt-1.5 text-xsm">
            <span className="font-bold">{!offer?.valid ? 'Declined: ' : 'Warning: '}</span>
            <span className="ml-1.5">{offer?.message}</span>
          </div>
        </div>
      )
    );
  }, [offer?.message, offer?.valid, tankerId]);

  return (
    <div className="flex h-full w-[610px] flex-col">
      <div className="flex flex-col gap-y-5">
        <Title level="2">Send Offer</Title>
        {errorBanner}
      </div>
      <div className="mt-5 flex items-center text-[12px]">
        <div className="flex h-min items-center border-l-2 border-blue pl-4">
          <p className="max-w-[240px] font-bold">
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
      <Tabs
        customStyles="mx-auto my-5"
        tabs={tabs}
        activeTab={currentTab}
        onClick={handleChangeTab}
        disabled={!offer.valid}
      />
      <div
        ref={scrollingContainerRef}
        className={`h-full overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        <div className="p-2.5">
          <OfferForm
            disabled={!offer.valid}
            handleSubmit={handleSubmit}
            handleValidationError={handleValidationError}
            onFormChange={setFormMethods}
          >
            {tabContent}
          </OfferForm>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-x-4 text-xsm">
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
