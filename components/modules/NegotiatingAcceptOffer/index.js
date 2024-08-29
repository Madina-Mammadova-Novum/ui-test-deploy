'use client';

import { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import { NegotiatingAcceptOfferPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Button } from '@/elements';
import { acceptOfferSchema } from '@/lib/schemas';
import { CommentsContent } from '@/modules';
import { acceptOffer } from '@/services/offer';
import { fetchUserNegotiating } from '@/store/entities/negotiating/actions';
import { getUserDataSelector } from '@/store/selectors';
import { Countdown, ModalHeader, OfferDetails, Tabs } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const tabs = [
  {
    value: 'offer_details',
    label: 'Offer details',
  },
  {
    value: 'message',
    label: 'Сomments',
  },
];

const NegotiatingAcceptOffer = ({ closeModal, goBack, itemId, offerDetails }) => {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [showScroll, setShowScroll] = useState(false);

  const { role } = useSelector(getUserDataSelector);

  const schema = yup.object({ ...acceptOfferSchema() });
  const methods = useHookFormParams({ schema });

  const { comments, voyageDetails, commercialOfferTerms, countdownData } = offerDetails;

  const handleBack = () => {
    if (!disabled) {
      goBack();
    }
  };

  const handleSubmit = async (formData) => {
    setDisabled(true);
    const { message: successMessage, error } = await acceptOffer({
      data: { ...formData, offerId: itemId },
      role,
    });

    if (!error) {
      successToast(successMessage);
      dispatch(fetchUserNegotiating());
      setDisabled(false);
      closeModal();
    } else {
      setDisabled(false);
      errorToast(error?.title, error?.message);
    }
  };

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'offer_details':
        return <OfferDetails voyageDetails={voyageDetails} commercialOfferTerms={commercialOfferTerms} />;
      default:
        return <CommentsContent data={comments} areaDisabled />;
    }
  }, [currentTab]);

  return (
    <div className="w-[610px]">
      <ModalHeader goBack={handleBack} disabled={disabled}>
        Accept the offer
      </ModalHeader>
      <Countdown time={countdownData} customStyles="mt-5" />
      <Tabs
        tabs={tabs}
        activeTab={currentTab}
        onClick={({ target }) => setCurrentTab(target.value)}
        customStyles="mx-auto mt-5"
      />

      <div
        ref={(ref) => setShowScroll(ref?.scrollHeight > 320)}
        className={`mt-3 h-[320px] overflow-y-auto overflow-x-hidden ${showScroll && 'shadow-vInset'}`}
      >
        <FormProvider {...methods}>
          <FormManager
            submitAction={handleSubmit}
            className="!gap-0"
            submitButton={{
              text: 'Accept the offer',
              variant: 'primary',
              size: 'large',
              className: 'absolute bottom-8 right-8 text-xsm !w-max z-[1] !w-40',
              disabled,
            }}
          >
            {tabContent}
          </FormManager>
        </FormProvider>
      </div>

      <div className="mt-4 flex h-10 justify-end gap-x-2.5 text-xsm">
        <Button
          buttonProps={{ text: 'Accept the offer', variant: 'primary', size: 'large', disabled }}
          customStyles="opacity-0"
        />
      </div>
    </div>
  );
};

NegotiatingAcceptOffer.propTypes = NegotiatingAcceptOfferPropTypes;

export default NegotiatingAcceptOffer;
